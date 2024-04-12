import React from 'react'

export function CreateUserCard() {
    return(
        <div id="create-user-container" className="login">
            <h4 style={{textAlign: 'center', padding: '20px', color: '#666666'}}>Create a new account</h4>
            <form className="login">
                <input type="text" id="new-user-first-name" placeholder="*First name" /><br />
                    <input type="text" id="new-user-last-name" placeholder="Last name" /><br/>
                    <input type="email" id="new-user-email" placeholder="*Email" /><br />
                    <input type="password" id="new-user-password" placeholder="Password" /><br />
                    <input type="password" id="new-user-confirm-password" placeholder="Confirm Password" /><br />
                    <div id="create-user-buttons-container">
                        <input type="button" className="login-buttons" id="create-user-button" value="Create Account" onClick="createUser()" />
                        <input type="button" className="subtle-button" value="Return to Login" onClick="displayLogin()" />
                    </div>
            </form>
        </div>
    )
}