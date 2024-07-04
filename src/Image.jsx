import React from 'react'
import { importImg } from "./fetch.jsx";

export default function Image(props) {
    let [loading, setLoading] = React.useState(true)
    let image = importImg(props.path, setLoading)

    return(
        <>
            {!loading &&
                <img src={image} alt={props.alt} width={props.width} height={props.height} />
            }
        </>
    )
}