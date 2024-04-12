import React from 'react'
import { importImg } from "./fetch.jsx";

export default function Image(props) {
    const image = importImg(props.path)

    return(
        <img src={image} alt={props.alt} width={props.width} height={props.height} />
    )
}