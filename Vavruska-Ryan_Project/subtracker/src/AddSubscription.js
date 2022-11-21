import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { auth, db } from "./firebase";
import { query, collection, getDocs, where, addDoc } from "firebase/firestore";
import "./AddSubscription.css";
import "react-datepicker/dist/react-datepicker.css";
function AddSubscription() {
  const [useOther, setUseOther] = useState(false);
  const [productName, setProductName] = useState("netflix");
  const [other, setOther] = useState("");
  const [date, setStartDate] = useState(new Date());
  const [cost, setCost] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const addProduct = async () => {
    if (!productName || !cost) alert("Missing data");
    if (useOther) {
      await addDoc(collection(db, "subscriptions"), {
        uid: user.uid,
        productName: other,
        date: date.toISOString(),
        cost
        });
    } else {
      await addDoc(collection(db, "subscriptions"), {
        uid: user.uid,
        productName,
        date: date.toISOString(),
        cost
        });
    }
    navigate("/dashboard")
  };

  const handleChange = ((event) => {
    setUseOther(event.target.value == "other");
    if (useOther == false) {
      setProductName(event.target.value)
    }
    else {
      setProductName("");
    }
  });

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");
  }, [user, loading]);
  return (
    <div className="register">
      <div>
      <label>Supported Products:</label>
      <select value={productName} onChange={handleChange}>
            <option value="netflix">Netflix</option>
            <option value="spotify">Spotify</option>
            <option value="other">Other</option>
          </select>
        <label>Other:</label>
        <input disabled={!useOther} type="text" value={other} onChange={(e) => setOther(e.target.value)} placeholder="Product Name"/>
        <label>Renewal Date:</label>
        <DatePicker selected={date} onChange={(date) => setStartDate(date)} />
        <label>Monthly Cost ($):</label>
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