import React, { useEffect } from "react";
import "./Stats.css";
import { useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
function getMaxConsecutiveDays(data) {
    // Extract the dates from the data array
    const dates = data.map(item => new Date(item.date));
    
    // Sort the dates in ascending order
    dates.sort((a, b) => a - b);
  
    let maxConsecutiveDays = 1;
    let currentConsecutiveDays = 1;
  
    // Iterate over the sorted dates
    for (let i = 1; i < dates.length; i++) {
      // Calculate the difference in days between consecutive dates
      const diffInDays = (dates[i] - dates[i - 1]) / (1000 * 60 * 60 * 24);
      
      // If the difference is 1 day, increase consecutive days count
      if (diffInDays === 1) {
        currentConsecutiveDays++;
      } else {
        // If not consecutive, update max consecutive days and reset current count
        maxConsecutiveDays = Math.max(maxConsecutiveDays, currentConsecutiveDays);
        currentConsecutiveDays = 1;
      }
    }
  
    // Update max consecutive days in case it extends to the end of the month
    maxConsecutiveDays = Math.max(maxConsecutiveDays, currentConsecutiveDays);
  
    return maxConsecutiveDays;
  }
// Optionally import the CSS
export default function Stats({stats}) {
  return (
    <div className="col col-lg-10 col-md-11 col-12">
      <div className="statsPanel">
        <h1>Stats</h1>
      </div>
      <div className="test">
        <div className="consistencyCalen">
          <CalendarHeatmap
            startDate={new Date("2024-01-01")}
            endDate={new Date("2024-12-31")}
            values={
          stats.activeDays
              // ...and so on
            }
          />
          {console.log(localStorage.getItem("stats"))}
        </div>
      </div>
    </div>
  );
}
