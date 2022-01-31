import React from 'react';
import './Home.css';
import Apps from './../Pages/like';
import Rating from './../Pages/rate';
import styled from "styled-components";
import {useHistory} from "react-router-dom";
import * as FcIcons from "react-icons/fc";
import Navbar from './../components/Navbar';
import firebase from './../../firebase/firebase';
import user from './user';
import { useState } from 'react';
import Loading from './../../loading';


var ref = firebase.firestore().collection("jobs");
var ref2 = firebase.firestore().collection("credentials");

        let dat = [];
        let ur = "";

    class Home extends React.Component{

        constructor(props){
            super(props);
            this.username = localStorage.getItem('username');
            this.state={
                loading: true,
                style: {"background": "none"}
            }
            ref.doc('jobs').get().then(doc =>{
                // console.log(doc.data());
                let obb = doc.data();
                console.log(obb);

                for(const[key,value] of Object.entries(obb)){
                    dat.push(value);
                    console.log(value);
                }
                
                // obb.forEach((data)=>{
                //     // console.log(data);
                //     dat.push(data);
                // });
                this.setState({loading: false});
                
                console.log(dat);
            });
        }

        
        subrotineofreload = ()=>{
            ref2.doc(this.username.toString()).update({shouldreload: "false"}).catch(error => console.log(error));
            console.log("[updated]");
        }

         reload = ()=>{
            
            if(localStorage.getItem('firstload')){
                window.location.reload();
            }
                
        }
        

        render(){
            return this.state.loading ? (
                <div>
                    <Loading />
                    {dat = []}
                </div>
            ) : (
                <div className='home'>
            <Navbar />
            <h1 className="head">
                Find your Career Path Here!<FcIcons.FcGraduationCap/>
            </h1>
            
        <h1 className="hed">Here are some Top Companies for you</h1>
        
        { console.log(`[homepage]${user.user}`)}
        
        {dat.map((val,index) =>{
            
            // firebase.storage().ref(val.imgref.toString()).getDownloadURL().then(url=>{
            //     console.log(url);
            //     ur = url.toString();
            //     console.log("[url]",ur);
            // });
            console.log(val);
           
            return(
                <Box 
                jobnumber={val.jobnumber}
                companyname={val.companyname}
                stringof={val.description}
                classname={val.classname}
                src = {val.imgref} /> 
            );
        })}
        </div>
            );
        }
    }

function Box(props){
    let history= useHistory();
    firebase.storage().ref(props.src.toString()).getDownloadURL().then(url => {
        document.getElementById(`${props.stringof.toString()}`).src = url;
    }).catch(error=>console.log(error));
    const Button = styled.button`
  background-color: black;
  color:cyan;
  font-size: 15px;
  padding: 9px 30px;
  border-radius: 7px;
  margin: 10px 0px;
  cursor: pointer;
  margin-left: .7em;
  `;
    return (
        <div className='jobbox'>
            <hr />
          <br/>
       <div className="imagezoom">
        <img  alt='nothing' style={{boxShadow:'0px 5px 10px 2px #2d2f28'}} className={props.classname} id={props.stringof.toString()} src='nothingnow' height='300' width='450'></img>
        </div>
       <br/>
       <br/>
       <br/>
        <p className="info">{props.stringof}</p>
        <br/>
        <Button style={{fontSize:'16px',marginLeft:'-70px'}} onClick={()=>{
            history.push({pathname: "/candidate/qualification",state: {companyname: props.companyname,jobnumber: props.jobnumber,jobdescription: props.stringof}});
        }
        } className="apply" >Apply Now</Button><div style={{display:'inline-block',float:'left',marginTop:'-150px'}}><Apps/><br/><h2 style={{color:'#FF8E00',fontSize:'30px',fontFamily:'Inconsolata'}}>Rate us</h2><Rating/></div>
        <hr /> 
        </div>
    );
}

export default Home;
