import React from 'react'
import "./Navbar.css"
export default function Navbar() {
  return (
    <div className="vertical-navbar">
    <h2>Logo</h2>
    <nav className='NavbarHeader'>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </nav>
  </div>
  )
}
