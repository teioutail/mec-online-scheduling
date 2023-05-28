import React from 'react'
import imagegif from '../components/mecgif.gif'
const LoaderFullScreen = () => {

  return (
    <div className='loaderFullScreen image-container'>
         <img src={imagegif} 
        style={{
            width: '100px',
            height: '100px',
            margin: 'auto',
            display: 'block',
        }}/>
    </div>
  )
}

export default LoaderFullScreen