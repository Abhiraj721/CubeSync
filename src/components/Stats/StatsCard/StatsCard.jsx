import React from 'react'
import "./StatsCard.css"
export default function StatsCard({title,statsData}) {
  return (
    <div className='cardContainer boardContainer'>
      <p className='title'>{title}</p>
      <h4 className='statsData'>{statsData}</h4>

    </div>
  )
}
