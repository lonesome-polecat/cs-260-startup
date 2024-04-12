import './App.css';
import './css/main.css'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import React from 'react'
import {Home} from "./home"
import {Login} from "./login.jsx";
import {Menu} from "./menu"
import {Orders} from "./orders"
import {Contact} from "./contact"

function App() {
    let [isAuthenticated, setAuthenticated] = React.useState(false)

    return (
        <BrowserRouter>

            <header>
                <div className={"head"}>
                    <div>
                        <h2 className="pageTitle">Arizonuts</h2>
                    </div>
                    <div className="displayUser">
                        {isAuthenticated ? (<p>Username</p>) : (
                            <NavLink to='login'>Login</NavLink>
                        )}
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
                <Route path='/login' element={<Login />} />
                <Route path='/menu' element={<Menu />} />
                <Route path='/orders' element={<Orders />} />
                <Route path='/contact' element={<Contact />} />
                {/*<Route path='*' element={<NotFound />} />*/}
            </Routes>
        </BrowserRouter>

    );
}

export default App;
