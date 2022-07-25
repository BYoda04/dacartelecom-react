import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TotalSolds = ({adviser}) => {

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
                const data = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/solds/get/querys?startDate=${year}-${month}-${day}&adviserId=${adviser?.id}`);
                setSolds(data.data.sales);
            } catch (error) {
                console.log(error.response.data);
            }
        }

        getSolds();
    },[adviser,day,month,year]);

    solds?.map(sold=>{
        return total += sold.sold
    });

    return (
        <div style={{
            background: '#405191'
        }}>
            <p>{ adviser ? total : 'Total' }</p>
        </div>
    );
};

export default TotalSolds;