import React, { useState } from 'react'
import "./DashboardSelect.css"
export default function DashboardSelect({dashboardComponent}) {
  const [layout, setLayout] = useState({
    dashboard: "solves",
  });
  const [selectVisible,setSelectVisible]=useState(false)
  return (
    <div className="dashboard" onMouseEnter={()=>setSelectVisible(true)} onMouseLeave={()=>setSelectVisible(false)}>
    <div className="dashboardSelect">

     { selectVisible && <select
        name=""
        id=""
        onChange={(e) =>
          setLayout((prevLayout) => {
            prevLayout.dashboard = e.target.value;
            return { ...prevLayout };
          })
        }
      >
        <option value="stats">Stats</option>
        <option value="solves">Solves</option>
        <option value="scramble">Scramble</option>

      </select>}
    </div>

      {dashboardComponent(layout.dashboard)}
    </div>
  )
}
