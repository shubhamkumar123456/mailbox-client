import React, { useState } from 'react'
import classes from './Home.module.css'
import { Link } from 'react-router-dom';
import EmailForm from './EmailForm'
import Inbox from './Inbox'
import Sent from './Sent'
const Home = () => {
  const [show, setShow] = useState(false);
  const [clickedCompose, setclickedCompose] = useState(false);
  const [clickedInbox, setclickedInbox] = useState(false);
  const [clickedSent, setclickedSent] = useState(false);

 const handleMenuClick=(e)=>{
  e.preventDefault();
  setShow(!show)
 }

 const handleComposeClicked=()=>{
setclickedInbox(false)
setclickedSent(false)
  setclickedCompose(!clickedCompose)
 }

 const handleInboxClicked=()=>{
  setclickedCompose(false)
  setclickedSent(false)
  setclickedInbox(!clickedInbox)
 }

 const handleSentClicked=()=>{
   setclickedInbox(false)
   setclickedCompose(false)
   setclickedSent(!clickedSent)
 }
  return (
    <div className={classes.home}>
      <h1 style={{textAlign:"center"}}>Welcome to your mail box</h1>
      
    <div className={classes.flex}>
    <div className={classes.sideBar}>
      <i className={`fas fa-list ${classes.icon}`} onClick={handleMenuClick}></i>
       { !show && <ul>
        <li onClick={handleComposeClicked}>Compose</li>
        <li onClick={handleInboxClicked}>Inbox</li>
        <li onClick={handleSentClicked}>Sent</li>
         {/* <Link to='/emailform'></Link>
         <Link to='/inbox'>   </Link> 
          <Link to='/sent'>  </Link> */}
       
        
        </ul>}
      </div>
      <div>
        {clickedCompose  &&<EmailForm/>}
     {  clickedInbox && <Inbox/>}
     {clickedSent && <Sent/>}

      </div>
    </div>
    </div>
  )
}

export default Home
