import axios from 'axios';
import React, { useEffect, useState } from 'react';

const CirclePercent = ({radio,color,percent = 0,size = 1,product,goal}) => {

    const day = new Date().getDate();
    let month = new Date().getMonth()+1;
    const year = new Date().getFullYear();
    let total = 0;
    let newPercent = 0;
    
    if (month<10) {
        month = `0${month}`;
    };

    const [solds,setSolds] = useState([]);

    useEffect(()=>{
        if (product) {
            const getData = async ()=>{
                try {
                    const data = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/solds/get/querys?startDate=${year}-${month}-${day}&productId=${product.id}`);
                    setSolds(data.data.sales);
                } catch (error) {
                    console.log(error.response.data);
                }
            }

            getData();
        }
    },[product,day,month,year]);

    if (solds.length) {
        solds.map(sold=>{
            total += sold.sold;
            return newPercent = ((total/goal)*100).toFixed(2);
        });
    };

    return (
        <div className='circle-percent'>
            <div className="cicle-percent__container">
                <div className="circle-percent__card">
                    <div className="box">
                        <div className="percent" id="measurer-sup" style={{
                            background: color,
                            width:`${Math.round(radio*2.14)}px`,
                            height:`${Math.round(radio*2.14)}px`
                        }}>
                            <svg style={{
                                width:`${Math.round(radio*2.17)}px`,
                                height:`${Math.round(radio*2.17)}px`
                            }}>
                                <circle cx={radio} cy={radio} r={radio} style={{
                                    strokeWidth: Math.round(radio*0.14),
                                    transform: `translate(${Math.round(radio*0.07)}px,${Math.round(radio*0.07)}px)`,
                                }}></circle>
                                <circle cx={radio} cy={radio} r={radio} style={{
                                    strokeWidth: Math.round(radio*0.14),
                                    transform: `translate(${Math.round(radio*0.07)}px,${Math.round(radio*0.07)}px)`,
                                    strokeDasharray: Math.round(radio*6.3),
                                    strokeDashoffset: Math.round(radio*6.3) - (Math.round(radio*6.3) * parseInt(percent)) / 100,
                                    stroke: color
                                    }}></circle>
                            </svg>
                            <div className="number">
                                <h2 style={{fontSize:`${size}em`}}>{ percent ? percent : newPercent }<span>%</span></h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CirclePercent;