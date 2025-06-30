import { Database } from "../../database.types";
import { supabase } from "../supabase";

type FAVORITE_ITEM=Database['public']['Tables']['favorite']['Row'];

export const fetchFavoriteItems = async (userid: string) => {
 try {
   const { data, error } = await supabase
    .from("favorite")
    .select("*")
    .eq("userid", userid);

  if (error) {
    console.log("error", error.message);
    return { success: false, message: error.message };
  }

  return { success: true, message: "favorite data fetched successfully.", data };
 } catch (error) {
    console.log("error in catch",error);
 }
};

export const addItemToFavorite = async (item: FAVORITE_ITEM, userid: string) => {
  try {
    const { data, error } = await supabase
      .from("favorite")
      .insert([{ ...item, userid }]);

    if (error) {
      console.log("Fetch error", error.message);
      return { success: false, message: error.message };
    }
    return { success: true, message: "Item added to favorite",data };
  } catch (error) {
    return { success: false, message: error };
  }
};

export const removeItemFromFavorite = async (userid: string, id: number) => {
  try {
    const { error } = await supabase
      .from("favorite")
      .delete()
      .match({ userid, id });

    if (error) {
      console.log("Delete error", error.message);
      return { success: false, message: error.message };
    }
    return { success: true, message: "Item removed from favorite" };
  } catch (error) {
    console.log("Error in catch", error);
    return { success: false, message: error };
  }
};