import React from 'react';
import './DataForm.css';
import './toggle.css';
import { useState } from 'react';
import firebase from './../../../firebase/firebase';
import Comapanydataform from './companydataform';
import { useHistory } from 'react-router';
import Data from './Data';

var ref = firebase.firestore().collection("credentials");
var storage = firebase.storage();
var change = false;

function DataForm(props){

    const history = useHistory();
    var stat = props.location.state;
    console.log('[dataform.js]',stat.username,stat.type);
    const imageref = `/images/${stat.username}`;

    const [image , setImage] = useState('');
      const upload = ()=>{
        if(image == null)
          return;
          
          storage.ref(imageref).put(image)
        .on("state_changed" , alert("success") , alert);
      }

      const check = (data)=>{
          var re = true;
          for(const [key,value] of Object.entries(data)){
              if(value.toString() === "" && key != "resumeref"){
                  alert(`The ${key} is not filled`);
                  re = false;
                  break;
              }
          }
          return re;
      }

    const logData = ()=>{
        upload();
        
        const data ={
            username: stat.username,
            name: document.getElementById("NameInput").value,
            age: document.getElementById("AgeInput").value,
            gender: document.getElementById("GendermeInput").value,
            dob: document.getElementById("DateofBirthInput").value,
            address: document.getElementById("AddressInput").value,
            phoneno: document.getElementById("PhInput").value,
            email: document.getElementById("EmailInput").value,
            fresher: change ? "yes" : "No",
            profileimageref: imageref,
            shouldreload: "true",
            resumeref: "",
            currentdesignation: document.getElementById("DesignationInput").value
        };

        var ch = check(data);
        console.log(ch);

        if(ch){
            ref.doc(data.username.toString()).update(data).catch((error)=>{console.log(error)});
            history.goBack();
        }
        
        
        
        console.log(stat)
        console.log(change);
        
    }

    const toggle = ()=>{
        change = !change;
    }

    return stat.type.toString() === 'company' ? <Comapanydataform state={stat} /> : (
        <div className="body">
               
                <div  className="dataform">
               <Data labelData="Name:" labelId="NameLabel" inputId="NameInput" inputType="text" />
               <Data labelData="Age:" labelId="AgeLabel" inputId="AgeInput" inputType="text" />
               <Data labelData="Gender:" labelId="GenderLabel" inputId="GendermeInput" inputType="text" />
               <Data labelData="DateofBirth:" labelId="DateofBirthLabel" inputId="DateofBirthInput" inputType="date" />
               <Data labelData="Address:" labelId="AddressLabel" inputId="AddressInput" inputType="text" />
               <Data labelData="Phone Number:" labelId="PhLabel" inputId="PhInput" inputType="text" />
               <Data labelData="Email:" labelId="EmailLabel" inputId="EmailInput" inputType="text" />
               <label>Fresher:</label>
               <label className="switch">
                 <input type="checkbox" id="toggle" onClick={toggle} />
                 <span className="slider round"></span>
              </label>
              <label>Profile Picture:</label>
              <input className="profilepic" type="file" onChange={(e)=>{setImage(e.target.files[0])}} />
               <Data labelData="Current Designation:" labelId="DesignationLabel" inputId="DesignationInput" inputType="text" />
               <button onClick={logData} className="dataformbutton">Submit</button>
               </div>
            </div>
    );
}





export default DataForm;
