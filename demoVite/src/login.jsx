import React from 'react'
import {LoginCard} from "./LoginCard.jsx";
import {CreateUserCard} from "./CreateUserCard.jsx";

export function Login() {
    return(
        <main>
            <br />
            <p>Welcome to Arizonuts! Begin your tasty adventure...</p>
            <br />
            <LoginCard />
            <CreateUserCard />
            <br />
            <a href="https://github.com/lonesome-polecat/startup" target="_blank"><em>GitHub Repo</em></a>
        </main>
    )
}