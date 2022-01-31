import React from 'react';
import './Loginmodule.css';
import Createaccount from './createaccount';
import firebase from './../../firebase/firebase';
import 'firebase/firestore';
import Dropdown from './dropdown/dropdown';



var ref = firebase.firestore().collection("credentials");

function Loginpage(props) {

    const handlercallback = (childData, username, type) => {
        console.log(childData);
        console.log(username);
        if (childData === "True") {
            localStorage.setItem('username', username);
            if (type.toString() === 'customer') {
                window.open("http://localhost:3000/candidate");
            } else {
                if (type.toString() === 'company') {
                    window.open("http://localhost:3000/company");
                }
            }
        }
    }

    return (
        <Loginpage1 parrentcallback={handlercallback} />
    );
}


class Loginpage1 extends React.Component {

    constructor(props) {
        super(props);
        this.create = false;
        this.state = {
            renderThing: true
        }

    }

    login = () => {


        const username = document.getElementById("Username").value;
        const pas = document.getElementById("pass").value;
        const type = document.getElementById("logintype").value;
        ref.doc(username.toString()).get().then((doc) => {
            if (username === doc.data()["username"] && pas === doc.data()["password"] && type === doc.data()["type"]) {

                this.props.parrentcallback("True", username, type);
            }
        });
    }


    clickToggle = (change) => {
        this.setState({
            renderThing: change === "Login" ? true : false
        });
        console.log(this.state);
    }


    render() {
        return (
            <div style={{ marginTop: '-600px' }}>
                <div className="main-container">

                    {this.state.renderThing ? <div className="innerelements"><br /><br /><label style={{ fontWeight: '600', fontSize: '17px' }}>Username</label>
                        <input className="loginmoduleinput" type="text" id="Username" />
                        <label style={{ fontWeight: '600', fontSize: '17px' }}>Password</label>
                        <input className="loginmoduleinput" type="text" id="pass" />
                        <Dropdown />
                        <button style={{ fontSize: '19px' }} onClick={this.login} className="login">Login</button><br /><br />
                        <br /></div> : <Createaccount />}
                    <button className="button1" style={{ fontWeight: '600', fontSize: '14px' }} onClick={() => this.clickToggle("Login")}>Login In Into existing account</button>
                    <button className="button2" style={{ fontWeight: '600', fontSize: '14px' }} onClick={() => this.clickToggle("Create")}>Create new Account</button>
                </div>
            </div>
        );
    }
}

export default Loginpage;
