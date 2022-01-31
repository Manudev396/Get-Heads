import React from "react";
import firebase from './../firebase/firebase';
import Loading from "../loading";
import './showProfile.css';

var ref = firebase.firestore();
var storage = firebase.storage();
var uri = "";


class ShowProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            render: false,
            accept: false
        }
        this.resumeRef = "";
        this.data = {
            name: "",
            age: "",
            email: "",
            gender: ""
        }
        console.log(props);

        ref.collection('credentials').doc(props.username).get().then(dat => {
            console.log(dat.data()['name']);
            this.resumeRef = dat.data()['resumeref'];
            // console.log(document.getElementById("name"));
            // document.getElementById('name').innerHTML = dat.data()['name'];
            // document.getElementById('age').innerHTML = dat.data()['age'];
            // document.getElementById('email').innerHTML = dat.data()['email'];
            // document.getElementById('gender').innerHTML = dat.data()['gender'];
            this.data.name = dat.data()['name'];
            this.data.age = dat.data()['age'];
            this.data.email = dat.data()['email'];
            this.data.gender = dat.data()['gender'];
        }).then(() => {
            storage.ref(this.resumeRef.toString()).getDownloadURL().then((url) => {
                uri = url;
                console.log(uri);
                this.setState({ render: true });
            })

        })
        ref.collection('credentials').doc(this.props.username).get().then(dat => {
            console.log(dat.data().appliedjob);
            dat.data().appliedjob.forEach((job) => {
                if (job.jobnumber == props.jobnumber && job.status == 'no') {
                    this.setState({ accept: true });
                }
            })
        });
    }

    //changes the status to yes while pressed accept
    accept = () => {
        console.log(this.props.username, this.props.jobnumber);
        let oldarray = [];
        let newarray = [];
        ref.collection('credentials').doc(this.props.username).get().then(dat => {
            oldarray = dat.data().appliedjob;
            console.log(oldarray);
        }).then(() => {
            oldarray.forEach((dat, index) => {
                console.log(index, dat);
                if (dat.jobnumber == this.props.jobnumber) {
                    console.log(true);
                    newarray[index] = { ...oldarray[index], status: "yes" };
                    oldarray.forEach((dat1, index1) => {
                        if (index != index1) {
                            newarray.push(dat1);
                        }
                    })
                    console.log(newarray);
                }
            })
            ref.collection('credentials').doc(this.props.username).update({ appliedjob: newarray });
        }).then(() => {
            this.setState({ accept: true });
        })
    }


    reject = () => {
        console.log(this.props.username, this.props.jobnumber);
        let oldarray = [];
        let newarray = [];
        ref.collection('credentials').doc(this.props.username).get().then(dat => {
            oldarray = dat.data().appliedjob;
            console.log(oldarray);
        }).then(() => {
            oldarray.forEach((dat, index) => {
                console.log(index, dat);
                if (dat.jobnumber == this.props.jobnumber) {
                    console.log(true);
                    newarray[index] = { ...oldarray[index], status: "no" };
                    oldarray.forEach((dat1, index1) => {
                        if (index != index1) {
                            newarray.push(dat1);
                        }
                    })
                    console.log(newarray);
                }
            })
            ref.collection('credentials').doc(this.props.username).update({ appliedjob: newarray });
        }).then(() => {
            this.setState({ accept: false });
        })
    }

    render() {
        return this.state.render ? (
            <div style={{ fontSize: '20px', backgroundColor: '#20251f', marginLeft: '30px', padding: '30px' }}>
                <p style={{ float: 'left', color: 'white' }}>Name:</p>  <p id='name' style={{ color: 'white' }}>&nbsp;&nbsp;{this.data.name}</p> <br />
                <p style={{ float: 'left', color: 'white' }}>Age:</p><p id='age' style={{ color: 'white' }}>&nbsp;&nbsp;{this.data.age}</p> <br />
                <p style={{ float: 'left', color: 'white' }}>Email:</p><p id='email' style={{ color: 'white' }}>&nbsp;&nbsp;{this.data.email}</p> <br />
                <p style={{ float: 'left', color: 'white' }}>Gender:</p><p id='gender' style={{ color: 'white' }}>&nbsp;&nbsp;{this.data.gender}</p>

                <div className="container">
                    {
                        this.state.accept ? (
                            <div>
                                <p>You already accepted this person Do You need to DECLINE</p>
                                <button onClick={this.reject} className="btn btn4">DECLINE</button>
                            </div>
                        ) : (<div>
                            <button onClick={this.accept} className="btn btn3">ACCEPT</button>
                        </div>)
                    }
                    {/* <button onClick={this.accept} className="btn btn3">ACCEPT</button>
                    <button onClick={this.reject} className="btn btn4">DECLINE</button> */}
                </div>
                <br />
                <br />
                <iframe src={uri.toString()} width="100%" height="500px"></iframe>
            </div>
        ) : (<div><Loading /></div>);
    }
}

export default ShowProfile;