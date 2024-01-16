import React from 'react'

export default function ScrambleVisualizer({currPuzzle,currScramble,visualDimension}) {
  return (
    <div>
      <twisty-player  
       style={{width:"200px",height:"200px"}}
      alg={currScramble}
      puzzle={currPuzzle}
      hint-facelets="none"
      visualization={visualDimension}
      back-view="top-right"
      control-panel="none"
      background="none"
      ></twisty-player>
    </div>
  )
}
