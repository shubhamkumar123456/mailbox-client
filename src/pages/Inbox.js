import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../store/mailSlice";
import classes from "./Inbox.module.css";
import Fullmsg from "./Fullmsg";

const Inbox = () => {
  const dispatch = useDispatch();
  // const [emailBox, setemailBox] = useState([]);
  // const email='clboy768gmailcom'
  const [light, setlight] = useState(true);
  const [viewMail, setviewMail] = useState(false);
  const [dataArr, setdataArr] = useState();
  const [clicked, setclicked] = useState(false);

  const inbox = useSelector((state) => state.mail.inbox);
  const fullemail = useSelector((state) => state.auth.email);
  const email = fullemail.replace("@", "").replace(".", "");

  const fetchMails = async () => {
    const response = await fetch(
      `https://mail-box-71fcb-default-rtdb.firebaseio.com/users/${email}/inbox.json`
    );
    const data = await response.json();
    dispatch(mailActions.inbox(data));
    // // console.log(data)
    // let arr=[];
    // for(let key in data) {
    //     // console.log(key, data[key])
    //     arr.push(data[key]);
    // }
    // setemailBox(arr);
    // // console.log(arr)
    // console.log(emailBox)
  };

  useEffect(() => {
    fetchMails();
  }, []);

  // console.log("inbox", inbox)
  let arr = [];
  for (let key in inbox) {
    // console.log(key,inbox[key])
    arr.push({ key, inbox: inbox[key] });
  }
  // console.log(arr);

  const handleClick = async (data) => {
    // console.log(data.inbox.status)
    const id = data.key;

    if (data.inbox.status === "unread") {
      const response = await fetch(
        `https://mail-box-71fcb-default-rtdb.firebaseio.com/users/${email}/inbox/${id}.json`,
        {
          method: "PATCH",
          body: JSON.stringify({
            status: "read",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data1 = await response.json();
      console.log("data1", data1);
      dispatch(mailActions.inbox(data1));
      fetchMails();
      setlight(false);
    } else {
      setlight(true);
    }
  };

  const handleMsgClick = (data) => {
    // console.log(data.inbox)
    setclicked(true);
    setdataArr(data.inbox);

    // setviewMail(!viewMail)
  };

  const handleDelete=async(data)=>{
// console.log(data.key)
const id=data.key
dispatch(mailActions.delete(id));
const response = await fetch(
  `https://mail-box-71fcb-default-rtdb.firebaseio.com/users/${email}/inbox/${id}.json`,
  {
    method: "DELETE",
  }
);
const data1 = await response.json()
console.log(data1);
  }

  return (
    <>
      <div className={classes.inboxContainer}>
        <h2>Inbox </h2>
        <div className={classes.spanClass}>
          {" "}
          <span>From</span>
          <span>Emails</span>
        </div>
        {arr.map((data) => {
          return (
            <div className={classes.inbox} key={data.key}>
              <p
                className={classes.from}
                onClick={() => {
                  handleClick(data);
                }}
              >
                {data.inbox.status === "unread" ? (
                  <i className={`fas fa-circle-dot ${classes.blue}`}></i>
                ) : (
                  <i className={`fas fa-circle-dot ${classes.white}`}></i>
                )}
                {data.inbox.from} :
              </p>
              <p
                onClick={() => {
                  handleMsgClick(data);
                }}
                className={classes.msgBody}
              >
                {data.inbox.body}
              </p>
              {/* <p>{data.inbox.status}</p> */}
              <button className={classes.btnDelete} onClick={()=>{handleDelete(data)}}>
                Delete mail
              </button>
            </div>
          );
        })}
      </div>
      {clicked && (
        <Fullmsg
          setclicked={setclicked}
          viewMail={viewMail}
          setviewMail={setviewMail}
          dataArr={dataArr}
          delete={handleDelete}
        />
      )}
    </>
  );
};

export default Inbox;
