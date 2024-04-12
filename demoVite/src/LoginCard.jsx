import React from 'react'
import {useFetch, handleSubmit} from "./fetch.jsx";

export function LoginCard(props) {
    let [loading, setLoading] = React.useState(true)
    let [req, setReq] = React.useState({})
    const apiResponse = useFetch('http://localhost:4000/auth/login', req, setLoading)

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
                    {console.log(apiResponse)}
                </div>
            )}
        </div>
    )
}