import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { mailActions } from '../store/mailSlice';
import classes from './Inbox.module.css'

const Inbox = () => {
    const dispatch=useDispatch();
    const [emailBox, setemailBox] = useState([]);
    // const email='clboy768gmailcom'

    const inbox=useSelector(state=>state.mail.inbox);
    const fullemail=useSelector(state=>state.auth.email);
    const email=fullemail.replace("@","").replace(".","");

    const fetchMails=async()=>{
        const response=await fetch(`https://mail-box-71fcb-default-rtdb.firebaseio.com/users/${email}/inbox.json`)
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
    <div>
      <h1>Inbox Page</h1>
  {arr.map((data)=>{
    return(
       <div className={classes.inbox} key={data.key}>
        <p>{data.inbox.to} :</p>
        <p>{data.inbox.body}</p>
       </div>
    )
  })}
    </div>
  )
}

export default Inbox