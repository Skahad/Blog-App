// import { Typography } from '@mui/material'
import React from 'react'

const Banner = () => {
  return (
    <div className='bg-[url(/Banner.jpg)] h-80 bg-[center_center] w-full bg-cover bg-no-repeat flex flex-col items-center justify-center space-y-2'>
      <h1 className='text-3xl font-extrabold mt-40 text-white'>BLOG</h1>
      <p className='text-black font-bold text-md bg-amber-200 py-1 px-2 rounded'>Welcome to the Blog World</p>
    </div>
  )
}

export default Banner
