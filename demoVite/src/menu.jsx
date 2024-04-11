import React from 'react'

export function Menu() {
    const IMG_PATH = './img/'
    let [arizonuts, setArizonuts] = React.useState([])
    let [dialogDisplay, setDialogDisplay] = React.useState({display: 'none'})

    function showDialog() {
        setDialogDisplay(dialogDisplay.display === 'flex' ? {display: 'none'} : {display: 'flex'})
    }

    function getMenu() {
        let response = async () => {
            return await fetch(`/api/menu`)
        }
        response().then(
            res => res.json()
        ).then(
            res => {
                res.menu_items.forEach(async (item) => item.img = await import(IMG_PATH + item.img))
                setArizonuts(res.menu_items)
            }
        )
    }

    getMenu()

    function OrderDialog() {
        return(
            <div>
                <span className={"close-button topright"} onClick={showDialog}>&times;</span>
                <p id={"order-dialog-header"}>Complete your order</p>
                {arizonuts.map(az => {
                    return(
                        <div className={"order-dialog-option-container"}>
                            <h3 className={"menu-option-title"} style={az.style}>{az.name}</h3>
                            {/* This is breaking things*/}
                            {/*<input id={`${az.id}-order-amount`} className={"amount-input"} type={"number"} defaultValue="0" min="0" step="0" onChange={(e) => {e.preventDefault(); e.target.value += 1}} />*/}
                        </div>
                    )
                })}
                <p>Total cost for deliciousness: 0</p>
            </div>
        )
    }

   return(
       <main className="menu">
           <dialog id="order-dialog" style={dialogDisplay}>
               <OrderDialog />
           </dialog>
           <p style={{textAlign: "center"}}>Our weekly pics!</p>
           <div id="menu-container">
               {arizonuts.map(az => {
                 return(
                     <div className={"menu-option"}>
                         <h3 className={"menu-option-title"} style={az.style}>{az.name}</h3>
                         <img alt={az.name} src={az.img.default} width={300} height={300} />
                     </div>
                 )
               })}
           </div>
           <div>
               <button id="make-order" onClick={showDialog}>Order Now</button>
           </div>
       </main>
   )
}