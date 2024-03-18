import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { faClock,faGear,faBolt,faChartSimple,faRobot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cubesyncLogo from "../../utility/cubesync logo.png"

const isMidWidth=window.innerWidth<=991

export default function Navbar() {
  return (
    <div className="vertical-navbar boardContainer">
    {isMidWidth ? <img className="navTitle logoimg" src={cubesyncLogo} alt="" /> : <h4 className="navTitle"><span style={{margin:"3px"}}><img className="logoimg" src={cubesyncLogo} alt="" /></span>CubeSync</h4>}  
      <nav className="NavbarHeader">
        <ul>
          <Link className="navItem" to={"/"}>
          <FontAwesomeIcon icon={faClock} />
          {!isMidWidth ?  <li>timer</li>:""}
          </Link>
          <Link className="navItem" to={"/trainer/3x3x3/OLL"}>
          <FontAwesomeIcon icon={faBolt} /> {!isMidWidth ?<li>Training</li>:""}
          </Link>
          <Link className="navItem" to={"/stats"}>
          <FontAwesomeIcon icon={faChartSimple} />{!isMidWidth ?<li>Stats</li>:""}
          </Link>
          <Link className="navItem" to={"/assistant"}>
          <FontAwesomeIcon icon={faRobot} /> {!isMidWidth ? <li>AI assistant</li>:""}
          </Link>
          <Link className="navItem" to={"/settings"}>
          <FontAwesomeIcon icon={faGear} /> {!isMidWidth ?  <li>Settings</li>:""}
          </Link>

        </ul>
      </nav>
    </div>
  );
}
