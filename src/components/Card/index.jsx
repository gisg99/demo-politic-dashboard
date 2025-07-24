import React from 'react'

function Card({ children, title }) {
  return (
    <div className='flex flex-col bg-primary rounded-2xl shadow-md p-4 min-h-80 w-full transform transition duration-500 hover:scale-101'>
        <h1 className='text-[1.1rem] text-tertiary font-semibold'>{title}</h1>
        <div className='flex justify-center items-center h-full w-full'>
            {children}
        </div>
    </div>
  )
}

export { Card };
