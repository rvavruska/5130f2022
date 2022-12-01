import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where, addDoc, updateDoc } from "firebase/firestore";
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
                msg = "<div className ='post'><div className=poster>" +
                "<p>" + name + "</p>" +
                "<p>" + new Date(data.date).toDateString() + "</p>" +
                "</div>" +
                "<p>" + data.post + "</p>" +
                "</div>";
                posts = posts + msg;
                setMessages(posts);
            });
            setMsgInit(true);
        }
    }

    const submitPost = async () => {
        const q = query(collection(db, "forum"), 
        where("product", "==", product),
        where("uid", "==", user.uid));
        const doc = await getDocs(q);
        if (doc.docs.length){
            await updateDoc(doc.docs[0].ref, {post, 
                date: new Date().toISOString()});
        }
        else{
            await addDoc(collection(db, "forum"), {
                uid: user.uid,
                product,
                date: new Date().toISOString(),
                post
                });
        }
        setMsgInit(false);
        getUnsupportedInfo();
    }

    if (product !== ""){
        getProductInfo()
        if (supported === false) {
            var parse = require('html-react-parser');
            getUnsupportedInfo();
            return (
                <div className="unsupportedDiv">
                    {parse(messages)}
                    <textarea id="post" value={post} 
                    onChange={(e) => setPost(e.target.value)} rows="4" cols="50"
                    placeholder="Enter (or update) your own instructions here.">
                    </textarea>
                    <button onClick={submitPost}>Submit</button>
                </div>
            )
        }
        return (
            <div className="supportedDiv">
            <img src={logo} alt={logo}></img>
            <a href={linkTo}>Link to unsubscribe</a>
            <h3>Instructions:</h3>
            <div>{steps}</div>
            </div>
        )
    }
}
export default Unsubscribe;