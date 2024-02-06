import React from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'
export default function Navbar() {
  return (
    <div className="vertical-navbar">
    <h2>Logo</h2>
    <nav className='NavbarHeader'>
      <ul>
        <li>Home</li>
        <li>About</li>
        <Link to={"/settings"}> <li>Contact</li></Link>
      </ul>
    </nav>
  </div>
  )
}
