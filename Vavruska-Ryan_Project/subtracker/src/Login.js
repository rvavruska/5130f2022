/*
  File authored by Ryan Vavruska
  ryan_vavruska@student.uml.edu
  2022. Some content modified from https://blog.logrocket.com/user-authentication-firebase-react-apps/ 
*/
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <div className="login">
      <div className="logindiv">
        <h1 className="title">SubTracker</h1>
        <input className="textInput" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
        <input className="textInput" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"
        />
        <button className="inputbutton" onClick={() => logInWithEmailAndPassword(email, password)}>Login</button>
        <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Login;