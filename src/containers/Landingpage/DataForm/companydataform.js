import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router';

import Data from './Data';
import './DataForm.css';
import './toggle.css';
import firebase from './../../../firebase/firebase';



const Comapanydataform = (props)=>{

  var history = useHistory();

    var ref = firebase.firestore().collection('companies');

    const imageref = `/images/${props.state.username.toString()}`;
    var storage = firebase.storage();

    const [image , setImage] = useState('');
      const upload = ()=>{
        if(image == null)
          return;
          
          storage.ref(imageref).put(image)
        // .on("state_changed" , alert("success") , alert);
      }

      const updatedata = ()=>{
        upload();
        const data = {
          companyname: document.getElementById('ComapanyName').value,
          cotes: document.getElementById('companycote').value,
          email: document.getElementById('companyemail').value,
          address: document.getElementById('companyaddress').value,
          phoneno: document.getElementById('companyphonenumber').value,
          imgref: imageref.toString(),
          jobs: []
        }

        console.log(data);

        ref.doc(props.state.username.toString()).update(data).catch(error => console.log(error));
        history.goBack();
      }

    return(
        <div className="body">
               
                <div  className="dataform">
                <Data labelData="Company Name:" labelId="companynamelable" inputId="ComapanyName" inputType="text" />
                <Data labelData='Comapany Cote:' labelId='companycotelable' inputId = 'companycote' inputType="text" />
                <Data labelData='Email:' labelId='companyemaillable' inputId = 'companyemail' inputType='text' />
                <Data labelData='Address:' labelId='companyaddresslable' inputId = 'companyaddress' inputType='text' />
                <Data labelData='Phone No:' labelId='companyphonenumberlable' inputId = 'companyphonenumber' inputType='text' />
                <label>Profile Pic:</label> <br />
                <input className="profilepic" type="file" onChange={(e)=>{setImage(e.target.files[0])}} /> <br /> <br />
                <button onClick={updatedata} className="dataformbutton">Submit</button>

               </div>
            </div>
    );
}

export default Comapanydataform;