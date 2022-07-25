import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const campaignsSlice = createSlice({
    name: 'campaigns',
    initialState: [],
    reducers: {
        setCampaigns: (state,action)=>{
            return action.payload
        },
    }
});

export const { setCampaigns } = campaignsSlice.actions;

export const getCampaigns = () => async (dispatch) => {
    try {
        const data = await axios.get("https://api-dacartelecom.herokuapp.com/api/v1/campaigns");
        dispatch(setCampaigns(data.data.data))
    } catch (error) {
        console.log(error);
    }
}

export default campaignsSlice.reducer;
