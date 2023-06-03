import React, { useState } from 'react'
import classes from './Home.module.css'
import { Link } from 'react-router-dom';
import EmailForm from './EmailForm'
import Inbox from './Inbox'
import Sent from './Sent'
import { mailActions } from '../store/mailSlice';
import { useSelector } from 'react-redux';
import UnreadMsg from '../Components/UnreadMsg';

const Home = () => {
  const inbox = useSelector((state) => state.mail.inbox);
  // console.log("inbox", inbox)
  console.log("inbox", Object.keys(inbox).length)
  let arr=[]
  for(let key in inbox){
    // console.log(key, inbox[key])
    arr.push(inbox[key])
  }
  // console.log("arr", arr)
  const filteredArr=arr.filter((msg)=>msg.status==='unread')
  console.log("filteredArr", filteredArr)
  const [show, setShow] = useState(false);
  const [clickedCompose, setclickedCompose] = useState(false);
  const [clickedInbox, setclickedInbox] = useState(true);
  const [clickedSent, setclickedSent] = useState(false);
  const [clickedUnread, setclickedUnread] = useState(false);

 const handleMenuClick=(e)=>{
  e.preventDefault();
  setShow(!show)
 }

 const handleComposeClicked=()=>{
setclickedInbox(false)
setclickedSent(false)
setclickedUnread(false)
  setclickedCompose(true)
 }

 const handleInboxClicked=()=>{
  setclickedCompose(false)
  setclickedSent(false)
  setclickedUnread(false)
  setclickedInbox(true)
 }

 const handleSentClicked=()=>{
   setclickedInbox(false)
   setclickedCompose(false)
   setclickedUnread(false)
   setclickedSent(true)
 }
 const handleUnreadClicked=()=>{
  setclickedInbox(false)
  setclickedCompose(false)
  setclickedSent(false)
  setclickedUnread(true)

 }
  return (
    <div className={classes.home}>
      <h1 style={{textAlign:"center"}}>Welcome to your mail box</h1>
      
    <div className={classes.flex}>
    <div className={classes.sideBar}>
      <i className={`fas fa-list ${classes.icon}`} onClick={handleMenuClick}></i>
       { !show && <ul>
        <li onClick={handleComposeClicked}>Compose</li>
        <li onClick={handleInboxClicked}>Inbox <span className={classes.count}>{Object.keys(inbox).length}</span></li>
        <li onClick={handleSentClicked}>Sent</li>
        <li onClick={handleUnreadClicked}>Unread <span className={classes.count}>{filteredArr.length}</span></li>
         {/* <Link to='/emailform'></Link>
         <Link to='/inbox'>   </Link> 
          <Link to='/sent'>  </Link> */}
       
        
        </ul>}
      </div>
      <div>
        {clickedCompose  &&<EmailForm/>}
     {  clickedInbox && <Inbox/>}
     {clickedSent && <Sent/>}
     {clickedUnread &&<UnreadMsg filteredArr={filteredArr}/>}

      </div>
    </div>
    </div>
  )
}

export default Home
