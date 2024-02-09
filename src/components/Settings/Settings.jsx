import React, { useState} from "react";
import "./Settings.css";
import { timerSettings,themeSettings } from "../Data/SettingsData";
import SettingCart from "./SettingsCart/SettingsCart";
import { useEffect } from "react";


function Settings({settings, setSettings}) {
  const [currSettingsType,setcurrSettingsType]=useState(timerSettings)

 function handleSettingsTypeChange(changedSetting){
  setcurrSettingsType(changedSetting)
  } 
  return (
    <div className="col col-lg-10 col-md-11 col-12 settings">
      <div className="settingsPanel">
        <h1>Settings</h1>

        <div className="settingsChoices">
          <button onClick={()=> handleSettingsTypeChange(timerSettings)}  className="settingsChoiceBtn">Timer</button>
          <button onClick={()=> handleSettingsTypeChange(themeSettings)}  className="settingsChoiceBtn">Appearance</button>
          <button onClick={(e)=> handleSettingsTypeChange(e.target.value)}  className="settingsChoiceBtn">Data</button>
        </div>
{console.log(currSettingsType==timerSettings)}
        {settings &&
          currSettingsType.map((setting,index) => {
            return (
              <>

         {index!=0 && !setting.isSubSetting && <hr/>}
              <SettingCart
                settingInfo={setting}
                settings={settings}
                setSettings={setSettings}
                settingsType={currSettingsType==timerSettings ? "timerSettings" :currSettingsType==themeSettings ? "themeSettings" : "dataSettings" }
              />
              </>
            );
          })}
      </div>

    </div>
  );
}
export default Settings;
