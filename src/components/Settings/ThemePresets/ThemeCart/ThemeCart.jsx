import React, { useEffect } from "react";
import "./ThemeCart.css";
import { themeSettings } from "../../../Data/SettingsData";
import { json } from "react-router-dom";
export default function ThemeCart({ themeData ,setSettings}) {
  useEffect(() => {
 document.querySelector(
      "." + themeData.id
    ).style.backgroundImage = `-webkit-linear-gradient(30deg, ${themeData.code.backColor} 50%, ${themeData.code.boardColor} 50%)`;
  }, []);
  const applySelectedTheme=()=>{
    console.log("56")
setSettings(prevSettings=>({
    ...prevSettings,
    ["themeSettings"]: themeData.code
}))
  }
//   <button onClick={()=>  setSettings(prevSettings => ({
//     ...prevSettings,
//     [settingsType]: JSON.parse(importCode)
//   }))}>submit</button>
  return (
    <div className="col col-lg-4 col-6 themeCart" onClick={()=>applySelectedTheme()}>
      <div className={"cartContainer " + themeData.id}>
        <p>{themeData.name}</p>
      </div>
    </div>
  );
}
