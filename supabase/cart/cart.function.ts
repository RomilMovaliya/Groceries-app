import { Database } from "../../database.types";
import { supabase } from "../supabase";
type ITEM = Database["public"]["Tables"]["items_data"]["Row"];
type ITEM_CART = Database["public"]["Tables"]["cart_table"]["Row"];

export const fetchCartItems = async (userid: string) => {
  const { data, error } = await supabase
    .from("cart_table")
    .select(
      `*,items_data (
    id,
    name,
    price,
    volume,
    img, 
    pieces,
    productdetails,
    nutritions,
    review,
    rating)`
    )
    .order("created_at", { ascending: true })
    .eq("userid", userid);

  if (error) {
    // console.log("error", error.message);
    return { success: false, message: error.message };
  }

  return { success: true, message: "cart data fetched successfully.", data };
};

export const addItemToCart = async (
  item: Omit<ITEM_CART, "id">,
  userid: string
) => {
  //console.log("item", item);
  try {
    const { data: existingItem, error: fetchError } = await supabase
      .from("cart_table")
      .select("*")
      .eq("userid", userid)
      .eq("productid", item.productid)
      .maybeSingle();

    //console.log("existingItem", existingItem);
    if (fetchError) {
      //console.log("Fetch error", fetchError.message);
      return { success: false, message: fetchError.message };
    }

    if (existingItem) {
      //console.log("existingItem", existingItem);

      //  If it exists, increment quantity
      const { error: updateError } = await supabase
        .from("cart_table")
        .update({ quantity: existingItem.quantity })
        .eq("userid", userid)
        .eq("productid", item.productid);

      if (updateError) {
        //console.log("Update error", updateError.message);
        return { success: false, message: updateError.message };
      }

      return { success: true, message: "Quantity increased" };
    }

    //  If not exists, insert with quantity = 1
    const { data: newData, error: insertError } = await supabase
      .from("cart_table")
      .insert([{ ...item, userid }]);
    // console.log("new exist", newData);
    if (insertError) {
      // console.log("Insert error", insertError.message);
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
      .from("cart_table")
      .delete()
      .match({ userid, id });

    if (error) {
      //console.log("Delete error", error.message);
      return { success: false, message: error.message };
    }
    return { success: true, message: "Item removed from cart" };
  } catch (error) {
    // console.log("Error in catch", error);
    return { success: false, message: error };
  }
};

export const incrementCartItemQuantity = async (userId: string, id: number) => {
  try {
    // Step 1: Fetch current quantity
    //console.log("increment cart func", { id, userId });

    const { data: currentData, error: fetchError } = await supabase
      .from("cart_table")
      .select("quantity")
      .eq("userid", userId)
      .eq("productid", id)
      .single();

    console.log("data", currentData);

    if (fetchError)
      return { success: false, message: `fetchError ${fetchError.message}` };

    const currentQuantity = currentData.quantity;

    // Step 2: Increment quantity
    const { data: updatedData, error: updateError } = await supabase
      .from("cart_table")
      .update({ quantity: currentQuantity + 1 })
      .eq("userid", userId)
      .eq("productid", id)
      .select()
      .single();
    //console.log("quantity no 2", updatedData);

    if (updateError) return { success: false, message: updateError.message };
    return { success: true, message: "Quantity increased", item: updatedData };
  } catch (error) {
    return {
      success: false,
      message: "Increment quantity Error in catch",
      error,
    };
  }
};

export const decrementCartItemQuantity = async (userId: string, id: number) => {
  try {
    // Step 1: Fetch current quantity
    const { data: currentData, error: fetchError } = await supabase
      .from("cart_table")
      .select("quantity")
      .eq("userid", userId)
      .eq("productid", id)
      .single();

    if (fetchError) return { success: false, message: fetchError.message };

    const currentQuantity = currentData.quantity;

    // Step 2: If quantity <= 1, remove the item
    if (currentQuantity <= 1) {
      return await removeItemFromCart(userId, id);
    }

    // Step 3: Decrease quantity
    const { data: updatedData, error: updateError } = await supabase
      .from("cart_table")
      .update({ quantity: currentQuantity - 1 })
      .eq("userid", userId)
      .eq("productid", id)
      .select()
      .single();

    if (updateError) return { success: false, message: updateError.message };
    return { success: true, message: "Quantity decreased", item: updatedData };
  } catch (error) {
    return { success: false, message: "Decrement quantity Error in catch" };
  }
};
