import { createRoutesFromElements } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where, addDoc } from "firebase/firestore";
import "./Unsubscribe.css";

function Unsubscribe({product}) {
    const [user, loading, error] = useAuthState(auth);
    const [linkTo, setLinkTo] = useState("");
    const [logo, setLogo] = useState("");
    const [steps, setSteps] = useState("");
    const [supported, setSupported] = useState(false);
    const [post, setPost] = useState("");
    const [messages, setMessages] = useState("");
    const [msgInit, setMsgInit] = useState(false);

    const fetchUserName = async () => {
        try {
          const q = query(collection(db, "users"), where("uid", "==", user?.uid));
          const doc = await getDocs(q);
          const data = doc.docs[0].data();
          return data.name;
        } catch (err) {
          console.error(err);
        }
      };

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
        else {
            setSupported(false)
        }
    }

    const getUnsupportedInfo = async () => {
        const q = query(collection(db, "forum"), where("product", "==", product));
        const doc = await getDocs(q);
        if (doc.docs.length && !msgInit) {
            let posts = "";
            doc.docs.forEach(await async function(d) {
                let data = d.data();
                let name = await fetchUserName(data.uid);
                let msg = "";
                msg = "<div className ='post'>" +
                name +
                new Date(data.date).toDateString() +
                "<p>" + data.post + "</p>" +
                "</div>";
                posts = posts + msg;
                setMessages(posts);
            });
            setMsgInit(true);
        }
    }

    const submitPost = async () => {
        await addDoc(collection(db, "forum"), {
            uid: user.uid,
            product,
            date: new Date().toISOString(),
            post
            });
    }

    if (product !== ""){
        getProductInfo()
        if (supported === false) {
            var parse = require('html-react-parser');
            getUnsupportedInfo();
            return (
                <div>
                    {parse(messages)};
                    <textarea id="post" value={post} onChange={(e) => setPost(e.target.value)} rows="4" cols="50">
                    </textarea>
                    <button onClick={submitPost}>Submit</button>
                </div>
            )
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