import {useState, memo} from 'react'
import { useMountedFetch, importImg } from './fetch.jsx'
import Image from './Image.jsx'
import OrderDialog from './OrderDialog.jsx'
import './css/menu.css'

export function Menu({menuData}) {
    let [showDialog, setDialogDisplay] = useState(false)
    // let [loading, setLoading] = useState(true)
    // let [menuData, setMenuData] = useState(null)
    // useMountedFetch('/api/menu', {headers: {'Content-Type': 'application/json'}}, menuData, setMenuData)

    function buttonClickHandler(event) {
        setDialogDisplay(!showDialog)
    }

   return(
       <main className="menu">
           {!menuData ? (<p>Loading menu...</p>) : (
               <div>
                   <OrderDialog showDialog={showDialog} setDialogDisplay={setDialogDisplay} menuItems={menuData.menu_items}/>
                   <br />
                   <p style={{textAlign: "center"}}>Our weekly pics!</p>
                   <MenuImages menuData={menuData} />
                   <div id="make-order-button-container">
                       <button id="make-order" onClick={buttonClickHandler}>Order Now</button>
                   </div>
               </div>
           )}
       </main>
   )
}

const MenuImages = memo(function GetImages({menuData}) {
    return (
        <div id="menu-container">
            {menuData.menu_items.map(az => {
                return (
                    <div className={"menu-option"} key={az.name}>
                        <h3 className={"menu-option-title"} style={az.style}>{az.name}</h3>
                        <Image path={az.img} alt={az.name} width={300} height={300}/>
                    </div>
                )
            })}
        </div>
    )
})