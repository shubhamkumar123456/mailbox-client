import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/AuthSlice";
import classes from "./Login.module.css";

const Login = () => {
  const navigate =useNavigate()
  const dispatch=useDispatch()
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAxgW1Zv4HtwsuH3UALNiVRKiWw6A-Kkpo",
        {
          method: "POST",
          body: JSON.stringify({
            email: emailRef.current.value,
            password: passwordRef.current.value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        // localStorage.setItem("authToken", data.idToken);
        // localStorage.setItem("userId", data.localId);
        // localStorage.setItem("email", data.email);
        
        dispatch(authActions.login({
          token: data.token,
          email: data.email,
          userId: data.userId
        }))
      
        navigate('/home')
      } else {
        let data = await response.json();
        // console.log(data.error.message)
        alert(data.error.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={classes.login} onSubmit={handleSubmit}>
      <form action="" className={classes.form}>
        <h1 className={classes.heading}>Login</h1>
        <label htmlFor="email">
          Email
          <input type="text" ref={emailRef} />
        </label>
        <label htmlFor="password">
          Password
          <input type="password" ref={passwordRef} />
        </label>

        <button
          className={`${classes.btnSignUp} btn btn-primary`}
          type="submit"
        >
          Login
        </button>
        <Link to="/forgetpassword" style={{ textAlign: "center" }}>
          Forgot Password
        </Link>
      </form>
      <Link to="/signup">
        <button className={classes.accountbtn}>
          Don't have an account?SignUp{" "}
        </button>
      </Link>
    </div>
  );
};

export default Login;
