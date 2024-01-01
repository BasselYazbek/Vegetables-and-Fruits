import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from '../src/Nav.js'
import Main from './Main.js';
import FruitsMenu from './FruitsMenu.js';
import VegetablesMenu from './VegetablesMenu.js';
import HerbsMenu from './HerbsMenu.js';
import DiscountsMenu from './DiscountsMenu.js';
import Footer from './Footer.js';
import About from './About.js';

function App() {  
  const urlParams = new URLSearchParams(window.location.search);
  const isAdmin = urlParams.get('owner') === 'true';


  return (
    <>
    <Router>
      <div>
        <Nav isAdmin={isAdmin}/>
          <Routes>
            <Route path='/fruits' element={<FruitsMenu isAdmin={isAdmin}/>} />
            <Route path='/vegetables' element={<VegetablesMenu isAdmin={isAdmin}/>} />
            <Route path='/herbs' element={<HerbsMenu isAdmin={isAdmin}/>} />
            <Route path='/items_on_discount' element={<DiscountsMenu isAdmin={isAdmin}/>} />
            <Route path='/' exact element={<Main />} />
            <Route path='/about' exact element={<About />} />
          </Routes>
        <Footer />
      </div>
    </Router>
    </>
    );
}

export default App;
