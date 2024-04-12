import React from 'react'
import {LoginCard} from "./LoginCard.jsx";
import {CreateUserCard} from "./CreateUserCard.jsx";

export function Login() {
    return(
        <main>
            <p>Welcome to Arizonuts! Begin your tasty adventure...</p>
            <LoginCard />
            <CreateUserCard />
            <a href="https://github.com/lonesome-polecat/startup" target="_blank"><em>GitHub Repo</em></a>
        </main>
    )
}