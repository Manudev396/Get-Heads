import React, { useState } from 'react';
import './Qualification.css'
import * as FcIcons from "react-icons/fc";
import firebase from './../../firebase/firebase';
import { useHistory } from 'react-router-dom';
import Loading from './../../loading';


var ref = firebase.firestore();
let dat = [];

function Qualification(props) {

    const stat = props.location.state;
    console.log(stat);
    let history = useHistory();
    const [render,setrender] = useState(0);

    const checkApplied = ()=>{
        ref.collection('jobs').doc('jobs').get().then((doc)=>{
            let dynamic = `job${stat.jobnumber}`;
            let appledDatas = doc.data()[dynamic]["appliedmembers"];
            console.log(appledDatas);
            let renderornot = false;
            if(typeof(appledDatas) == 'undefined'){
                setrender((render+1));
            }else{
                appledDatas.forEach((appledData)=>{
                    if(appledData.toString() === localStorage.getItem('username')){
                       alert("you already applied");
                       history.goBack();
                    }else{
                        renderornot = true;
                    }
                });
                console.log(appledDatas.length == 0);
                if(renderornot || appledDatas.length == 0){
                    setrender((render+1));
                }
            }
           
        });
    }


    const submit = () => {
        getData();
    }

    const getData = ()=>{

        var data = {
            
                username: localStorage.getItem('username').toString(),
            firstqn: {
                c: document.getElementsByName('languages')[0].checked,
                cpp: document.getElementsByName('languages')[1].checked,
                java: document.getElementsByName('languages')[2].checked,
                python: document.getElementsByName('languages')[3].checked
            },
            secondqn: {
                html: document.getElementsByName('frontend')[0].checked,
                react: document.getElementsByName('frontend')[1].checked,
                angular: document.getElementsByName('frontend')[2].checked
            },
            thirdqn: {
                android: document.getElementsByName('appdev')[0].checked,
                flutter: document.getElementsByName('appdev')[1].checked,
                reactnative: document.getElementsByName('appdev')[2].checked
            },
            forthqn: {
                firebase: document.getElementsByName('backend')[0].checked,
                mysql: document.getElementsByName('backend')[1].checked,
                mongodb: document.getElementsByName('backend')[2].checked,
                sqlite: document.getElementsByName('backend')[3].checked
            },
            fifthqn: {
                tentotwenty: document.getElementsByName('salary')[0].checked,
                twentytoforty: document.getElementsByName('salary')[1].checked,
                fortytofifty: document.getElementsByName('salary')[2].checked,
                abovefifty: document.getElementsByName('salary')[3].checked
            },
            yearofexperience: document.getElementById('experience').value
        
        }
        console.log(data);
        // ref.collection('jobs').doc('jobs').get().then(doc => {
        //    console.log(doc.data());

        // });
        let as = stat.jobnumber;
        let dynamickey = `job${as}`;
        // let val={},ob;
        // let oldarray = [];
        console.log("[jobnumber]" + as);
        ref.collection('credentials').doc(localStorage.getItem('username')).update({
            [dynamickey] : data
        }).then(()=>{
            ref.collection('credentials').doc(localStorage.getItem('username')).get().then(doc =>{
                console.log(doc.data().appliedjob);
                if(typeof doc.data().appliedjob == 'undefined'){
                    ref.collection('credentials').doc(localStorage.getItem('username')).update({
                        appliedjob: [{jobnumber: as,
                            status: 'no',
                        jobdescription: stat.jobdescription,
                    companyname: stat.companyname}]
                    })
                }else{
                    let oldarray = doc.data().appliedjob;
                    ref.collection('credentials').doc(localStorage.getItem('username')).update({
                        appliedjob: [...oldarray,{jobnumber: as,status: 'no',jobdescription: stat.jobdescription,
                        companyname: stat.companyname}]
                    })
                }
            });
            
        }).then(()=>{
            var old;
            var oldappliedmembers = [];
            ref.collection('jobs').doc('jobs').get().then(doc=>{
                 old = doc.data()[dynamickey];
                 console.log(old["appliedmembers"] + ["isworking"]);
                oldappliedmembers = old["appliedmembers"];
            }).then(()=>{
                ref.collection('jobs').doc('jobs').update({[dynamickey]: {...old,appliedmembers: [...oldappliedmembers,localStorage.getItem('username')]}})
            })
        }).then(()=>{
            history.goBack();
        });
        // ref.collection('jobs').doc('jobs').get().then(doc => {
        //     ob = doc.data();
        //    for(const[key,value] of Object.entries(ob)){
        //        if(value.jobnumber == as){
        //            console.log('true');
        //            console.log(value);
        //            oldanswer = value.answers;
        //            val = {...val,value};
        //            console.log(val.value);
        //        }
        //    }
        // }).then(()=>{
        //     let dynamickey = `job${as}`;
        // let arr = val.value;
        // //This is the perfect way of storing the data
        // ref.collection('jobs').doc('jobs').update({...ob,[dynamickey]: {...arr,answers: {...oldanswer,[localStorage.getItem('username')]: data}}}).catch(error => console.log(error));
        //  history.goBack();
        // });
    }


    return render == 1 ? (
        <div className='profile'>
            <h1 className="question">
                Select Your Known Qualifications<FcIcons.FcInspection/>
            </h1>
            <br/>
        <div className="mainbox">
                <h2 className="que">1.Known Programming Languages</h2>                 {/*first qn*/}
                <div>
                        <label className="new">
                        <input type="checkbox" name="languages" value="c" className="check" />
                        &nbsp;&nbsp;c
                        </label>
                        {/* <br/> */}
                        <label className="new">
                        <input type="checkbox" name="languages" value="c" className="check"/>
                        &nbsp;&nbsp;c++
                        </label>
                        {/* <br/> */}
                        <label className="new">
                        <input type="checkbox" name="languages" value="c" className="check"/>
                        &nbsp;&nbsp;Java
                        </label>
                        {/* <br/> */}
                        <label className="new">
                        <input type="checkbox" name="languages" value="c" className="check"/>
                        &nbsp;&nbsp;Python
                        </label>
                </div>
                {/* <br/> */}
                <h2 className="que">2.Well Trained Frontend Technologies</h2>
                <div>
                        <label className="new">
                        <input type="checkbox" name="frontend" value="c" className="check"/>
                        &nbsp;&nbsp;HTML
                        </label>
                        {/* <br/> */}
                        <label className="new">
                        <input type="checkbox" name="frontend" value="c" className="check"/>
                        &nbsp;&nbsp;React js
                        </label>
                        {/* <br/> */}
                        <label className="new">
                        <input type="checkbox" name="frontend" value="c" className="check"/>
                        &nbsp;&nbsp;Angular js
                        </label>
                </div>
                {/* <br/>     */}
                <h2 className="que">3.Known App Development Tools</h2>
                <div>
                        <label className="new">
                        <input type="checkbox" name="appdev" value="c" className="check"/>
                        &nbsp;&nbsp;Android Studio
                        </label>
                        {/* <br/> */}
                        <label className="new">
                        <input type="checkbox" name="appdev" value="c" className="check"/>
                        &nbsp;&nbsp;Flutter
                        </label>
                        {/* <br/> */}
                        <label className="new">
                        <input type="checkbox" name="appdev" value="c" className="check"/>
                        &nbsp;&nbsp;React Native
                        </label>
                </div>
                {/* <br/>    */}
                <h2 className="que">4.Backend Tools</h2>
                <div>
                        <label className="new">
                        <input type="checkbox" name="backend" value="c" className="check"/>
                        &nbsp;&nbsp;Firebase
                        </label>
                        {/* <br/> */}
                        <label className="new">
                        <input type="checkbox" name="backend" value="c" className="check"/>
                        &nbsp;&nbsp;Mysql
                        </label>
                        {/* <br/> */}
                        <label className="new">
                        <input type="checkbox" name="backend" value="c" className="check"/>
                        &nbsp;&nbsp;mongodb
                        </label>
                        {/* <br/> */}
                        <label className="new">
                        <input type="checkbox" name="backend" value="c" className="check"/>
                        &nbsp;&nbsp;Sqlite
                        </label>
                </div>
                <h2 className="que">5.your current salary per month</h2>
                <div>
                        <label className="new">
                        <input type="radio"   name="salary" value="c" className="check"/>
                        &nbsp;&nbsp;10-20k
                        </label>
                        {/* <br/> */}
                        <label className="new">
                        <input type="radio"  name="salary" value="c" className="check"/>
                        &nbsp;&nbsp;20-40k
                        </label>
                        {/* <br/> */}
                        <label className="new">
                        <input type="radio"  name="salary" value="c" className="check"/>
                        &nbsp;&nbsp;40-50k
                        </label>
                        {/* <br/> */}
                        <label className="new">
                        <input type="radio"  name="salary" value="c" className="check"/>
                        &nbsp;&nbsp;Above 50k
                        </label>
                </div>
                <h2 className="que">6.Year of Experience in IT Industry</h2>
                <div>
                        <label className="new">
                        <input type="textbox" id='experience' className="box"></input>
                        </label>
                        <br/>   
                        {/* <br/> */}
                </div>
                <div>
                <button className="submit" onClick={submit}>Submit</button>
                </div>  
            </div>
        </div>
    ) : (<div>
        {
            checkApplied()
        }
        <Loading />
    </div>)
}

export default Qualification;
