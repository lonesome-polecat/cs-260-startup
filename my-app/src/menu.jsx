import React from 'react'

export function Menu() {
    let arizonuts = []

    async function getMenu() {
        let response = await fetch(`http://localhost:4000/api/menu`)
        console.log(await response.json())
        return await response.json()
    }

   return(
       <main className="menu">
           <dialog id="order-dialog">
           </dialog>
           <p style={{textAlign: "center"}}>Our weekly pics!</p>
           <div id="menu-container">
               {JSON.stringify(getMenu())}
           </div>
           <div>
               <button id="make-order" onClick="makeOrder()">Order Now</button>
           </div>
       </main>
   )
}