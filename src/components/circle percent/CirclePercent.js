import React from 'react';

const CirclePercent = ({radio,color,percent,size = 1}) => {

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
                                <h2 style={{fontSize:`${size}em`}}>{percent}<span>%</span></h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CirclePercent;