import React from 'react'
import { importImg } from "./fetch.jsx";

export default function Image(props) {
    // let [loading, setLoading] = React.useState(true)
    const [image, setImage] = React.useState(null)
    importImg(props.path, image, setImage)

    return(
        <>
            {image &&
                <img src={image} alt={props.alt} width={props.width} height={props.height} />
            }
        </>
    )
}