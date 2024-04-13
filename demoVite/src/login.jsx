import React from 'react'
import { NavLink } from 'react-router-dom'
import {LoginCard} from "./LoginCard.jsx";
import {CreateUserCard} from "./CreateUserCard.jsx";
import {useMountedFetch} from "./fetch.jsx";

export function Login(props) {
    let [card, setCard] = React.useState('login')

    function changeCard() {
        setCard(card === 'login' ? 'createUser' : 'login')
    }

    return(
        <main>
            <br />
            <p>Welcome to Arizonuts! Begin your tasty adventure...</p>
            <br />
            {card === 'login' ? (
                <LoginCard changeAuthentication={props.changeAuthentication} changeCard={changeCard} />
            ) : (
                <CreateUserCard changeCard={changeCard} />
            )}
            <br />
            <a href="https://github.com/lonesome-polecat/startup" target="_blank"><em>GitHub Repo</em></a>
        </main>
    )
}

export function Username(props) {
    let [loading, setLoading] = React.useState(true)
    let [req, setReq] = React.useState({})
    const apiResponse = useMountedFetch('/auth/logout', req, setLoading)

    function logout(event) {
        setReq({method: 'DELETE'})
        window.localStorage.removeItem('username')
        props.changeAuthentication()
        window.location.reload()
    }

    return(
        <div className="displayUser">
            {props.isAuthenticated ? (
                <p id='user-dropdown' className='displayUser'>
                    {window.localStorage.getItem('username')}
                    <div id='user-dropdown-content'>
                        <button id='logout' onClick={logout}>Log out</button>
                    </div>
                </p>
            ) : (
                <NavLink to='login'>Login</NavLink>
            )}
        </div>
    )
}