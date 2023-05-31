import React, { useRef, useState } from 'react'
import classes from './Signup.module.css'
// import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate=useNavigate()
    const emailRef=useRef()
    const passwordRef=useRef()
    const confirmPasswordRef=useRef()

  
    const [passwordvalue, setEPasswordValue] = useState("");
   

   const handlePasswordChange=(e)=>{
    setEPasswordValue(e.target.value);
   }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        console.log(emailRef.current.value)
      
  try {
    
   const response= await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAxgW1Zv4HtwsuH3UALNiVRKiWw6A-Kkpo',{
        method: 'POST',
        body: JSON.stringify({
            email:emailRef.current.value,
            password:passwordRef.current.value
        }),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    if(response.ok){
        console.log("account created successfully")
        navigate('/')
      
      }else{
        const data=await response.json()
        // console.log(data.error.message)
        alert(data.error.message)
      }
  } catch (error) {
    console.log(error.message)
  }
 
       
    }
  return (
    <div className={classes.signup} onSubmit={handleSubmit}>
    <form action="" className={classes.form}>
    <h1 className={classes.heading}>SignUp</h1>
  <label htmlFor="email">Email</label>
  <input type="text" ref={emailRef} />
  <label htmlFor="password">Password</label>
  <input type="password" ref={passwordRef} />
  <label htmlFor="cpassword">Confirm Password</label>
  <input type="password" ref={confirmPasswordRef} value={passwordvalue} onChange={handlePasswordChange}/>
<button className={`${classes.btnSignUp} btn btn-primary`} type='submit' disabled={passwordvalue.length<5}>Sign Up</button>
    </form>
<Link to='/'><button className={classes.accountbtn}>Have an account?Login </button></Link>
</div>

  )
}

export default Signup
