import React from 'react'

export function Menu() {
   return(
       <main className="menu">
           <dialog id="order-dialog">
           </dialog>
           <p style={{textAlign: "center"}}>Our weekly pics!</p>
           <div id="menu-container">
           </div>
           <div>
               <button id="make-order" onClick="makeOrder()">Order Now</button>
           </div>
       </main>
   )
}