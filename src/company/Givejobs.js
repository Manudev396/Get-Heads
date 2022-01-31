import React from 'react';

import firebase from './../firebase/firebase';

var ref = firebase.firestore();

const style = {
    
}

const Givejobs = ()=>{

    

    const addjob = ()=>{
        var jobnumber = 0;
        var dynamickey;
        ref.collection('jobs').doc('totaljob').get().then(dat=>{
            jobnumber = dat.data().value;
            dynamickey = `job${jobnumber+1}`;
            console.log(jobnumber);
        }).then(()=>{
            ref.collection('jobs').doc('totaljob').set({value: jobnumber+1});
        }).then(()=>{
            ref.collection('jobs').doc('jobs').update({[dynamickey]: {description: document.getElementById('description').value,
            jobnumber: jobnumber+1
        }});
        });
        
    }


    return(
        <div style={style}>
            <label>Description</label>
            <input type="text"  id="description" />
            <label>Pictures for Reference:</label>
            <input type='file'  id="picture" /> <br />
            <button onClick={addjob}>Add Job</button>
            <button>Restore in case</button>
        </div>
    );
}

export default Givejobs;