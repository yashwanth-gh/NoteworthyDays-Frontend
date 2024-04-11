import React from 'react'

const MiniLoader = () => {
  return (
    <div className='flex justify-center items-center w-full'>
        <img src="/public/loader1.svg"
        className='miniloader'
         alt="loader_svg"
         width={30}
         height={30} />
    </div>
  )
}

export default MiniLoader