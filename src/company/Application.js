import React from 'react';
import './Application.css';
import Navbar2 from './Navbar2';
import firebase from './../firebase/firebase';
import { useState } from 'react';

var ref = firebase.firestore();
var ref2 = firebase.storage();

function Applicationcompany() {

    const [image,setImage] = useState('');
    
    var imageref = '';
    const addimage = ()=>{
        if(image == null)
        return;

        ref2.ref(imageref).put(image).catch(err=>console.log(err));
    }
    const addjob = ()=>{
        var jobnumber = 0;
        var dynamickey;
        ref.collection('jobs').doc('totaljob').get().then(dat=>{
            jobnumber = dat.data().value;
            dynamickey = `job${jobnumber+1}`;
            console.log(jobnumber);
            imageref = `/images/${(jobnumber+1).toString()}`;
            addimage();
        }).then(()=>{
            ref.collection('jobs').doc('totaljob').set({value: jobnumber+1});
        }).then(()=>{
            addjobtocompany((jobnumber+1).toString());
            ref.collection('jobs').doc('jobs').update({[dynamickey]: {description: document.getElementById('description').value,
            jobnumber: jobnumber+1,
            companyname: localStorage.getItem('username').toString(),
            imgref: imageref.toString(),appliedmembers: []
        }});
        }).then(()=>{
            alert('success');
        });
        
    }
    let j = [];
    const addjobtocompany = (jobnumber)=>{
        ref.collection('companies').doc(localStorage.getItem('username').toString()).get().then(doc=>{
            let data = doc.data().jobs;
            data.forEach(dat=>{
                j.push(dat);
            })
        }).then(()=>{
           j.push(jobnumber);
        console.log(j);
        ref.collection('companies').doc(localStorage.getItem('username').toString()).update({
            jobs: j
        })
        })
        
    }


    return (
        <div>
            <Navbar2 />
       <div className="heading">
           <h1 className="detail">Upload the Required Details</h1>
        <section className="logincompany">
            <div className="logincompanyContainer">
                <label>Company Name</label>
                <input type="text"/> 
                <label>Description</label>
                <input id="description" type="text"/>  
                <label>Company Image</label> 
                <input id="Picture" onChange={(e)=>{setImage(e.target.files[0])}} type="file"></input>
                <br/>
                <div className="btnContainer">
                    <>
                    <button onClick={addjob} className='buttoncompanyapplication'>Upload</button>
                    </>
                </div>
            </div>
        </section>
        </div>
        </div>
    )
}

export default Applicationcompany;