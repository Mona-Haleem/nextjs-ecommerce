import React from 'react'
import NavBar from './navBar'
import Logo from './logo'

export default function Header() {
  return (
    <header className='flex p-3 text-white justify-between bg-blue-500'>
      <Logo/>
      <NavBar/>
    </header>
  )
}
