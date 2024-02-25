import React from 'react'

export default function ExportImportModule({settings}) {
  return (
    <div>
    <p>
      {JSON.stringify(settings.timerSettings)}
    </p>
    </div>
  )
}
