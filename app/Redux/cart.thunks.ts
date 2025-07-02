import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCartItems,
  addItemToCart,
  removeItemFromCart,
  incrementCartItemQuantity,
  decrementCartItemQuantity,
} from "../../supabase/cart/cart.function";
import { Database } from "../../database.types";

type ITEM_CART = Database["public"]["Tables"]["cart_table"]["Row"];

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId: string, thunkAPI) => {
    const res = await fetchCartItems(userId);
    if (!res.success) {
      return thunkAPI.rejectWithValue(res.message);
    }
    return res.data;
  }
);

export const addCartItem = createAsyncThunk(
  "cart/addItem",
  async (
    { item, userId }: { item: Omit<ITEM_CART, "id">; userId: string },
    thunkAPI
  ) => {
    const res = await addItemToCart(item, userId);
    if (!res.success) {
      return thunkAPI.rejectWithValue(res.message);
    }
    // Return updated cart data
    const fetchRes = await fetchCartItems(userId);
    return fetchRes.data;
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeItem",
  async ({ userId, id }: { userId: string; id: number }, thunkAPI) => {
    const res = await removeItemFromCart(userId, id);
    if (!res.success) {
      return thunkAPI.rejectWithValue(res.message);
    }
    const fetchRes = await fetchCartItems(userId);
    return fetchRes.data;
  }
);

export const incrementCartItem = createAsyncThunk(
  "cart/increment",
  async (
    { userId, productid }: { userId: string; productid: number },
    thunkAPI
  ) => {
    const res = await incrementCartItemQuantity(userId, productid);
    if (!res.success) {
      return thunkAPI.rejectWithValue(res.message);
    }
    // Return the updated item data
    return res.item;
  }
);

export const decrementCartItem = createAsyncThunk(
  "cart/decrement",
  async (
    { userId, productid }: { userId: string; productid: number },
    thunkAPI
  ) => {
    const res = await decrementCartItemQuantity(userId, productid);
    if (!res.success) {
      return thunkAPI.rejectWithValue(res.message);
    }
    const fetchRes = await fetchCartItems(userId);
    return fetchRes.data;
  }
);
