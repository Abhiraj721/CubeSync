import React from 'react'
import { themesPresets } from './utility/ThemesData'
import ThemeCart from './ThemeCart/ThemeCart'
import "./ThemePresets.css"
export default function ThemePresets({setSettings}) {
  return (
    <div className='row themePresetsContainer'>
   {
    themesPresets.map((theme)=>{
      return <ThemeCart themeData={theme} setSettings={setSettings}/>
    })
   }
    </div>
  )
}
