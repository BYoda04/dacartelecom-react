import { createSlice } from '@reduxjs/toolkit';

export const sectionSlice = createSlice({
    name: 'selectSection',
    initialState: {},
    reducers: {
        setSelectSection: (state,action)=>{
            return action.payload
        }
    }
})

export const { setSelectSection } = sectionSlice.actions;

export default sectionSlice.reducer;
