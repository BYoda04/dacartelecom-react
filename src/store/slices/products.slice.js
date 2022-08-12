import { createSlice } from '@reduxjs/toolkit';

export const productsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        setProducts: (state,action)=>action.payload
    }
})

export const { setProducts } = productsSlice.actions;

export const getProducts = (section) =>async (dispatch) => {
    dispatch(setProducts(section.products));
};

export default productsSlice.reducer;
