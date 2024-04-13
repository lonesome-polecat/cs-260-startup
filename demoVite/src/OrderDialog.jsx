import React from 'react'
import {useMountedFetch} from "./fetch.jsx";

export default function OrderDialog(props) {
    let [totalCost, setTotalCost] = React.useState(0)
    let [loading, setLoading] = React.useState(true)
    const availableTimes = useMountedFetch('/menu/times', {method: 'GET'}, setLoading)

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
                    {loading ? (<></>) : (
                        <div id='time-selection-container'>
                            <p id='time-selection-banner'>
                                Pickup Date and Time
                            </p>
                            <div id='time-selection-row'>
                                <button id='date-selector'>{}</button>
                                <div>
                                    {availableTimes.days_and_times.days.forEach(day => {
                                        return(<button>day.date</button>)
                                    })}
                                </div>
                                <button id='time-selector'>{}</button>
                            </div>
                        </div>
                    )}
                    <p>Total cost for deliciousness: {}</p>
                    <button onClick=''>Confirm</button>
                </dialog>
            ) : (<div></div>)}
        </div>
    )
}
