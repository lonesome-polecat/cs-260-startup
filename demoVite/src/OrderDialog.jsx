import React from 'react'

export default function OrderDialog(props) {

    function eventHandler() {
        props.setDialogDisplay(!props.showDialog)
    }

    return(
        <div>
            {props.showDialog ? (
                <dialog id="order-dialog" style={{display: 'flex'}}>
                    <span className={"close-button topright"} onClick={eventHandler}>&times;</span>
                    <p id={"order-dialog-header"}>Complete your order</p>
                    {props.menuItems.map(az => {
                        return(
                            <div className={"order-dialog-option-container"}>
                                <h3 className={"menu-option-title"} style={az.style}>{az.name}</h3>
                                {/* This is breaking things*/}
                                {/*<input id={`${az.id}-order-amount`} className={"amount-input"} type={"number"} defaultValue="0" min="0" step="0" onChange={(e) => {e.preventDefault(); e.target.value += 1}} />*/}
                            </div>
                        )
                    })}
                    <p>Total cost for deliciousness: 0</p>
                </dialog>
            ) : (<div></div>)}
        </div>
    )
}
