import React from 'react';
import './Application.css';
import firebase from './../../firebase/firebase';
import { useState } from 'react';

var ref = firebase.firestore();
var storage = firebase.storage();

var jobnumber = 0;



function Application() {

    const[image,setImage] = useState('');
    var imageref = ``;

    const uploadimage = ()=>{
         imageref = `/images/${jobnumber+1}`;
        if(image == null){
            return;
        }
        storage.ref(imageref).put(image).catch((error)=>{
            console.log(error);
        });
    }
    
    const upload = ()=>{
        var dynamickey;
        ref.collection('jobs').doc('totaljob').get().then(dat=>{
            jobnumber = dat.data().value;
            dynamickey = `job${jobnumber+1}`;
            uploadimage();
        }).then(()=>{
            ref.collection('jobs').doc('totaljob').set({value: jobnumber+1});
        }).then(()=>{
            ref.collection('jobs').doc('jobs').update({[dynamickey]: {description: document.getElementById("description").value,
        companyname: document.getElementById("companyname").value,
    jobnumber: jobnumber+1,
     imgref: imageref,appliedmembers: []}});
        });
    }

    return (
       <div className="heading">
           <h1 className="detail">Upload the Required Details</h1>
        <section className="loginjobs">
            <div className="loginjobsContainer">
                <label>Company Name</label>
                <input id="companyname" type="text"/> 
                <label>Description</label>
                <input id="description" type="text"/>  
                <label>Company Image</label> 
                <input id="image" onChange={(e)=>{setImage(e.target.files[0])}} type="file"></input>
                <br/>
                <div className="btnContainer">
                    <>
                    <button className=".buttonmanu" onClick={upload}>Upload</button>
                    </>
                </div>
            </div>
        </section>
        </div>
    )
}

export default Application;