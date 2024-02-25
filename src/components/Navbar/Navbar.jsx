import React from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'
export default function Navbar() {
  return (
    <div className="vertical-navbar boardContainer">
    <h2>CubeSync</h2>
    <nav className='NavbarHeader'>
      <ul>
      <Link to={"/"}><li>timer</li></Link>
        <li>About</li>
        <Link to={"/settings"}> <li>Settings</li></Link>
      </ul>
    </nav>
  </div>
  )
}
