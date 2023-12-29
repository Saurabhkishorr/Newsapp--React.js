import React from 'react'
import loading from "./ZZ5H.gif"

const Spinner = ()=>{
  
    return (
      <div className='text-center'>
        <img src={loading} alt="loading" style={{height:"20px"}}/>
      </div>
    )
  
}

export default Spinner