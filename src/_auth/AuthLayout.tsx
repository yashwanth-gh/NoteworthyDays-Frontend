import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'

const AuthLayout = () => {
  const location = useLocation();
  let imageName = location.pathname.split('/')[1];
  if(imageName==='signup' || imageName==='signin') imageName = 'sign';
  
  return (
    <>
            <div className="w-full flex">
            <section className='hidden justify-center items-center w-1/2  lg:block auth-form'>
                <img
                    src={`/public/${imageName}.svg`}
                    alt="shopping-illustration"
                    className='h-full w-full object-cover bg-no-repeat '
                />

            </section>
            <section className='flex flex-1 justify-center items-center flex-col auth-form'>
                <Outlet />
            </section>
        </div>
    </>
  )
}

export default AuthLayout