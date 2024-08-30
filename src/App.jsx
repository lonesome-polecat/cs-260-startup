import './App.css';
import './css/main.css'
import { BrowserRouter, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import React, {useEffect, useState, useMemo} from 'react'
import {Home} from "./home"
import {Login, Username} from "./login.jsx";
import {Menu} from "./menu"
import {Orders} from "./orders"
import {Contact} from "./contact"
import {useMountedFetch} from "./fetch.jsx";

function App() {
    let [loadingPage, setLoadingPage] = React.useState(true)
    let [isAuthenticated, setAuthenticated] = React.useState(false)

    useEffect(() => {
        const url = '/auth/me'
        let ignore = false;
        fetch(url)
            .then(response => response.json())
            .then(json => {
                if (!ignore) {
                    if (json.status === 200) {
                        window.localStorage.setItem("username", json.username)
                        setAuthenticated(true)
                    } else {
                        setAuthenticated(false)
                    }
                    setLoadingPage(false)
                }
            });
        return () => {
            ignore = true;
        };
    }, []);

    let [menuData, setMenuData] = useState(null)
    useMountedFetch('/api/menu', {headers: {'Content-Type': 'application/json'}}, menuData, setMenuData)
    const MenuComponent = useMemo(() => <Menu menuData={menuData}/>, [menuData])

    return (
        <BrowserRouter>
            {!loadingPage && (
                <>
                    <header>
                        <div className={"head"}>
                            <div>
                                <h2 className="pageTitle">Arizonuts</h2>
                            </div>
                            <Username isAuthenticated={isAuthenticated}/>
                        </div>
                        <nav>
                            <div>
                                <img id="burger-menu" src="img/Hamburger_icon.svg"/>
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
                    {/*<div>*/}
                    {/*    <Home style={{ display: (pathname === '/' || pathname === '/index') ? "block" : "none"}} />*/}
                    {/*    <Login style={{ display: pathname === '/login' ? "block" : "none"}} />*/}
                    {/*    <Menu style={{ display: pathname === '/menu' ? "block" : "none"}} />*/}
                    {/*    <Orders style={{ display: pathname === '/orders'? "block" : "none"}} />*/}
                    {/*    <Contact style={{ display: pathname === '/contact' ? "block" : "none"}} />*/}
                    {/*</div>*/}
                    <Routes>
                        <Route
                            path='/'
                            element={
                                <Home/>
                            }
                            exact
                        />
                        <Route path='/index' element={<Home/>}/>
                        <Route path='/login' element={<Login/>}/>
                        {/*<Route path='/menu' element={<Menu isAuthenticated={isAuthenticated} menuData={menuData}/>}/>*/}
                        <Route path='/menu' element={MenuComponent}/>
                        <Route path='/orders' element={<Orders isAuthenticated={isAuthenticated}/>}/>
                        <Route path='/contact' element={<Contact/>}/>
                        {/*<Route path='*' element={<NotFound />} />*/}
                    </Routes>
                </>
            )}
        </BrowserRouter>
    );
}

export default App;
