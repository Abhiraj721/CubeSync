import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import "./MobileNavbar.css"
import { faClock,faGear,faBolt,faChartSimple,faRobot } from "@fortawesome/free-solid-svg-icons";
import cubeSyncLogo from "../../utility/cubesync logo.png"
import { Link } from 'react-router-dom';
export default function MobileNavbar() {
  return (
    <div className='mobileNavbar'>
      <div class="dropdown">
  <button  type="button" data-bs-toggle="dropdown" aria-expanded="false">
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
  <h4 style={{color:"white",backgroundColor:"black"}}><img className='logoimg' src={cubeSyncLogo} alt="" />CubeSync</h4>

</div>
    </div>
  )
}
