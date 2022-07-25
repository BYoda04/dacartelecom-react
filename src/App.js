import './App.css';
import './styles/home.css';
import './components/nav top/navTop.css';
import './components/table sales/tableSales.css';
import './components/circle percent/circlePercent.css';
import './components/cards info percent/cardsInfoPercent.css';
import './components/cards info advisers/cardsInfoAdvisers.css';
import './components/table advisers/tableAdviser.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NavTop from './components/nav top/NavTop';

function App() {
  return (
    <HashRouter>
      <div>
        <NavTop />

        <Routes>

          <Route path='/' element={<Home />}/>

        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
