import React, { useEffect, useState } from 'react';
import TableAdvisers from '../table advisers/TableAdvisers';
import { useSelector } from 'react-redux';
import axios from 'axios';

const CardsInfoAdvisers = () => {

    const section = useSelector(state=>state.section);
    const [advisers,setAdvisers] = useState([]);

    useEffect(()=>{
        const getAdvisers = async ()=>{
            try {
                const data = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/advisers/get/query?sectionId=${section?.id}`);
                setAdvisers(data.data.advisers);
            } catch (error) {
                console.log(error.response.data);
            };
        };

        getAdvisers();
    },[section]);

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