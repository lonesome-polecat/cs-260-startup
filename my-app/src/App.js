import logo from './logo.svg';
import './App.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import {Navbar} from "./Navbar";
import {Home} from "./home"
import {Menu} from "./menu"
import {Orders} from "./orders"
import {Contact} from "./contact"

function App() {
  return (
      <BrowserRouter>

      <header>
        <div className={"head"}>
          <div>
            <h2 className="pageTitle">Arizonuts</h2>
          </div>
          <div className="displayUser">
          </div>
        </div>
        <nav>
          <div>
            <img id="burger-menu" src="img/Hamburger_icon.svg" />
            <ul className="navbar">
              <li>
                <NavLink className='nav-link' to='index'>Home</NavLink>
              </li>
              <li>
                <NavLink to='menu'>Menu</NavLink>
              </li>
              <li>
                <NavLink to='orders'>Orders</NavLink>
              </li>
              <li>
                <NavLink to='contact'>Contact</NavLink>
              </li>
            </ul>
            <div id="nav-pullout">
              <ul className="navbar">
                <li>
                  <NavLink to='index'>Home</NavLink>
                </li>
                <li>
                  <NavLink to='menu'>Menu</NavLink>
                </li>
                <li>
                  <NavLink to='orders'>Orders</NavLink>
                </li>
                <li>
                  <NavLink to='contact'>Contact</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
        <Routes>
          <Route
              path='/'
              element={
                <Home />
              }
              exact
          />
          <Route path='/index' element={<Home />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/contact' element={<Contact />} />
          {/*<Route path='*' element={<NotFound />} />*/}
        </Routes>
      </BrowserRouter>

  );
}

export default App;
