import { createRoutesFromElements } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where, deleteDoc } from "firebase/firestore";
import "./Unsubscribe.css";

function Unsubscribe({product}) {
    const [linkTo, setLinkTo] = useState("");
    const [logo, setLogo] = useState("");
    const [steps, setSteps] = useState("");
    const [supported, setSupported] = useState(false);

    const getProductInfo = async () =>{
        const q = query(collection(db, "supported"), where("productName", "==", product));
        const doc = await getDocs(q);
        if (doc.docs.length) {
            const data = doc.docs[0].data();
            setLinkTo(data.linkTo);
            setLogo(data.logo);
            setSteps(data.steps);
            setSupported(true);
        }
        else{
            setSupported(false)
        }
    }

    if (product !== ""){
        getProductInfo()
        if (supported === false) {
            return;
        }
        return (
            <div>
            <img src={logo} alt={logo}></img>
            <a href={linkTo}>Unsubscribe</a>
            <div>{steps}</div>
            </div>
        )
    }
}
export default Unsubscribe;