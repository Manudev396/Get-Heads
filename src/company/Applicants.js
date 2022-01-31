import React, { useState } from 'react';
import styled from "styled-components";
import './applicant.css';
import * as FcIcons from "react-icons/fc"; 
import { useHistory } from 'react-router-dom';
import Filter from './Filter';
import Popup from './popup';
import firebase from './../firebase/firebase';
import _, { set } from "lodash";
import ShowProfile from './showProfile';
let applicants = [];
// import _ from 'lodash';

var ref = firebase.firestore();

const  Button = styled.button`
background-color: black;
color:cyan;
font-size: 25px;
padding: 9px 20px;
border-radius: 7px;
margin: 10px 130px;
cursor: pointer;
margin-left: .7em;
text-align: center;
width:1.7cm;
`;


var dataforsort = {};
var user = "";
var jobnumber = 0;

class Applicants extends React.Component{

    

    constructor(props){
        
        
        super(props);
       
        this.state = {
            render: false,
            secondrender: false,
            profilerender: false
        }
        console.log(props.location.state.mani);
        jobnumber = props.location.state.mani.jobnumber;
       applicants = [];
        ref.collection('jobs').doc('jobs').get().then(dat=>{
            console.log(dat.data()[`job${props.location.state.mani.jobnumber}`]['appliedmembers']);
            applicants = dat.data()[`job${props.location.state.mani.jobnumber}`]['appliedmembers'];
        }).then(()=>{
            this.setState({render: true});
            console.log(applicants);
        })
        console.log(applicants);
        
    }

    fetchdata = ()=>{
        applicants.forEach((applicant)=>{
            console.log(applicant);
             ref.collection('credentials').doc(applicant).get().then((dat)=>{
                console.log(dat.data()[`job${this.props.location.state.mani.jobnumber}`]);
                dataforsort = {...dataforsort,[`${applicant}`]: dat.data()[`job${this.props.location.state.mani.jobnumber}`]}
            })
        })
    }


    grandparrentcallback = (parrentdata)=>{
        console.log('[got parrentdata]',parrentdata);
        console.log(applicants);
        console.log(dataforsort);
        applicants = [];
        let count = 0;
        let mergecount = 0;
        //This loop will go for every person in the list
        for(const[key,value] of Object.entries(dataforsort)){
            
            // This loop will get the values based on qnnumbers
            for(const[qnnumber,answers] of Object.entries(value)){
                // console.log(qnnumber,answers);
                if(qnnumber.toString() != "username" && qnnumber.toString() != "yearofexperience" && qnnumber.toString() != "fifthqn"){
                    // console.log(answers,key);
                   for(const[key1,value1] of Object.entries(parrentdata[`${qnnumber}`])){
                       console.log(key1,value1,answers[`${key1}`]);
                       if(value1){
                           count++;
                       }
                       if(answers[`${key1}`] == true && value1 == true){
                            mergecount++;
                       }
                   }
                }
                
            }
            console.log(count,mergecount);
            console.log(key);
            if(count == mergecount){
                applicants.push(key);
            }
                count = 0;
                mergecount = 0;
        }
        console.log(applicants);
        this.setState({secondrender: true});
    }

    callback = (childdata)=>{
        console.log(childdata);
        if(childdata.render){
            user = childdata.username.toString();
            this.setState({profilerender: true});
        }
    }

    render(){

        if(this.state.profilerender){
            return (
                <div>
                    {
                        console.log(user)
                    }
                    <ShowProfile jobnumber={jobnumber} username={user} />
                </div>
            )
        }else{
        return this.state.render ? (
            <div>
                <h1 style={{backgroundColor:'#2d78e9',height:'1.3cm',textAlign:'center'}}>Applicants list</h1>
                {
                    this.fetchdata()
                }
                <ReplaceButton grandparrentcallback={this.grandparrentcallback} />
                
                {
                   this.state.secondrender ? applicants.map((applicants) =>{
                       console.log(applicants);
                    return(
                        // <button className='box'>
                        //    <h1>{applicants.username}</h1>
                        // </button>
                        <Buttonbox username={applicants} callback={this.callback} />
                    );
                }) : applicants.map((applicants) =>{
                        
                        return(
                            // <button className='box'>
                            //    <h1>{applicants.username}</h1>
                            // </button>
                            <Buttonbox username={applicants} callback={this.callback} />
                        );
                    })
                }
                <br/>
                <br/>
{/* <div className="container">
    
    <button className="btn btn3">ACCEPT</button>
    <button className="btn btn4">DECLINE</button>
</div> */}
            </div>
        ):(<div>loading..</div>) ;
    }
}
}

const ReplaceButton = (props)=>{
    const [state,setstate] = useState(false);
    const history = useHistory();
    const togglepopup =()=>{
        setstate(false);
    }
    const parrentcallback = (childdata)=>{
        console.log('[received childdata]',childdata);
        props.grandparrentcallback(childdata);
    }
    const clickhandler = ()=>{
        setstate(true);
    }
    return(
        <div>
            {/* <button onClick={clickhandler}>filter</button> */}
        <Button style={{marginTop:'23px',boxShadow:'0px 5px 12px #242320'}} onClick={clickhandler}
          className="filter"><FcIcons.FcClearFilters/></Button>
          <h1 style={{color:'orange',float:'right',marginTop:'23px'}}>Filter Candidates</h1>
            <br/>
            {state ? <Popup  parrentcallback={parrentcallback} toggle = {togglepopup}/>: null}
      </div>
    );
}

const Buttonbox = (props)=>{

    return(
        <div>
            <button className='box' onClick={()=>{props.callback({render: true,username: props.username})}}>
                <h1>{props.username}</h1>
            </button>
        </div>
    );
}

export default Applicants;