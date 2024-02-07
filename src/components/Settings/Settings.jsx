import React, { useState} from "react";
import "./Settings.css";
import { timerSettings,themeSettings } from "../Data/SettingsData";
import SettingCart from "./SettingsCart/SettingsCart";
import { useEffect } from "react";

function Settings({settings, setSettings}) {
  const [currSettingChoice,setcurrSettingChoice]=useState(timerSettings)

 function handleSettingChoiceChange(changedSetting){
  setcurrSettingChoice(changedSetting)
  } 
  return (
    <div className="col col-lg-10 col-md-11 col-12 settings">
      <div className="settingsPanel">
        <h1>Settings</h1>

        <div className="settingsChoices">
          <button onClick={(e)=> handleSettingChoiceChange(timerSettings)}  className="settingsChoiceBtn">Timer</button>
          <button onClick={(e)=> handleSettingChoiceChange(themeSettings)}  className="settingsChoiceBtn">Appearance</button>
          <button onClick={(e)=> handleSettingChoiceChange(e.target.value)}  className="settingsChoiceBtn">Data</button>
        </div>

        {settings &&
          currSettingChoice.map((setting,index) => {
            return (
              <>
         {index!=0 && !setting.isSubSetting && <hr/>}
              <SettingCart
                settingInfo={setting}
                settings={settings}
                setSettings={setSettings}
                settingsType={"timerSettings"}
              />
              </>
            );
          })}
      </div>
    </div>
  );
}
export default Settings;
