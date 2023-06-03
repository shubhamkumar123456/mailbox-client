import React from 'react'
import classes from './Unread.module.css'
const UnreadMsg = (props) => {
    // console.log('props', props)
  return (
    <div className={classes.unreadContainer}>
        <h2 >Unread Emails</h2>
      {props.filteredArr.map((data)=>{
        return <div key={Math.random()} className={classes.sent}>
            <p className={classes.from}>{data.from}</p>
            <p className={classes.msgBody}>{data.body}</p>
        </div>
      })}
    </div>
  )
}

export default UnreadMsg
