import React from 'react';
import * as FcIcons from "react-icons/fc";
import Navbar2 from './Navbar2';

import firebase from './../firebase/firebase';

var ref = firebase.firestore().collection("companies");
var storage = firebase.storage();
class Profilecompany extends React.Component {

    constructor(props){
        super(props);
        this.data = props.location.state;
        this.state={
            profileImg:'https://wgsi.utoronto.ca/wp-content/uploads/2020/12/blank-profile-picture-png.png',
            companyname: "loading..",
            address: "loading..",
            email: "loading..",
            cotes: "loading.."
        }
        this.data = {
            profileImg:'',
            companyname: "loading..",
            address: "loading..",
            email: "loading..",
            cotes: "loading.."
        }
        ref.doc(localStorage.getItem('username').toString()).get().then((doc)=>{
            console.log(doc.data());
            let profileref =  doc.data()['imgref'];
            this.data.profileImg = storage.ref(profileref.toString()).getDownloadURL();
            
            this.data.companyname = doc.data()['companyname'];
            this.data.address = doc.data()['address'];
            this.data.email = doc.data()['email'];
            this.data.cotes = doc.data()['cotes'];
            
            
            storage.ref(doc.data()['imgref']).getDownloadURL().then(url =>{
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

    render() {
        const {profileImg} =  this.state.profileImg;
        return (
            <div className="bodybackground">
                <Navbar2 />
            <section className="grids">
            <div className="page">
          <div className="container">
              <br/><br/><br/><br/>
              <img src={profileImg} alt=" " id="img" className="img"></img>
              
          </div>
          <section>
          <div className="list">
          <form className="form">
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
    Company Name: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{this.state.companyname}</span>
    <br/>
    
    
    <br/>
    <label className="lab"></label>
    Address: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{this.state.address}</span>
    <br/>
    
    <br/>
    
    <label className="lab"></label>
    Email: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{this.state.email}</span>
    <br/>
  
    <br/>
    
    <label className="lab"></label>
    Name: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{this.state.cotes}</span>
    <br/>
 
    {/* <br/>
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

    <br/>*/}
  </label>
  {/* <br/>
  <br/>
  <div className="file">
  <h2>Upload your Resume Here <FcIcons.FcNews/></h2>
  
  <div className="doc">
  <form >
      <input type="file" name="picture"/>
      <button className="upload"><FcIcons.FcUpload/></button>
  </form>
  </div>
  </div>
  <br/>
  <br/>  */}
  <button style={{marginLeft:'200px'}} onClick={this.signout} className="but">
  Signout
</button>
</form>
</div>
</section>
            </div>
            </section>
            </div>
        )
    }
}

export default Profilecompany;