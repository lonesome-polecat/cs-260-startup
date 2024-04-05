import React from 'react'

export function Home() {
    console.log("printing out the dir name...")
    console.log(__filename)
    return(
        <main style={{display: "flex"}}>
            <p>Welcome to Arizonuts! Begin your tasty adventure...</p>
            <div className="img-row-container">
                <img className="img-row" alt="donuts1" src={require("./img/two_donuts_on_platter.jpg")} />
                <img className="img-row" alt="donuts2" src={require("./img/close_in_basket.jpg")} />
                <img className="img-row" alt="donuts3" src={require("./img/banana_cream_on_platter.jpg")}/>
            </div>
            <a href="https://github.com/lonesome-polecat/startup" target="_blank"><em>GitHub Repo</em></a>
        </main>
    )
}