import React from 'react'

const Loader = () => {
  return (
    <div className='flex justify-center items-center h-screen w-screen bg-transparent'>
        <img src="/public/loader2.svg" alt="loading.." className='miniloader' width={70} height={70}/>
    </div>
  )
}

export default Loader