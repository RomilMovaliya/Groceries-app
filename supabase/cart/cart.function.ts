import { Database } from "../../database.types";
import { supabase } from "../supabase";
type ITEM = Database["public"]["Tables"]["items_data"]["Row"];

export const fetchCartItems = async (userid: string) => {
  const { data, error } = await supabase
    .from("cart")
    .select("*")
    .eq("userid", userid);

  if (error) {
    console.log("error", error.message);
    return { success: false, message: error.message };
  }

  return { success: true, message: "cart data fetched successfully.", data };
};

export const addItemToCart = async (item: ITEM, userid: string) => {
  try {
    const { data: existingItem, error: fetchError } = await supabase
      .from("cart")
      .select("*")
      .eq("userid", userid)
      .eq("id", item.id)
      .maybeSingle();

    if (fetchError) {
      console.log("Fetch error", fetchError.message);
      return { success: false, message: fetchError.message };
    }

    if (existingItem) {
      //  If it exists, increment quantity
      const { error: updateError } = await supabase
        .from("cart")
        .update({ quantity: existingItem.quantity + 1 })
        .eq("userid", userid)
        .eq("id", item.id);

      if (updateError) {
        console.log("Update error", updateError.message);
        return { success: false, message: updateError.message };
      }

      return { success: true, message: "Quantity increased" };
    }

    //  If not exists, insert with quantity = 1
    const { error: insertError } = await supabase
      .from("cart")
      .insert([{ ...item, userid }]);

    if (insertError) {
      console.log("Insert error", insertError.message);
      return { success: false, message: insertError.message };
    }

    return { success: true, message: "Item added to cart" };
  } catch (error) {
    return { success: false, message: error };
  }
};

export const removeItemFromCart = async (userid: string, id: number) => {
  try {
    const { error } = await supabase
      .from("cart")
      .delete()
      .match({ userid, id });

    if (error) {
      console.log("Delete error", error.message);
      return { success: false, message: error.message };
    }
    return { success: true, message: "Item removed from cart" };
  } catch (error) {
    console.log("Error in catch", error);
    return { success: false, message: error };
  }
};

export const incrementCartItemQuantity = async (userId: string, id: number) => {
  try {
    // Step 1: Fetch current quantity
    console.log("increment cart fun",{userId,id});
    
    const { data: currentData, error: fetchError } = await supabase
      .from("cart")
      .select("quantity")
      .eq("userid", userId)
      .eq("id", id)
      .single();

      console.log("data",currentData);
      
    if (fetchError) return { success: false, message: `fetchError ${fetchError.message}` };

    const currentQuantity = currentData.quantity;

    // Step 2: Increment quantity
    const { data: updatedData, error: updateError } = await supabase
      .from("cart")
      .update({ quantity: currentQuantity + 1 })
      .eq("userid", userId)
      .eq("id", id)
      .select()
      .single();

    if (updateError) return { success: false, message: updateError.message };
    return { success: true, message: "Quantity increased", item: updatedData };
  } catch (error) {
    return { success: false, message: "Increment quantity Error in catch",error };
  }
};

export const decrementCartItemQuantity = async (userId: string, id: number) => {
  try {
    // Step 1: Fetch current quantity
    const { data: currentData, error: fetchError } = await supabase
      .from("cart")
      .select("quantity")
      .eq("userid", userId)
      .eq("id", id)
      .single();

    if (fetchError) return { success: false, message: fetchError.message };

    const currentQuantity = currentData.quantity;

    // Step 2: If quantity <= 1, remove the item
    if (currentQuantity <= 1) {
      return await removeItemFromCart(userId, id);
    }

    // Step 3: Decrease quantity
    const { data: updatedData, error: updateError } = await supabase
      .from("cart")
      .update({ quantity: currentQuantity - 1 })
      .eq("userid", userId)
      .eq("id", id)
      .select()
      .single();

    if (updateError) return { success: false, message: updateError.message };
    return { success: true, message: "Quantity decreased", item: updatedData };
  } catch (error) {
    return { success: false, message: "Decrement quantity Error in catch" };
  }
};
