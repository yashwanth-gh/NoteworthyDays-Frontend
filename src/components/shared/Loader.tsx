import React from 'react'

const Loader = () => {
  return (
    <div className='flex justify-center items-center h-screen w-screen bg-transparent backdrop-brightness-75 backdrop-blur-sm'>
        <img src="/public/loader.gif" alt="loading.." className='w-1/6' />
    </div>
  )
}

export default Loader