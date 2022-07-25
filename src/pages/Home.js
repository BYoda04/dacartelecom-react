import React from 'react';
import CardsInfoAdvisers from '../components/cards info advisers/CardsInfoAdvisers';
import CardsInfoPercent from '../components/cards info percent/CardsInfoPercent';
import TableSales from '../components/table sales/TableSales';

const Home = () => {
    return (
        <div className='home'>
          <div className='home-container'>
            <div className='table-sales'>
              <TableSales />
            </div>
            <div className='cards-container'>
              <CardsInfoPercent />
              <CardsInfoAdvisers />
            </div>
          </div>  
        </div>
    );
};

export default Home;