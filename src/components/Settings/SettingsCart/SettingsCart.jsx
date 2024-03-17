import React, { useEffect } from "react";
import "./SettingsCart.css";
import { useState } from "react";
import { ReactGiphySearchBox } from "react-giphy-searchbox";
import ExportImportModule from "../ExportImportModule/ExportImportModule";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import ThemePresets from "../ThemePresets/ThemePresets";
export default function SettingCart({
  settingInfo,
  settings,
  setSettings,
  settingsType,
  sessions,
  setSessions
}) {
  const [image, setImage] = useState(null);
  const [userData,setUserData]=useState(null)


  function inputAssigner() {
 const settingState = settings[settingsType][settingInfo.settingValue];
    const settingInputType = settingInfo.inputType;
    if (settingInputType == "button" && settingInfo.title=="export") {
      return <button onClick={downloadCurrSessions}>{settingInfo.settingValue}</button>;
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

      {console.log(userData)}
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
      if(settingInfo.title=="upload Image"){
        return (
          <input type="file" accept="image/*" onChange={handleImageChange} />
        );
      }else  if(settingInfo.title=="Import Data"){
        return (
          <input type="file" accept=".txt" onChange={(e)=>handleTextFileChange(e)} />

        );
      }

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
  const handleTextFileChange = (event) => {
    console.log("text");

    const selectedFile = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
        const text = reader.result;
        setUserData(JSON.parse(text))
        setSessions(JSON.parse(text))
    };

    if (selectedFile) {
        reader.readAsText(selectedFile);
    }
};
function downloadCurrSessions(){
  const currentDate = new Date();
  const dateString = currentDate.toISOString().slice(0, 10); // Format: YYYY-MM-DD
  const timeString = currentDate.toTimeString().slice(0, 8).replace(/:/g, '-'); // Format: HH-MM-SS
  const fileName = `cubesync-${dateString}-${timeString}.txt`;
  const fileContent = JSON.stringify(sessions);

  // Create a Blob with the file content
  const blob = new Blob([fileContent], { type: 'text/plain' });

  // Create a link element
  const link = document.createElement('a');

  // Set the href attribute of the link to the Blob object
  link.href = URL.createObjectURL(blob);

  // Set the download attribute to specify the filename
  link.download = fileName;

  // Append the link to the document body
  document.body.appendChild(link);

  // Programmatically click the link to initiate the download
  link.click();

  // Remove the link from the document body
  document.body.removeChild(link);
}
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
      </div>
      {settingInfo.title === "themes" && (
        <ThemePresets setSettings={setSettings}/>
      )}
      
      {settingInfo.title === "import & export" && settingsType!="dataSettings" && (
        <ExportImportModule
          settings={settings}
          setSettings={setSettings}
          settingsType={settingsType}
        />
      )}
      
    </div>
  );
}
