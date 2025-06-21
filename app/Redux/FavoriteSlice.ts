import { createSlice } from "@reduxjs/toolkit";

interface FavoriteItem {
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
    volume: number,
    parentid: number
}

interface Favorite {
    items: FavoriteItem[]
}

const initialState: Favorite = {
    items: []
}
const FavoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        addToFavorite: (state, action) => {
            const isAvailable = state.items.some(item => item.id === action.payload.id);
            if (!isAvailable) {
                state.items.push(action.payload);
            }
        },
        removeFromFavorite: (state, action) => {
            state.items = state.items.filter(item => item.id != action.payload);
        }
    }
})


export const {
    addToFavorite,
    removeFromFavorite,
} = FavoriteSlice.actions;
export default FavoriteSlice.reducer;