import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import "./MobileNavbar.css"
export default function MobileNavbar() {
  return (
    <div className='mobileNavbar' style={{height:"45px"}}>
      <div class="dropdown">
  <button class="btn btn-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
  <FontAwesomeIcon icon={faBars} />
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#"></a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
  </ul>
</div>
<div   style={{color:"black",margin:"0 auto"}}>
    <p>Cube Pulse</p>
</div>
    </div>
  )
}
