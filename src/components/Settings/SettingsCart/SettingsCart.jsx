import React, { useEffect } from "react";
import "./SettingsCart.css";
import { useState } from "react";
import { ReactGiphySearchBox } from "react-giphy-searchbox";
import ExportImportModule from "../ExportImportModule/ExportImportModule";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";
export default function SettingCart({
  settingInfo,
  settings,
  setSettings,
  settingsType,
}) {
  const [image, setImage] = useState(null);
  function inputAssigner() {
    const settingState = settings[settingsType][settingInfo.settingValue];
    const settingInputType = settingInfo.inputType;
    if (settingInputType == "button") {
      return <button>{settingInfo.settingValue}</button>;
    } else if (settingInputType == "text") {
      return (
        <input
          type="text"
          value={settingState}
          onChange={(e) => handleSettingChange(e.target.value)}
        ></input>
      );
    } else if (settingInputType == "select") {
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
        <div class="checkbox-wrapper-59">
          <label class="switch">
            <input
              type="checkbox"
              name=""
              id=""
              checked={settingState}
              onChange={() => handleSettingChange(!settingState)}
            />
            <span class="slider"></span>
          </label>
        </div>
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
        <input
          type="number"
          name="quantity"
          value={settingState}
          onChange={(e) => handleSettingChange(e.target.value)}
          min="0"
          max="100"
          step="1"
        ></input>
      );
    } else if (settingInputType == "color") {
      console.log(settingState);
      return (
        <input
          type="color"
          value={settingState}
          onChange={(e) => handleSettingChange(e.target.value)}
          name=""
          id=""
        />
      );
    } else if (settingInputType == "file") {
      return (
        <input type="file" accept="image/*" onChange={handleImageChange} />
      );
    } else if (settingInputType == "gif") {
      return (
        <ReactGiphySearchBox
          apiKey="21mUcz382SFTDGHLY2Wk5nWbYG5rDmjI" // Required: get your on https://developers.giphy.com
          onSelect={(item) =>
            handleSettingChange(item.images.downsized_large.url)
          }
        />
      );
    }
  }
  function handleSettingChange(changedValue) {
    setSettings((prevSettings) => {
      return {
        ...prevSettings,
        [settingsType]: {
          ...prevSettings[settingsType],
          [settingInfo.settingValue]: changedValue,
        },
      };
    });
    console.log(settings);
  }
  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
      handleSettingChange("url(" + reader.result + ")");
    };

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };
  return (
    <div className="settingsWrap">
      <div className="row">
        <div
          className="col col-lg-6 col-md-6 col-sm-6 settingInfo"
          style={
            settingInfo.isSubSetting
              ? { position: "relative", left: "4vw" }
              : {}
          }
        >
          <h5>{settingInfo.title}</h5>
          <p>{settingInfo.description}</p>
        </div>
        <div className="col col-lg-6 col-md-6 col-sm-6 settingsInput">
          {inputAssigner()}
        </div>

        {/* {
  settingInfo.title === "import & export" && (

    <ExportImportModule settings={settings}/>
  )
} */}
      </div>
    </div>
  );
}
