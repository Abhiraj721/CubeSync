import React, { useState } from "react";
import "./Settings.css";
import { timerSettings, themeSettings,dataSettings } from "../Data/SettingsData";
import SettingCart from "./SettingsCart/SettingsCart";
import { useEffect } from "react";
import ExportImportModule from "./ExportImportModule/ExportImportModule";

function Settings({ settings, setSettings,sessions,setSessions }) {
  const [currSettingsType, setcurrSettingsType] = useState(timerSettings);

  function handleSettingsTypeChange(changedSetting) {
    setcurrSettingsType(changedSetting);
  }
  function getCurrSettingType() {
    return currSettingsType == timerSettings
      ? "timerSettings"
      : currSettingsType == themeSettings
      ? "themeSettings"
      : "dataSettings";
  }
  return (
    <div className="col col-lg-10 col-md-11 col-12 settings">
      <div className="settingsPanel">
        <h1>Settings</h1>

        <div className="settingsChoices">
          <button
            onClick={() => handleSettingsTypeChange(timerSettings)}
            className="settingsChoiceBtn"
          >
            Timer
          </button>
          <button
            onClick={() => handleSettingsTypeChange(themeSettings)}
            className="settingsChoiceBtn"
          >
            Appearance
          </button>
          {console.log(dataSettings)}
          <button
            onClick={() => handleSettingsTypeChange(dataSettings)}
            className="settingsChoiceBtn"
          >
            Data
          </button>
        </div>
        {settings &&
          currSettingsType.map((setting, index) => {
            return (
              <>
                {index != 0 && !setting.isSubSetting && <hr />}
                {setting.conditionRule == null ||
                settings[getCurrSettingType()][setting.conditionRule[0]] ==
                  setting.conditionRule[1] ? (
                  <SettingCart
                    settingInfo={setting}
                    settings={settings}
                    setSettings={setSettings}
                    settingsType={getCurrSettingType()}
                    sessions={sessions}
                    setSessions={setSessions}
                    
                  />
                ) : (
                  ""
                )}
              </>
            );
          })}
      </div>
    </div>
  );
}
export default Settings;
