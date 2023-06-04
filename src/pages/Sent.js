import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { mailActions } from '../store/mailSlice';
import classes from './Sent.module.css'

const Sent = () => {
    const dispatch=useDispatch();
    const [emailBox, setemailBox] = useState([]);
    // const email='clboy768gmailcom'

    const inbox=useSelector(state=>state.mail.inbox);
    const fullemail=useSelector(state=>state.auth.email);
    const email=fullemail.replace("@","").replace(".","");

    const fetchMails=async()=>{
        const response=await fetch(`https://mail-box-71fcb-default-rtdb.firebaseio.com/users/${email}/sent.json`)
        const data=await response.json();
        dispatch(mailActions.inbox(data))
        // // console.log(data)
        // let arr=[];
        // for(let key in data) {
        //     // console.log(key, data[key])
        //     arr.push(data[key]);
        // }
        // setemailBox(arr);
        // // console.log(arr)
        // console.log(emailBox)
    }
    

    useEffect(()=>{
        fetchMails()
    },[])

    // console.log("inbox", inbox)
    let arr=[];
    for(let key in inbox){
        // console.log(key,inbox[key])
        arr.push({key,inbox:inbox[key]})
        
    }
    console.log(arr)

  return (
    <div className={classes.sentContainer}>
      <h2>Sent Emails</h2>
      <div className={classes.spanBox}>
        <span>To</span> <span>Email</span>
      </div>
  {arr.map((data)=>{
    return(
       <div className={classes.sent} key={data.key}>
        <p className={classes.to}>{data.inbox.from} :</p>
        <p className={classes.msgBody}>{data.inbox.body}</p>
       </div>
      // console.log("data", data)
    )
  })}
    </div>
  )
}

export default Sent
