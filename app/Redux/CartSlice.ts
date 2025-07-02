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
    // Remove these local reducers - let the thunks handle everything
    // IncremetQuantity: (state, action: PayloadAction<number>) => {
    //   const item = state.items.find((value) => value.id === action.payload);
    //   if (item) {
    //     item.quantity += 1;
    //   }
    // },
    // decrementQuantity: (state, action: PayloadAction<number>) => {
    //   const item = state.items.find((value) => value.id === action.payload);
    //   if (item && item.quantity > 1) {
    //     item.quantity -= 1;
    //   }
    // },
    // removeFromCart: (state, action: PayloadAction<number>) => {
    //   state.items = state.items.filter((value) => value.id != action.payload);
    // },
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
      })

      // Handle addCartItem
      .addCase(addCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Handle removeCartItem
      .addCase(removeCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Handle incrementCartItem
      .addCase(incrementCartItem.pending, (state) => {
        state.error = null;
      })
      .addCase(incrementCartItem.fulfilled, (state, action) => {
        // Update the specific item in the state
        const updatedItem = action.payload;
        const index = state.items.findIndex(
          (item) => item.id === updatedItem.id
        );
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...updatedItem };
        }
      })
      .addCase(incrementCartItem.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // Handle decrementCartItem
      .addCase(decrementCartItem.pending, (state, action) => {
        const { productid } = action.meta.arg;
        const item = state.items.find((i) => i.productid === productid);
        if (item && item.quantity > 1) {
          item.quantity -= 1;
        }
      })
      .addCase(decrementCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(decrementCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default cartSlice.reducer;
