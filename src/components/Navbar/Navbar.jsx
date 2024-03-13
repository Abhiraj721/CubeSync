import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { faClock,faGear,faBolt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Navbar() {
  return (
    <div className="vertical-navbar boardContainer">
      <h3 className="navTitle">CubeSync</h3>
      <nav className="NavbarHeader">
        <ul>
          <Link className="navItem" to={"/"}>
          <FontAwesomeIcon icon={faClock} />
            <li>timer</li>
          </Link>
          <Link className="navItem" to={"/trainer/3x3x3/OLL"}>
          <FontAwesomeIcon icon={faBolt} />  <li>Training</li>
          </Link>
          <Link className="navItem" to={"/stats"}>
          <FontAwesomeIcon icon={faGear} />  <li>Stats</li>
          </Link>
          <Link className="navItem" to={"/settings"}>
          <FontAwesomeIcon icon={faGear} />  <li>Settings</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}
