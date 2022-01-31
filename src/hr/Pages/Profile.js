import React, { Component } from 'react';
import './Profile.css';
import * as FcIcons from "react-icons/fc";
import Navbar from './../components/Navbar';

import firebase from './../../firebase/firebase';


var ref = firebase.firestore().collection("credentials");
var storage = firebase.storage();
var resume;

class Profile extends Component {

    constructor(props){
        super(props);
        this.data = props.location.state;
        this.state={
            profileImg:'https://wgsi.utoronto.ca/wp-content/uploads/2020/12/blank-profile-picture-png.png',
            name: "loading..",
            age: "loading..",
            gender: "loading..",
            dob: "loading..",
            adress: "loading..",
            phonenumber: "loading..",
            email: "loading..",
            fresher: "loading..",
            designation: "loading..",
        }
        this.data = {
            profileImg:'',
        name: "loading..",
        age: "loading..",
        gender: "loading..",
        dob: "loading..",
        adress: "loading..",
        phonenumber: "loading..",
        email: "loading..",
        fresher: "loading..",
        designation: "loading..",
        }
        ref.doc(localStorage.getItem('username').toString()).get().then((doc)=>{
            let profileref =  doc.data()['profileimageref'];
            this.data.profileImg = storage.ref(profileref.toString()).getDownloadURL();
            
            this.data.name = doc.data()['name'];
            this.data.age = doc.data()['age'];
            this.data.adress = doc.data()['address'];
            this.data.gender = doc.data()['gender'];
            this.data.dob = doc.data()['dob'];
            this.data.phonenumber = doc.data()['phoneno'];
            this.data.email = doc.data()['email'];
            this.data.fresher = doc.data()['fresher'];
            this.data.designation = doc.data()['currentdesignation'];
            storage.ref(doc.data()['profileimageref']).getDownloadURL().then(url =>{
                document.querySelector('img').src = url.toString();
            });
            this.setState(this.data);
            console.log(this.data);
            
        });
    }

    signout = ()=>{
        localStorage.clear();
        window.close();
    }

    //uploading the resume
    uploadresume = ()=>{
        console.log(resume);
        
        storage.ref(`/resumes/${localStorage.getItem('username')}`)
        .put(resume).then(()=>{
            this.updateresumereference();
        }).catch((err)=>{console.log(err)});
    }

    //update resume reference
    updateresumereference = ()=>{
        console.log("[updateresumereference]");
        ref.doc(localStorage.getItem('username')).update({
            resumeref: `/resumes/${localStorage.getItem('username')}`
        });
        alert("resume successfully updated");
    }

    
    

    render() {
        const {profileImg} =  this.state.profileImg;
        return (
            <div className="bodybackground">
                <Navbar />
            <section className="grids">
            <div className="page">
          <div className="container">
              <br/><br/><br/><br/>
              <img src={profileImg} alt=" " id="img" className="img"></img>
              
          </div>
          <br/>
          <br/>
          <br/>
          <br/>
          <section >
          <div className="list">
          <div className="form">
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
 
 
  <label className="lab">
    Full Name: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{this.state.name}</span>
    <br/>
    
    
    <br/>
    <label className="lab"></label>
    Age: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{this.state.age}</span>
    <br/>
    
    <br/>
    
    <label className="lab"></label>
    Gender: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{this.state.gender}</span>
    <br/>
  
    <br/>
    
    <label className="lab"></label>
    D.O.B: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{this.state.dob}</span>
    <br/>
 
    <br/>
    <label className="lab"></label>
    Address: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{this.state.adress}</span>
    <br/>
  
    <br/>
    <label className="lab"></label>
    Phone No: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{this.state.phonenumber}</span>
    <br/>
  
    <br/>
    <label className="lab"></label>
    E-mail: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{this.state.email}</span>
    <br/>
   
    <br/>
    <label className="lab"></label>
    Fresher (Y/N): &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{this.state.fresher}</span>
    <br/>
  
    <br/>
    <label className="lab"></label>
    Current Designation: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{this.state.designation}</span>
    <br/>

    <br/>
  </label>
  <br/>
  <br/>
  <div className="file">
  <h2>Upload your Resume Here <FcIcons.FcNews/></h2>
  
  <div className="doc">
  {/* <form > */}
      <input onChange={(e)=>{
          resume = e.target.files[0];
      }} type="file" name="picture"/>
      <button onClick={this.uploadresume} className="upload"><FcIcons.FcUpload/></button>
  {/* </form> */}
  </div>
  </div>
  <br/>
  <br/>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button  onClick={this.signout} className="but">
  Signout
</button>
</div>
</div>
</section>
            </div>
            </section>
            </div>
        )
    }
}

export default Profile

