import React from 'react'

function Card({ children, title }) {
  return (
    <div className='flex h-full flex-col bg-white rounded-xl lg:rounded-2xl shadow-md p-2 lg:p-4 gap-2 lg:gap-4 min-h-32 lg:min-h-60 w-full transform transition duration-500 hover:scale-101'>
        <h1 className='text-sm lg:text-[1.3rem] xl:text-[1.8rem] text-tertiary font-bold'>{title}</h1>
        <div className='flex justify-center items-center h-full w-full'>
            {children}
        </div>
    </div>
  )
}

export { Card };