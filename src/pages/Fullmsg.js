import React from 'react'
import classes from './Fullmsg.module.css'
const Fullmsg = (props) => {
    console.log(props)

   const handleClose=()=>{
    props.setclicked(false)
   } 
  return (
    <div className={classes.fullMsgPage}>
      <i className='fas fa-close' onClick={handleClose}></i>
      <h3 className={classes.from}>{props.dataArr.from}</h3> 
      <p className={classes.msgBody}>{props.dataArr.body}</p>
    </div>
  )
}

export default Fullmsg
