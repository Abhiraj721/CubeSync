import React, { useState } from 'react'

export default function DashboardSelect({dashboardComponent}) {
  const [layout, setLayout] = useState({
    dashboard: "solves",
  });
  return (
    <div className="dashboard_1">
    <div className="dashboardSelect">

      <select
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

      </select>
    </div>

      {dashboardComponent(layout.dashboard)}
    </div>
  )
}
