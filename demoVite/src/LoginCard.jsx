import React from 'react'

export function LoginCard() {
    return(
        <div id="login-container" className="login">
            <h3 style={{padding: '20px', color: '#555555'}}>Login</h3>
            <form className="login">
                <input type="text" id="username" placeholder="Email" /><br />
                <input type="password" id="password" placeholder="Password" /><br />
                <div id="login-buttons-container">
                    <input type="button" id='login-button' className="login-buttons" value="Sign In"
                               onClick="submitLogin()" />
                    <input type="button" className="subtle-button" value="Create Account"
                               onClick="displayCreateUser()" />
                </div>
            </form>
        </div>
    )
}