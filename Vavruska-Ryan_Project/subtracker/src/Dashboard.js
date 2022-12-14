/*
  File authored by Ryan Vavruska
  ryan_vavruska@student.uml.edu
  2022
*/
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where, deleteDoc } from "firebase/firestore";
import Table from "./Table";
import Unsubscribe from "./Unsubscribe";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [data, setData] = useState({})
  const [product, setProduct] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
    }
  };

  const addSubscription = () => {
    navigate("/dashboard/add")
  };

  const unsubscribeMethod = (event) => {
    let productName = event.currentTarget
    .parentElement.parentElement.cells[0].textContent;
    if (product != "" && product == productName) {
      setProduct("");
    }
    else{
      setProduct(productName.toLowerCase());
    }
  };

  const removeSubscription = async (event) => {
    let productName = event.currentTarget
      .parentElement.parentElement.cells[0].textContent;
    console.log(productName)
      const q = query(collection(db, "subscriptions"), where("uid", "==", user?.uid));
      const docs = await getDocs(q);
      console.log(docs)
      docs.forEach((doc) => {
        if (doc.data().productName == productName) {
          deleteDoc(doc.ref);
          
        }
      });
      fetchSubs();
      if (product == productName) {
        setProduct("");
      }
  };

  const fetchSubs = async () => {
    let data = {}
    try {
      const q = query(collection(db, "subscriptions"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      setData(doc.docs);
    } catch (err) {
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
    fetchSubs();
  }, [user, loading]);

  return (
    <div className="dashboard">
       <div className="userInfo">
         <div>Logged in as {name}</div>
         <div>{user?.email}</div>
         <button onClick={logout}>Logout</button>
        </div>
         <div className="tablediv">
         <Table data={data} unsubscribe={unsubscribeMethod} remove={removeSubscription} />
         <button className="addSubButton" onClick={addSubscription}>+</button>
         </div>
         <div className="unsubscribe">
          <Unsubscribe product={product}/>
         </div>
     </div>
  );
}
export default Dashboard;