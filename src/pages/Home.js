import React from 'react';
import CardsInfoAdvisers from '../components/cards info advisers/CardsInfoAdvisers';
import CardsInfoPercent from '../components/cards info percent/CardsInfoPercent';
import TableSales from '../components/table sales/TableSales';
import { useSelector } from 'react-redux';

const Home = () => {

  const loged = useSelector(state=>state.loged);

    return (
        <div className='home'>
          <div className='home-container'>
            { loged ? 
            <></>
            :
            <div className='table-sales'>
              <TableSales />
            </div> }
            <div className='cards-container'>
              <CardsInfoPercent />
              <CardsInfoAdvisers />
            </div>
          </div>  
        </div>
    );
};

export default Home;