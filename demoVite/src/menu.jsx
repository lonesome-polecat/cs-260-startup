import React from 'react'
import { useData, importImg } from './fetch.jsx'
import Image from './Image.jsx'
import OrderDialog from './OrderDialog.jsx'

export function Menu() {
    let [showDialog, setDialogDisplay] = React.useState(false)
    let [loading, setLoading] = React.useState(true)
    let menuData = useData('/api/menu', setLoading)

    function buttonClickHandler(event) {
        setDialogDisplay(!showDialog)
    }

   return(
       <main className="menu">
           {loading ? (<p>Loading menu...</p>) : (
               <div>
                   <OrderDialog showDialog={showDialog} setDialogDisplay={setDialogDisplay} menuItems={menuData.menu_items}/>
                   <p style={{textAlign: "center"}}>Our weekly pics!</p>
                   <div id="menu-container">
                       {menuData.menu_items.map(az => {
                           return(
                               <div className={"menu-option"} key={az.name}>
                                   <h3 className={"menu-option-title"} style={az.style}>{az.name}</h3>
                                   <Image path={az.img} alt={az.name} width={300} height={300} />
                               </div>
                           )
                       })}
                   </div>
                   <div>
                       <button id="make-order" onClick={buttonClickHandler}>Order Now</button>
                   </div>
               </div>
           )}
       </main>
   )
}