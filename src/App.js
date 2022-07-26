import './App.css';
import './styles/home.css';
import './components/nav top/navTop.css';
import './components/table sales/tableSales.css';
import './components/circle percent/circlePercent.css';
import './components/cards info percent/cardsInfoPercent.css';
import './components/cards info advisers/cardsInfoAdvisers.css';
import './components/nav left/navLeft.css';
import './components/table advisers/tableAdviser.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NavTop from './components/nav top/NavTop';
import NavLeft from './components/nav left/NavLeft';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { loggin } from './store/slices/loged.slice';

function App() {

  const loged = useSelector(state=>state.loged);
  const dispatch = useDispatch();
  const [token] = useState(localStorage.getItem("token"));

  if (token) {
    dispatch(loggin(true))
  };

  return (
    <HashRouter>
      <div>
        <NavTop />
        <div className='body-page'>
          { loged ?
          <NavLeft />
          :
          <></> }

          <Routes>

            <Route path='/' element={<Home />}/>

          </Routes>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
