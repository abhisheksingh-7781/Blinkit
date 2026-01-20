import React from 'react'
import noData from '../assets/nothing here yet.webp'

const NoData = () => {
  return (
    <div className='flex flex-col justify-center items-center p-4'>
        <img 
            src={noData} 
            alt="no Data"
            className='w-36 '
             />

             <p className='text-neutral-500'>No Data</p>
    </div>
  )
}

export default NoData