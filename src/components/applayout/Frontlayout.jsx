import React from 'react'
import { Outlet } from 'react-router-dom'
import './frontlayout.scss'

function Frontlayout({children}) {
  return (
    <div>
      <h1>This is front layout</h1>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Frontlayout