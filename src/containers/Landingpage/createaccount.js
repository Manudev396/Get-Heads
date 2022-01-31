import React from 'react';
import firebase from './../../firebase/firebase';
import  'firebase/firestore';
import {useHistory} from 'react-router-dom';
import Dropdown from './dropdown/dropdown';
import './createaccount.css';

const style = {
    'margin-left':" 80px"
}

var ref = firebase.firestore().collection("credentials");
var ref1 = firebase.firestore().collection("companies");

function Createaccount(){
const history = useHistory();


    function Createaccountfun(){
        const data ={
            email : document.getElementById("Email").value,
         username : document.getElementById("Username").value,
         password : document.getElementById("Password").value,
         conform : document.getElementById("Conformpassword").value,
         type: document.getElementById("logintype").value
        };
        
            ref1.doc(data.username.toString()).set(data).catch((error)=>{console.log(error)});
        
            ref.doc(data.username.toString()).set(data).catch((error)=>{console.log(error)});
    
        history.push({pathname: '/createaccount',state: {username: data.username.toString(),type: data.type.toString()}});
        
    }

    return(
        <div>
            <br />
            <label>Email</label>
            <input className="createaccountinput" type="email" id="Email"/>
            <label>Username</label>
            <input className="createaccountinput" type="text" id="Username" />
            <label>Password</label>
            <input className="createaccountinput" type="text" id="Password" />
            <label>Conform password</label>
            <input className="createaccountinput" type="text" id="Conformpassword" />
            <Dropdown />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button style={style} 
            onClick={Createaccountfun}
            className="createaccountbt">Create Account</button>
        </div>
    );
}






// class Createaccount extends React.Component{
//     constructor(props){
//         super(props);
//         this.state={
//             isNext:false
//         }
//     }

//     //history = useHistory();


//     Createaccountfun = ()=>{
//         const data ={
//             email : document.getElementById("Email").value,
//          username : document.getElementById("Username").value,
//          password : document.getElementById("Password").value,
//          conform : document.getElementById("Conformpassword").value,
//          type: document.getElementById("logintype").value
//         };
//         ref.doc(data.username.toString()).set(data).catch((error)=>{console.log(error)});
//         this.setState({
//             isNext:true
//         });
//     }

//     render(){
//         return(
//             <div>
//                 <br />
//                 <label>Email</label>
//                 <input type="email" id="Email"/>
//                 <label>Username</label>
//                 <input type="text" id="Username" />
//                 <label>Password</label>
//                 <input type="text" id="Password" />
//                 <label>Conform password</label>
//                 <input type="text" id="Conformpassword" />
//                 <Dropdown />
//                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Link to='/createaccount'><button style={style} 
//                 onClick={this.Createaccountfun}
//                 className="createaccountbt">Create Account</button></Link>
//             </div>
//         );
//     }
// }

export default Createaccount;