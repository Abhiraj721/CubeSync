import React, { useEffect, useState } from 'react'

export default function Solves() {
const[currSessionsSolves,setCurrSessionsSolves]=useState([])
    useEffect(()=>{
        const sessions=JSON.parse(localStorage.getItem("sessions"))
   if(sessions!=null) {  const currSession=localStorage.getItem("currSession")
        sessions.map((session,index)=>{
           if(session.id==currSession){
            setCurrSessionsSolves(session.solves)
           }
        })}
    },[])
  return (
    <div>
    {
currSessionsSolves && currSessionsSolves.map((solve,index)=>{
            return <p style={{color:"black"}}>{solve.solveTime}</p>
        })
    }
    </div>
  )
}
