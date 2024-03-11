import React from 'react'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div>
        <header>This is Header</header>
        <div className="">
            <Outlet/>
        </div>
        <footer>This is Footer</footer>
    </div>
  )
}

export default Layout