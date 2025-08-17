  import React from "react"
  // import { useSelector } from "react-redux"
  './alerts.css'

export const AlertPage =({alerts})=>{
    // const alerts = useSelector(state => state.Alert)
      // console.log('ALERTS:',alerts)
     return (
      
        <div className={`alert ${alerts.alertType}`}>{ alerts.message}
      
        </div> 
    )
    }