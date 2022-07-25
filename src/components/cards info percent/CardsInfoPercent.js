import React from 'react';
import CirclePercent from '../circle percent/CirclePercent';

const CardsInfoPercent = () => {
    return (
          <div className='cards-info percent-container'>
            <div className='percent-general'>
              <div>
                <CirclePercent radio={108} color={"#f49d1c"} percent={((30/60)*100).toFixed(2)} size={3.5}/>
              </div>
              <div className='info-text-general'>
                <p>total: 30</p>
                <p>meta: 60</p>
                <p>ugi: 49</p>
              </div>
            </div>
            <div className='percent-products'>
              <div>
                <CirclePercent radio={65} color={"#f5641b"} percent={((10/60)*100).toFixed(2)}/>
                <p>Product 1</p>
              </div>
              <div>
                <CirclePercent radio={65} color={"#c127e5"} percent={((5/60)*100).toFixed(2)}/>
                <p>Product 1</p>
              </div>
              <div>
                <CirclePercent radio={65} color={"#f11e3e"} percent={((15/60)*100).toFixed(2)}/>
                <p>Product 1</p>
              </div>
            </div>
          </div>
    );
};

export default CardsInfoPercent;