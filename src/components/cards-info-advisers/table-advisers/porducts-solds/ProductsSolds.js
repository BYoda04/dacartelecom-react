import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductsSolds = ({product,adviser}) => {

    const day = new Date().getDate();
    let month = new Date().getMonth()+1;
    const year = new Date().getFullYear();
    const [solds,setSolds] = useState([]);
    let total = 0
    
    if (month<10) {
        month = `0${month}`;
    };

    useEffect(()=>{
        const getSolds = async ()=>{
            try {
                const data = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/solds/get/querys?startDate=${year}-${month}-${day}&productId=${product?.id}&adviserId=${adviser?.id}`);
                setSolds(data.data.sales);
            } catch (error) {
                console.log(error.response.data);
            }
        }

        getSolds();
    },[adviser,product,day,month,year]);

    solds?.map(sold=>{
        return total = total + sold?.sold
    });

    return (
        <div key={product?.id}>
            <p>{ adviser ? total : product?.name }</p>
        </div>
    );
};

export default ProductsSolds;