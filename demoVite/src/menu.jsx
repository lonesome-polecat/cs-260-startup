import React from 'react'

export function Menu() {
    let arizonuts = []
    let menu_rows = []

    async function getMenu() {
        let response = await fetch(`/api/menu`)
        response = await response.json()
        console.log(response.menu_items)
        menu_rows = response.menu_items
        return response.menu_items
    }

   return(
       <main className="menu">
           <dialog id="order-dialog">
           </dialog>
           <p style={{textAlign: "center"}}>Our weekly pics!</p>
           <div id="menu-container">
               {menu_rows.toString()}
           </div>
           <div>
               <button id="make-order" onClick="makeOrder()">Order Now</button>
           </div>
       </main>
   )
}