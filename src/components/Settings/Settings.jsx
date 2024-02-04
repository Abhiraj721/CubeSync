import React, { useState } from "react";
import "./Settings.css";
import { timerSettings } from "../Data/SettingsData";
import SettingCart from "./SettingsCart/SettingsCart";
export default function Settings() {
  const[settings,setSettings]=useState({
    "timerSettings":{
      inspection:"2",
      good:true,
      justtest:45

    },
    "themeSettings":{

    },
  })
  return (
    <div className="col col-lg-10 col-md-11 col-12">
      <div className="settingsPanel">
        <h1>Settings</h1>

        <div className="settingsChoices">
          <button className="settingsChoiceBtn">Timer</button>
          <button className="settingsChoiceBtn">Appearance</button>
          <button className="settingsChoiceBtn">Data</button>
        </div>
     
      {
        timerSettings.map((setting)=>{
      return <SettingCart settingInfo={setting} settings={settings} setSettings={setSettings} settingsType={"timerSettings"}/>
    
        })
      }
      </div>
    {  console.log(settings)}
    </div>
  );
}
