import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useMountedFetch, useActionFetch, handleSubmit} from "./fetch.jsx";

export function LoginCard(props) {
    let [loading, setLoading] = React.useState(true)
    let [req, setReq] = React.useState({})
    const apiResponse = useActionFetch('/auth/login', req, setLoading)
    const navigate = useNavigate()

    function submitHandler(event) {
        event.preventDefault()

        console.log("I clicked submit")
        const loginForm = event.target.form
        setReq({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: loginForm.username.value,
                password: loginForm.password.value,
            })
        })
    }

    function handleAuthResponse() {
        if (apiResponse.status === 200) {
            window.location.replace('/')
        } else {
            setLoading(true)
            alert('Invalid credentials')
        }
    }

    return(
        <div id="login-container" className="login">
            <h3 style={{padding: '20px', color: '#555555'}}>Login</h3>
            <form className="login">
                <input type="text" id="username" placeholder="Email" /><br />
                <input type="password" id="password" placeholder="Password" /><br />
                <div id="login-buttons-container">
                    <input type="submit" id='login-button' className="login-buttons" value="Sign In"
                               onClick={submitHandler} />
                    <input type="button" className="subtle-button" value="Create Account"
                               onClick={props.changeCard} />
                </div>
            </form>
            {loading ? (
                <div></div>
            ) : (
                <div>
                    {handleAuthResponse()}
                </div>
            )}
        </div>
    )
}