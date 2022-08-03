import React, { useEffect, useState } from 'react';
import TableAdvisers from './table-advisers/TableAdvisers';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setUgi } from '../../store/slices/ugiVisible.slice';

const CardsInfoAdvisers = () => {

    const section = 1;
    const [advisers,setAdvisers] = useState([]);
    const [sectionUser] = useState(localStorage.getItem("section"));
    const dispatch = useDispatch();

    useEffect(()=>{
        if (sectionUser) {
            const getAdvisers = async ()=>{
                try {
                    const data = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/advisers/get/query?sectionId=${sectionUser}`);
                    const sect = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/sections/byid/${sectionUser}`);
                    sect.data.data.name.toLowerCase() === 'hogar'? dispatch(setUgi(true)) : dispatch(setUgi(false))
                    setAdvisers(data.data.advisers);
                } catch (error) {
                    console.log(error.response.data);
                };
            };
            
            getAdvisers();
        } else {
            const getAdvisers = async ()=>{
                try {
                    const data = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/advisers/get/query?sectionId=${section?.id}`);
                    setAdvisers(data.data.advisers);
                } catch (error) {
                    console.log(error.response.data);
                };
            };
            
            getAdvisers();
        };
    },[dispatch,sectionUser,section?.id]);

    return (
        <div className='cards-info'>
            <TableAdvisers products={section?.products}/>
            { advisers?.map(adviser=>(
                <TableAdvisers adviser={adviser} products={section?.products} key={adviser?.id}/>
            )) }
        </div>
    );
};

export default CardsInfoAdvisers;