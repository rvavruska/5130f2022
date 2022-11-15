import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
} from "./firebase";
import "./AddSubscription.css";
function AddSubscription() {
  const [productName, setProductName] = useState("");
  const [date, setDate] = useState("");
  const [cost, setCost] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const addProduct = async () => {
    if (!user) alert("Please enter name");
    await addDoc(collection(db, "subscriptions"), {
        uid: user.uid,
        productName,
        date,
        cost
        });
  };
  useEffect(() => {
    if (loading) return;
    if (user) navigate.replace("/dashboard");
  }, [user, loading]);
  return (
    <div className="register">
      <div>
        <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Name"/>
        <input type="text" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date"/>
        <input type="text" className="" value={cost} onChange={(e) => setCost(e.target.value)} placeholder="Price"/>
        <button onClick={addProduct}>Add Product</button>
        <div>
          Back to <Link to="/dashboard">dashboard.</Link>
        </div>
      </div>
    </div>
  );
}
export default AddSubscription;