import { createSlice } from '@reduxjs/toolkit';

export const ifAdviserSlice = createSlice({
    name: 'ifAdviser',
    initialState: false,
    reducers: {
        setIfAdviser: (state,action)=>action.payload
    }
})

export const { setIfAdviser } = ifAdviserSlice.actions;

export default ifAdviserSlice.reducer;
