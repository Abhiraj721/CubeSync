import React, { useState,useEffect } from "react";
import "./ExportImportModule.css";
import copy from "copy-text-to-clipboard";
import { json } from "react-router-dom";
export default function ExportImportModule({ settings,setSettings, settingsType }) {
  const [importCode, SetimportCode] = useState("");
  const [importOrExport,setImportOrExport]=useState("export")
  useEffect(() => {
    setImportOrExport(settings[settingsType].importAndexport)
  }, [settings]);
  const exportModule = (
    <div className="exportCodeContainer">
      <textarea
        name=""
        id=""
        cols="30"
        rows="7"
        value={JSON.stringify(settings[settingsType])}
      ></textarea>
      <button onClick={() => copy(JSON.stringify(settings[settingsType]))}>copy</button>
    </div>
  );
  const importModule = (
    <div className="exportCodeContainer">
        <textarea
        name=""
        id=""
        cols="30"
        rows="7"
        value={importCode}
        placeholder="Enter your code here"
        onChange={(e)=>SetimportCode(e.target.value)}
      ></textarea>
      <button onClick={()=>  setSettings(prevSettings => ({
    ...prevSettings,
    [settingsType]: JSON.parse(importCode)
  }))}>submit</button>
    </div>
  );
  return (
    <>
    {console.log(settings.timerSettings.importAndexport)}
      {importOrExport=="import"
        ?importModule
        : exportModule}
    </>
  );
}
