import { useState, useEffect } from 'react'
export function useFetch(url, options, setLoading) {
    const [data, setData] = useState(null);
    console.log("now in useData")
    useEffect(() => {
        if (url) {
            let ignore = false;
            fetch(url, options)
                .then(response => response.json())
                .then(json => {
                    if (!ignore) {
                        console.log(json)
                        setData(json);
                        setLoading(false)
                    }
                });
            return () => {
                ignore = true;
            };
        }
    }, [url, options, setLoading]);
    return data;
}

export function importImg(path) {
    const IMG_PATH = './img/'
    const [data, setData] = useState('');
    console.log("now in importImg")
    console.log(path)
    useEffect(() => {
        if (path) {
            let ignore = false;
            import(IMG_PATH + path)
                .then(response => response.default)
                .then(img => {
                    if (!ignore) {
                        console.log(img)
                        setData(img);
                    }
                });
            return () => {
                ignore = true;
            };
        }
    }, [path]);
    return data;
}

export function handleSubmit(props) {
    props.event.preventDefault()

    props.apiResponse = useFetch(props.url, req, setLoading)

    return(
        <div>
            {apiResponse ? (
                <div>{
                    props.handleResponse(apiResponse)
                }</div>) : (
                <div></div>
            )}
        </div>
    )
}
