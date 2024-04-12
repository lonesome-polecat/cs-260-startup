import React from 'react'
import {LoginCard} from "./LoginCard.jsx";
import {CreateUserCard} from "./CreateUserCard.jsx";

export function Login() {
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
                <LoginCard changeCard={changeCard} />
            ) : (
                <CreateUserCard changeCard={changeCard} />
            )}
            <br />
            <a href="https://github.com/lonesome-polecat/startup" target="_blank"><em>GitHub Repo</em></a>
        </main>
    )
}