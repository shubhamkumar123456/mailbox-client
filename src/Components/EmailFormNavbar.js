import React from 'react'
import { Link } from 'react-router-dom'
import classes from './EmailFormNavbar.module.css'

const EmailFormNavbar = () => {
  return (
    <div className={classes.EmailFormNavbar}>
      <ul>
        <li>
            <Link to='/inbox'>Inbox <span className={classes.EmailFormNavbarSpan}>0</span></Link>
        </li>
        <li>
            <Link to='/sent'>Sent </Link>
        </li>
      </ul>
    </div>
  )
}

export default EmailFormNavbar
