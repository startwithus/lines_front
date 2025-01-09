import React from 'react'
import '../loader/loader.css'
const Loader = ({message}) => {
  return (
    <div className="loader">
    <div className="spinner"></div>
    <p>Connecting...</p>
</div>
  )
}

export default Loader