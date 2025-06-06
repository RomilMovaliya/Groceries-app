import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice"
import FavoriteSlice from "./FavoriteSlice";
export const Store = configureStore({
    reducer: {
        cart: CartSlice,
        favorite: FavoriteSlice
    }
});
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;