import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';

export const sharedDocumentsSlice = createSlice({
    name: 'sharedDocuments',
    initialState: [],
    reducers: {
        setSharedDocuments: (state,action)=>action.payload
    }
})

export const { setSharedDocuments } = sharedDocumentsSlice.actions;

export const getSharedDocuments = () => (dispatch) => {
    let proob = getConfig()
    if (proob.headers.Authorization !== "Bearer null") {
        const getDocs =async ()=>{
            try {
                const res = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/files/get/permission`,getConfig());
                dispatch(setSharedDocuments(res.data.data));
            } catch (error) {
                console.log(error.response.data);
            };
        };

        getDocs();
    };
};

export default sharedDocumentsSlice.reducer;
