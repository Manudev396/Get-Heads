import React from 'react';
import './Status.css';
import Navbar from './../components/Navbar';
import firebase from './../../firebase/firebase';
import Loading from '../../loading';
import { isNil } from 'lodash';

var ref = firebase.firestore().collection('credentials');
var appliedjob = [];

class Status extends React.Component {


    constructor(props){
        super(props);
        this.state = {
            changestate: false
        }
        ref.doc(localStorage.getItem('username')).get().then(doc=>{
            appliedjob = doc.data().appliedjob;
        }).then(()=>{
            if(typeof(appliedjob) == 'undefined'){
                appliedjob = [{
                    jobdescription: 'nil',
                    companyname: 'nil',
                    status: 'nil'
                }]
            }
            this.setState({changestate: true})
        });
    }

    render(){
        return this.state.changestate ? (
            <div className='status'>
                <Navbar />
                <h1 className="helo">
                    Your Current Job Status
                </h1>
               
                    <div>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Cartoon_Call_Centre_Guy_Using_A_Computer.svg/432px-Cartoon_Call_Centre_Guy_Using_A_Computer.svg.png"  
                        alt="nothing" height="350px"></img>
                        <div className="statusbox">
                        <table style={{backgroundColor:'#2ae418'}}>
                            <tr>
                                <th>Jobdescription</th>
                                <th>Companyname</th>
                                <th>Status</th>
                            </tr>
                        </table>
                        </div>
                        {
                            appliedjob.map(appled=>{
                                console.log(appled);
                                return(
                                    <div>
                                        <StatusComponent statusdata={appled} />
                                    </div>
                                );
                            })
                        }
                    </div> 
            </div>
        ) : (<div><Loading /></div>)
    }
    
}

function StatusComponent(props) {


    // return(
    //     <div className="statusbox">
    //         <span>{props.statusdata.jobdescription}</span>
    //         <span>{props.statusdata.companyname}</span>
    //         <span>{props.statusdata.status}</span>
    //         <br />
    //     </div>
    // );

    return(
        <div className="statusbox">
            <table style={{backgroundColor:'#2ae418',fontFamily:'Inconsolata'}}>
                <tr style={{fontFamily:'Inconsolata'}}>
                    <td><b>{props.statusdata.jobdescription}</b></td>
                    <td><b>{props.statusdata.companyname}</b></td>
                    <td><b>{props.statusdata.status}</b></td>
                </tr>
            </table>
        </div>
    );
}


export default Status;
