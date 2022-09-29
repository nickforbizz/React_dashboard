import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarFront from '../navbarFront/NavbarFront'
import './frontlayout.scss'

function Frontlayout({children}) {
  return (
    <div>
      <NavbarFront />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Frontlayout