import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import "./MobileNavbar.css"
import { faClock,faGear,faBolt,faChartSimple,faRobot } from "@fortawesome/free-solid-svg-icons";

import { Link } from 'react-router-dom';
export default function MobileNavbar() {
  return (
    <div className='mobileNavbar'>
      <div class="dropdown">
  <button class="btn btn-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
  <FontAwesomeIcon icon={faBars} />
  </button>
  <ul class="dropdown-menu">
  <Link className="navItem" to={"/"}>
          <FontAwesomeIcon icon={faClock} />
            <li>timer</li>
          </Link>
          <Link className="navItem" to={"/trainer/3x3x3/OLL"}>
          <FontAwesomeIcon icon={faBolt} />  <li>Training</li>
          </Link>
          <Link className="navItem" to={"/stats"}>
          <FontAwesomeIcon icon={faChartSimple} /><li>Stats</li>
          </Link>
          <Link className="navItem" to={"/assistant"}>
          <FontAwesomeIcon icon={faRobot} />  <li>AI assistant</li>
          </Link>
          <Link className="navItem" to={"/settings"}>
          <FontAwesomeIcon icon={faGear} />  <li>Settings</li>
          </Link>
  </ul>
</div>
<div   style={{color:"black",margin:"0 auto"}}>
    <p>Cube Pulse</p>
</div>
    </div>
  )
}
