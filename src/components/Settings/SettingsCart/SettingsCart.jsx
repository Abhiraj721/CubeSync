import React, { useEffect } from "react";
import "./SettingsCart.css";
import { useState } from "react";
export default function SettingCart({
  settingInfo,
  settings,
  setSettings,
  settingsType,
}) {
  function helper() {
    const settingState = settings.timerSettings[settingInfo.settingValue];
    const settingInputType = settingInfo.inputType;
    if(settingInputType=="button"){
      return <button>{settingInfo.settingValue}</button>
    }
   else if (settingInputType == "select") {
      return (
        <select
          name=""
          id=""
          value={settingState}
          onChange={(e) => handleSettingChange(e.target.value)}
        >
          {settingInfo.options.map((option) => {
            return <option value={option}>{option}</option>;
          })}
        </select>
      );
    } else if (settingInputType == "checkbox") {
      return (
        <input
          type="checkbox"
          name=""
          id=""
          checked={settingState}
          onChange={() => handleSettingChange(!settingState)}
        />
      );
    } else if (settingInputType === "range") {
      return (
        <input
          type={settingInputType}
          name=""
          id=""
          value={settingState}
          onChange={(e) => handleSettingChange(e.target.value)}
        />
      );
    } else if (settingInputType == "integer") {
      return (
        <input type="number" name="quantity" value={settingState} onChange={(e) => handleSettingChange(e.target.value)} min="0" max="100" step="1"></input>
      );
    }
  }
  function handleSettingChange(changedValue) {
    setSettings((prevSettings) => {
      return {
        ...prevSettings,
        [settingsType]: {
          ...prevSettings.timerSettings,
          [settingInfo.settingValue]: changedValue,
        },
      };
    });
  }

  return (
    <div className="settingsWrap">
      <div className="row">
        <div className="col col-lg-6 col-md-6 col-sm-6 settingInfo" style={settingInfo.isSubSetting ? {position:"relative",left:"4vw"} : {}}> 
          <h5>{settingInfo.title}</h5>
          <p>{settingInfo.description}</p>
        </div>
        <div className="col col-lg-6 col-md-6 col-sm-6 settingsInput">
          {helper()}
        </div>
      </div>
    </div>
  );
}
