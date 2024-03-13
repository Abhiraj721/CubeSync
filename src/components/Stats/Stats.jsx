import React from "react";
import "./Stats.css";
import { useState } from "react";
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

// Optionally import the CSS
export default function Stats() {
  
  return (
    <div className="col col-lg-10 col-md-11 col-12">
      <div className="statsPanel">
        <h1>Stats</h1>
      </div>
      <div className="test">
        <div className="consistencyCalen">
      <CalendarHeatmap
  startDate={new Date('2024-01-01')}
  endDate={new Date('2024-12-13')}
  values={[
    { date: '2024-01-01', count: 12 },
    { date: '2024-01-30', count: 38 },
    // ...and so on
  ]}
/>
</div>
</div>
    </div>
  );
}
