import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <>
            <>
            <section className='hidden justify-center items-center w-1/2  lg:block'>
                <img
                    src="/public/party-planner.svg"
                    alt="shopping-illustration"
                    className='h-auto w-auto object-cover bg-no-repeat '
                />

            </section>
            <section className='flex flex-1 justify-center items-center flex-col auth-form'>
                <Outlet />
            </section>
        </>
    </>
  )
}

export default AuthLayout