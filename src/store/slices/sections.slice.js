import { createSlice } from '@reduxjs/toolkit';

export const sectionsSlice = createSlice({
    name: 'sections',
    initialState: [],
    reducers: {
        setSectionsRedux: (state,action)=>{
            return action.payload
        }
    }
})

export const { setSectionsRedux } = sectionsSlice.actions;

export default sectionsSlice.reducer;
