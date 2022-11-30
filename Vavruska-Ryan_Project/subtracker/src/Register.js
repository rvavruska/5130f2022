import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
} from "./firebase";
import "./Register.css";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <div className="register">
      <div className="registerdiv">
        <h1>Register to SubTracker</h1>
        <input className="textInput" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name"/>
        <input className="textInput" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
        <input className="textInput" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
        <button className="inputbutton" onClick={register}> Register</button>
        <div>
          Already have an account? <Link to="/">Login</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Register;