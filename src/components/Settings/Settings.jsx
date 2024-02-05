import React, { useState} from "react";
import "./Settings.css";
import { timerSettings } from "../Data/SettingsData";
import SettingCart from "./SettingsCart/SettingsCart";
import { useEffect } from "react";

function Settings({settings, setSettings}) {
  
  return (
    <div className="col col-lg-10 col-md-11 col-12">
      <div className="settingsPanel">
        <h1>Settings</h1>

        <div className="settingsChoices">
          <button className="settingsChoiceBtn">Timer</button>
          <button className="settingsChoiceBtn">Appearance</button>
          <button className="settingsChoiceBtn">Data</button>
        </div>

        {settings &&
          timerSettings.map((setting) => {
            return (
              <SettingCart
                settingInfo={setting}
                settings={settings}
                setSettings={setSettings}
                settingsType={"timerSettings"}
              />
            );
          })}
      </div>
      {console.log(localStorage.getItem("settings"))}
    </div>
  );
}
export default Settings;
