import './App.css';
import './styles/home.css';
import './styles/login.css';
import './components/nav-top/navTop.css';
import './components/table-sales/tableSales.css';
import './components/cards-info-percent/cardsInfoPercent.css';
import './components/cards-info-percent/circle-percent/circlePercent.css';
import './components/cards-info-advisers/cardsInfoAdvisers.css';
import './components/cards-info-advisers/table-advisers/tableAdviser.css';
import './components/nav-left/navLeft.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import ProtectedRoutes from './components/ProtectedRoutes';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { loggin } from './store/slices/loged.slice';
import Input from './pages/Input';
import Files from './pages/Files';

function App() {

  const dispatch = useDispatch();
  const [token] = useState(localStorage.getItem("token"));

  if (token) {
    dispatch(loggin(true))
  };

  return (
    <HashRouter>
        <div className='body-page'>

            <Routes>

              <Route path='/' element={<Login />}/>

                  <Route element={<ProtectedRoutes />}>
                    <Route path='/home' element={<Home />}/>
                    <Route path='/input' element={<Input />}/>
                    <Route path='/files' element={<Files />}/>
                  </Route>

            </Routes>
        </div>
    </HashRouter>
  );
}

export default App;
