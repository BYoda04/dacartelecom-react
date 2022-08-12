import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';

export const sectionsSlice = createSlice({
    name: 'sections',
    initialState: [],
    reducers: {
        setSections: (state,action)=>{
            return action.payload
        }
    }
})

export const { setSections } = sectionsSlice.actions;

export const getSections = (campaign) =>async (dispatch) => {
    dispatch(setSections(campaign.sections));
};

export const getSectionsUser = () =>async (dispatch) => {
    const valid = getConfig();
    if (valid.headers.Authorization !== "Bearer null") {
        try {
            const res = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/sections/${localStorage.getItem("section")}`,getConfig());
            dispatch(setSections([res.data.section]));
        } catch (error) {
            console.log(error.response.data);
        };
    };
};

export default sectionsSlice.reducer;
