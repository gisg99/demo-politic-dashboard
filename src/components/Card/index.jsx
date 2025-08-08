import React from 'react'

function Card({ children, title }) {
  return (
    <div className='flex flex-col bg-white rounded-2xl shadow-md p-4 gap-4 min-h-60 w-full transform transition duration-500 hover:scale-101'>
        <h1 className='text-[1.3rem] xl:text-[1.8rem] text-tertiary font-bold'>{title}</h1>
        <div className='flex justify-center items-center  h-full w-full'>
            {children}
        </div>
    </div>
  )
}

export { Card };
