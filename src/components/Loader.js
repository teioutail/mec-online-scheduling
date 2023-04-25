import React from 'react'
// import { Spinner } from 'react-bootstrap'
import imagegif from '../components/mecgif.gif'
const Loader = () => {
    return (
        // <Spinner
        //     animation='border'
        //     role='status'
        //     style={{
        //         width: '100px',
        //         height: '100px',
        //         margin: 'auto',
        //         display: 'block',
        //     }}
        // >
        //     <span className="sr-only">Loading...</span>
        // </Spinner>
        <img src={imagegif} 
        style={{
            width: '100px',
            height: '100px',
            margin: 'auto',
            display: 'block',
        }}/>
    )
}

export default Loader
