import React from 'react'
import { AppBar, Toolbar, Typography, styled } from '@mui/material'
import { Link } from 'react-router-dom'

const Component = styled(AppBar)`
  background: #fff;
  color: #000;
`

const Header = () => {
  return (
      <Component>
        <Toolbar className='justify-center gap-5'>
          <Link to='/' className='text-blue-600'>Home</Link>
          <Link to='/about' className='text-black'>About</Link>
          <Link to='/contact' className='text-black'>Contact</Link>
          <Link to='/login' className='text-black'>Logout</Link>
        </Toolbar>
      </Component>
  )
}

export default Header
