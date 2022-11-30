import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { auth, db } from "./firebase";
import { query, collection, getDocs, where, addDoc } from "firebase/firestore";
import "./AddSubscription.css";
import "react-datepicker/dist/react-datepicker.css";
function AddSubscription() {
  const [initList, setListInit] = useState(false);
  const [useOther, setUseOther] = useState(false);
  const [productName, setProductName] = useState("netflix");
  const [other, setOther] = useState("");
  const [date, setStartDate] = useState(new Date());
  const [cost, setCost] = useState("");
  const [supportedList, setSupported] = useState("");
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

  const getSupported = async () => {
      if (initList == false){
      const q = query(collection(db, "supported"));
      const doc = await getDocs(q);
      setSupported(doc.docs.map((item, i) => {
        return (
          <option key={i} value={productName}>{item.data().productName}</option>
        )
      }))
      
      setListInit(true);
    }
  }

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

  getSupported();
  return (
    <div className="addsub">
      <div className="addsubdiv">
        <h1>Add Subscription</h1>
        <label>Supported Products:</label>
        <select value={productName} onChange={handleChange}>
        {supportedList}
        <option value="other">Other</option>
        </select>
        <label>Other:</label><br />
        <input className="textInput" disabled={!useOther} type="text" value={other} onChange={(e) => setOther(e.target.value)} placeholder="Product Name"/>
        <label>Renewal Date:</label>
        <DatePicker className="textInput" selected={date} onChange={(date) => setStartDate(date)} />
        <label>Monthly Cost ($):</label>
        <input className="textInput" type="text" value={cost} onChange={(e) => setCost(e.target.value)} placeholder="Price"/>
        <button className="inputbutton"onClick={addProduct}>Add Product</button>
        <div>
          Back to <Link to="/dashboard">dashboard.</Link>
        </div>
      </div>
    </div>
  );
}
export default AddSubscription;