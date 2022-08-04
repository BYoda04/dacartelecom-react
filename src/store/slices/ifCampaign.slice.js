import { createSlice } from '@reduxjs/toolkit';

export const ifCampaignSlice = createSlice({
    name: 'ifCampaign',
    initialState: false,
    reducers: {
        setIfCampaign: (state,action)=>action.payload
    }
})

export const { setIfCampaign } = ifCampaignSlice.actions;

export default ifCampaignSlice.reducer;
