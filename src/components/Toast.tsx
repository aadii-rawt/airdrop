import React, { useEffect } from 'react'

const Toast = ({showToast,setShowToast}) => {
    
    useEffect(() => {
        const id =  setTimeout(() => {
            setShowToast(null)
        }, 3000);
    },[])
  return (
    <div className='text-sm p-5 px-8 border absolute right-10 rounded bottom-10 text-white border-white'>
        <h1></h1>
    </div>
  )
}

export default Toast