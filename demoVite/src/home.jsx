import React from 'react'
import pic1 from "./img/two_donuts_on_platter.jpg"
import pic2 from "./img/close_in_basket.jpg"
import pic3 from "./img/banana_cream_on_platter.jpg"

export function Home() {

    return(
        <main>
            <p>Welcome to Arizonuts! Begin your tasty adventure...</p>
            <div className="img-row-container">
                <img className="img-row" alt="donuts1" src={pic1} />
                <img className="img-row" alt="donuts2" src={pic2} />
                <img className="img-row" alt="donuts3" src={pic3}/>
            </div>
            <a href="https://github.com/lonesome-polecat/startup" target="_blank"><em>GitHub Repo</em></a>
        </main>
    )
}