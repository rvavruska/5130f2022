/*
  File authored by Ryan Vavruska
  ryan_vavruska@student.uml.edu
  2022. Some content modified from https://blog.logrocket.com/user-authentication-firebase-react-apps/ 
*/
import { sendPasswordResetEmail } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "./firebase";
import "./Reset.css";
function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);

  let sentResetEmail = () => {
    sendPasswordReset(email); 
    setStatus("Email sent!"); 
  };

  return (
    <div className="reset">
      <div className="resetdiv">
        <h1>Reset Password</h1>
        <input className="textInput" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
        <button className="inputbutton" onClick={() => sentResetEmail()}>Send password reset email</button>
        <p>{status}</p>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Reset;