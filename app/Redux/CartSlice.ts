import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchCart,
  addCartItem,
  removeCartItem,
  incrementCartItem,
  decrementCartItem,
} from "./cart.thunks";
import { Database } from "../../database.types";

type CartRow = Database["public"]["Tables"]["cart_table"]["Row"];
type ItemData = Database["public"]["Tables"]["items_data"]["Row"];

export type CartWithItem = CartRow & {
  items_data: ItemData;
};

interface CartState {
  items: CartWithItem[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    IncremetQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((value) => value.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((value) => value.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((value) => value.id != action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Add/Remove/Increment/Decrement
    [addCartItem, removeCartItem, incrementCartItem, decrementCartItem].forEach(
      (thunk) => {
        builder
          .addCase(thunk.pending, (state) => {
            state.error = null;
          })

          .addCase(thunk.rejected, (state, action) => {
            state.error = action.payload as string;
          });
      }
    );
  },
});

export const { IncremetQuantity, decrementQuantity, removeFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;
