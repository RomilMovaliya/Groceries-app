import { createSlice } from "@reduxjs/toolkit";

interface CartItem {
    id: number,
    img: string,
    name: string,
    Calories: string,
    pieces: number,
    price: number,
    productdetails: string,
    quantity: number,
    rating: number,
    review: string,
    volume: number
}

interface CartState {
    items: CartItem[]
}

const initialState: CartState = {
    items: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const isAvailable = state.items.find((value) => value.name == action.payload.name);
            if (isAvailable) {
                isAvailable.quantity += action.payload.quantity ?? 1;
            } else {
                state.items.push({ ...action.payload, quantity: action.payload.quantity ?? 1 });
                console.log("adding item into cart");
            }
        },
        removeFromCart: (state, action) => {
            const newList = state.items.filter((value) => value.name != action.payload.name);
            state.items = newList
        },
        IncremetQuantity: (state, action) => {
            const isAvailable = state.items.find((value) => value.name == action.payload.name);
            if (isAvailable) {
                isAvailable.quantity += 1;
                console.log("quantity adding by one");
            } else {
                state.items.push({ ...action.payload })
            }
        },
        decrementQuantity: (state, action) => {
            const isAvailable = state.items.find((value) => value.name == action.payload.name);
            if (isAvailable) {

                if (isAvailable.quantity == 1) {
                    console.log("quantity is 1 min");

                } else {
                    isAvailable.quantity -= 1
                }

            }
        }
    }
})
export const {
    addToCart,
    removeFromCart,
    IncremetQuantity,
    decrementQuantity
} = cartSlice.actions;
export default cartSlice.reducer;