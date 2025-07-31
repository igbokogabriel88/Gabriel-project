  import React from "react"
  import { useSelector } from "react-redux"
  './alerts.css'

export const AlertPage =()=>{
    const alerts = useSelector(state => state.Alert)
      console.log('ALERTS:',alerts)
     return (
      <> { alerts &&
        <div className={`alert ${alerts.alertType}`}>{ alerts.message}
      
        </div> }
        </>
    )
    }