import React, { useRef } from 'react'
import classes from './EmailForm.module.css'
import { Button } from 'react-bootstrap'
import EmailFormNavbar from '../Components/EmailFormNavbar';


const EmailForm = () => {


    const emailRef = useRef();
    const fromRef = useRef();
    const textareaRef = useRef();
    const userId = localStorage.getItem('userId');
    const idToken = localStorage.getItem('authToken');

    const handleSubmit = async () => {
        const email = fromRef.current.value
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
            <div className={classes.emailFormTop}>
                <label htmlFor="">To</label>
                <input type="text" placeholder='email' ref={emailRef} />
            </div>
            <div className={classes.middle}>
                <input type="text" placeholder='from' ref={fromRef} />
            </div>
            <div>
                <textarea className={classes.textarea} name="" id="" cols="30" rows="10" ref={textareaRef}></textarea>
                <Button onClick={handleSubmit}>Send</Button>
            </div>
        </div>
    )
}

export default EmailForm
