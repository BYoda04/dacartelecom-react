import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setSectionSelect } from './sectionSelect.slice';

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
    const valid = getConfig();
    if (valid.headers.Authorization !== "Bearer null") {
        try {
            if (localStorage.getItem('section')) {
                const res = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/sections/${localStorage.getItem("section")}`,getConfig());
                dispatch(setSections([res.data.section]));
                dispatch(setSectionSelect(res.data.section))
            } else {
                const res = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/sections/get/query?campaignId=${campaign}`,getConfig());
                dispatch(setSections(res.data.sections));
                dispatch(setSectionSelect(res.data.sections[0]));
            };
        } catch (error) {
            console.log(error.response.data);
        };
    };
};

export default sectionsSlice.reducer;
