import React from 'react'
import {useMountedFetch, fetchTimes} from "./fetch.jsx";
import { Times } from './times.jsx'

export default function OrderDialog(props) {
    let [totalCost, setTotalCost] = React.useState(0)

    function hideDialog() {
        props.setDialogDisplay(!props.showDialog)
    }

    return(
        <div>
            {props.showDialog ? (
                <dialog id="order-dialog" style={{display: 'flex'}}>
                    <span className={"close-button topright"} onClick={hideDialog}>&times;</span>
                    <p id={"order-dialog-header"}>Complete your order</p>
                    {props.menuItems.map(az => {
                        return(
                            <div className={"order-dialog-option-container"}>
                                <h3 className={"menu-option-title"} style={az.style}>{az.name}</h3>
                                <input id={`${az.id}-order-amount`} className={"amount-input"} type={"number"} defaultValue={0} min={0} step={1} />
                            </div>
                        )
                    })}
                    <div id='time-selection-container'>
                        <p id='time-selection-banner'>
                            Pickup Date and Time
                        </p>
                        <Times />
                    </div>
                    <p>Total cost for deliciousness: {}</p>
                    <button onClick=''>Confirm</button>
                </dialog>
            ) : (<div></div>)}
        </div>
    )
}
