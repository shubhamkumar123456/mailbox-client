import React, { useRef, useState } from 'react'
import classes from './EmailForm.module.css'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import EmailFormNavbar from '../Components/EmailFormNavbar';


const EmailForm = () => {

    const FromEmail=useSelector((state)=>state.auth.email)

    console.log('from email', FromEmail)
    const emailRef = useRef();
    const fromRef = useRef();
    const textareaRef = useRef();
    const userId = localStorage.getItem('userId');
    const idToken = localStorage.getItem('authToken');
    const [value, setvalue] = useState("");

    const handleSubmit = async () => {
        const email = fromRef.current.value
        setvalue(email)
        const to = emailRef.current.value;
        const body = textareaRef.current.value;
        const fromMail = email.replace("@", "").replace(".", "");
        console.log("fromMail:", fromMail);
        const toMail = to.replace("@", "").replace(".", "");
        console.log("toMail:", toMail);
        let obj = {
            to: to,
            body: body,
           
        }
        try {

            console.log(obj)
            const response = await fetch(`https://mail-box-71fcb-default-rtdb.firebaseio.com/users/${fromMail}/sent.json`, {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }

        const obj1 = {
            from: email,
            body: body,
            status:"unread"
        }
        try {
            const response = await fetch(`https://mail-box-71fcb-default-rtdb.firebaseio.com/users/${toMail}/inbox.json`, {
                method: 'POST',
                body: JSON.stringify(obj1),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className={classes.emailForm}>
            {/* <EmailFormNavbar /> */}
            <div className={classes.middle}>
            <label htmlFor="">From: </label>
                <input className={classes.inputFrom} type="text" placeholder='from' ref={fromRef} value={FromEmail} readOnly/>
            </div>
            <div className={classes.emailFormTop}>
                <label htmlFor="" style={{marginRight:"1rem"}}>To: </label>
                <input type="text" placeholder='email' ref={emailRef} />
            </div>
            <div>
                <textarea className={classes.textarea} name="" id="" cols="30" rows="10" ref={textareaRef}></textarea>
                <Button onClick={handleSubmit}>Send</Button>
            </div>
        </div>
    )
}

export default EmailForm
