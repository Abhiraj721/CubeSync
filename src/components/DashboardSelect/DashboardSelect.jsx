import React, { useState } from 'react'
import "./DashboardSelect.css"
export default function DashboardSelect({dashboardComponent,intialDashboard,dashboardHeight}) {
  const [layout, setLayout] = useState({
    dashboard: intialDashboard,
  });
  const [selectVisible,setSelectVisible]=useState(false)
  return (
    <div className="dashboard" style={dashboardHeight ?{maxHeight:dashboardHeight,minHeight:dashboardHeight,overflow:"auto"}:{}} onMouseEnter={()=>setSelectVisible(true)} onMouseLeave={()=>setSelectVisible(false)}>
    <div className="dashboardSelect">

     { selectVisible && <select
        name=""
        id=""
        value={layout.dashboard}
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
