import React, { useEffect } from "react";
import "./Stats.css";
import { useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import StatsCard from "./StatsCard/StatsCard";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FormatTime } from "../Data/FormetTime";
import { Tooltip as ReactTooltip } from 'react-tooltip'
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Optionally import the CSS
const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
    },
  },
};

var randomColor = require("randomcolor"); // import the script
function getMaxConsecutiveDays(data) {
  // Extract the dates from the data array
  const dates = data.map((item) => new Date(item.date));

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

export default function Stats({ stats, sessions }) {
  const [maxStreak, setMaxSreak] = useState(
    getMaxConsecutiveDays(stats.activeDays)
  );
  const [totalActiveDays, setTotalActiveDays] = useState(
    stats.activeDays.length
  );

  const maxSolvesIndex = sessions
    .map((session) => session.solves.length)
    .indexOf(Math.max(...sessions.map((session) => session.solves.length))); //finding session index with most solves for labels
  const data = {
    labels: sessions[maxSolvesIndex].solves.map((solve) =>
      new Date().toLocaleDateString()
    ),
    datasets: sessions.map((session) => {
      return {
        label: session.id,
        data: session.solves
          .map((solve) => solve.solveTimeInt / 1000)
          .reverse(),
        borderColor: randomColor(),
        backgroundColor: randomColor(),
      };
    }),
  };
  function getTotalTimeSpent() {
    let timeSpent = 0;
    sessions.map((session) => {
      session.solves.map((solve) => {
        timeSpent += solve.solveTimeInt;
      });
    });
    return FormatTime(timeSpent);
  }
  function totalNumberOfSolves() {
    let totalSolves = 0;
    sessions.map((session) => {
      totalSolves += session.solves.length;
    });
    return totalSolves;
  }
  return (
    <div className="col col-lg-10 col-md-11 col-12">
      <div className="statsPanel">
        {console.log(data)}
        <h1>Stats</h1>
      </div>
      <div className="test">
        <div className="consistencyCalen">
          <div className="heatMapStats">
            <p>Total Active Days:{totalActiveDays}</p>
            <p>Max Streak:{getMaxConsecutiveDays(stats.activeDays)}</p>
          </div>
          <CalendarHeatmap
            startDate={new Date("2024-01-01")}
            endDate={new Date("2024-12-31")}
            values={stats.activeDays}
            showWeekdayLabels={true}
            classForValue={(value) => {
              if (!value) {
                return "color-empty";
              } else if (value.count < 5) return `color-scale-${value.count}`;
              return `color-scale-highlyActive`;
            }}
            tooltipDataAttrs={(value) => {
           if(value.date)   return {
                "data-tooltip-id":"heatmapCalen",
                "data-tooltip-content": `${value.count} solves on ${value.date}`,
              };
            }}
          />
<ReactTooltip  id="heatmapCalen" />
          <div className="lineChart">
            <div className="row">
              <div className="col col-lg-4 col-6">
                <StatsCard title={"Max Streak"} statsData={maxStreak} />
              </div>
              <div className="col col-lg-4 col-6">
                <StatsCard
                  title={"Total Active Days"}
                  statsData={totalActiveDays}
                />
              </div>
              <div className="col col-lg-4 col-6">
                <StatsCard
                  title={"Time Spent Cubing"}
                  statsData={getTotalTimeSpent()}
                />
              </div>
              <div className="col col-lg-4 col-6">
                <StatsCard
                  title={"Total Solves"}
                  statsData={totalNumberOfSolves()}
                />
              </div>
            </div>
            <Line options={options} data={data} />
            {console.log(stats.activeDays)}
          </div>
        </div>
      </div>
    </div>
  );
}
