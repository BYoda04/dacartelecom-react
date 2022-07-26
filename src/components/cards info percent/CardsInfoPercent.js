import React, { useEffect, useState } from 'react';
import CirclePercent from '../circle percent/CirclePercent';
import { useSelector } from 'react-redux';
import axios from 'axios';

const CardsInfoPercent = () => {

  const colors = ["#f5641b","#c127e5","#f11e3e"];
  const day = new Date().getDate();
  let month = new Date().getMonth()+1;
  const year = new Date().getFullYear();
  let total = 0;
  let ugi = 0;
  let percent = 0;
  
  if (month<10) {
      month = `0${month}`;
  };

  const section = useSelector(state=>state.section);
  const ugiVisible = useSelector(state=>state.ugiVisible);
  const [solds,setSolds] = useState([]);
  const [goals,setGoals] = useState([]);

  useEffect(()=>{
    if (section.id) {
      const getData = async ()=>{
        try {
          const data = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/solds/get/querys?startDate=${year}-${month}-${day}&sectionId=${section?.id}`);
          const goal = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/goals/get/querys?startDate=${year}-${month}-${day}&sectionId=${section?.id}`);
          setSolds(data.data.sales);
          setGoals(goal.data.goals);
        } catch (error) {
          console.log(error.response.data);
          setSolds([]);
          setGoals([]);
        };
      
      };

      getData();
    };
  },[section]);

  if (solds.length) {
    solds.map(sold=>{
      const product = sold.product.name.split(' ');
      ugi += sold.sold*parseInt(product[0]);
      total += sold.sold;
      return percent = ((total/goals[0]?.goal)*100).toFixed(2)
    }); 
  };

    return (
          <div className='cards-info percent-container'>
            <div className='percent-general'>
              <div>
                <CirclePercent radio={108} color={"#f49d1c"} percent={ percent } size={3.5}/>
              </div>
              <div className='info-text-general'>
                <p>total: { total }</p>
                <p>meta: { goals.length ? goals[0].goal : 0 }</p>
                { ugiVisible ? <p>ugi: { ugi }</p> : <></> }
              </div>
            </div>
            <div className='percent-products'>
              { section?.products?.map(product=>(
                <div key={ product?.id }>
                  <CirclePercent radio={65} product={product} goal={goals[0]?.goal}/>
                  <p>{ product?.name }</p>
                </div>
              )) }
            </div>
          </div>
    );
};

export default CardsInfoPercent;