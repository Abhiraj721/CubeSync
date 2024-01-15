import React from 'react'
import "./ScrambleInfo.css"
export default function ScrambleInfo({scramble}) {
  return (
    <div>
      <p className='scrambleText'>{scramble}</p>
    </div>
  )
}
