import React from 'react';
import './Home.css'
import * as FcIcons from "react-icons/fc"; 
import {useHistory} from "react-router-dom";
import firebase from './../firebase/firebase';
import Navbar2 from './Navbar2';
import Loading from './../loading';


var ref = firebase.firestore().collection('companies');

let jobs = [];

class CompanyHome extends React.Component{

    constructor(props){
        super(props);
        this.state={render: false};
        var data;
    ref.doc(localStorage.getItem('username').toString()).get().then(doc => {
        data = doc.data().jobs;
        
    }).then(()=>{
        if(typeof data === "undefined"){
            this.setState({render: true});
        }else{
            // console.log(data);
            // console.log(data == []);
            // console.log(data.length == 0);
            if(data.length == 0){
                this.setState({render: true});
            }else{
                data.forEach((dat)=>{
                    // console.log(data);
                    firebase.firestore().collection('jobs').doc('jobs').get().then(doc => {
                        let temp = doc.data();
                        for(const[key,value] of Object.entries(temp)){
                            if(dat.toString() === value.jobnumber.toString()){
                                console.log(value.answers,key);
                                console.log(value,"[nothing]");
                                if(value.companyname == localStorage.getItem('username').toString()){
                                    if(value.answers == undefined){
                                        jobs.push({jobnumber: dat,description: value.description});
                                    }else{
                                        jobs.push({jobnumber: dat,description: value.description,answers: value.answers});
                                    }
                                }
                            }
                        }
                        console.log(jobs);
                this.setState({render: true});
                    });
                });
            }
        }   
    });
    
    }

   


    render(){
        return this.state.render ? (
        <div className="back">
            <div className="candidate">
                <Navbar2 />
                <div className="back">
            <h1 className="heads">Job Vacancies</h1>
                <br/>
                
                <div>
                    {jobs.map(job=>{
                        return(
                            <Box 
                            description={job.description} 
                            jobnumber={job.jobnumber} 
                            manipulatedata={job}/>
                        );
                    })}
                </div>
            </div>
            </div>
            </div>
        ) : (<div>
            <Loading />
        {jobs=[]}</div>)
    }
}

// const CompanyHome = () => {
    
//     let history= useHistory();
//     const[state,setstate] = useState(false);
//     var data;
//     ref.doc(localStorage.getItem('username').toString()).get().then(doc => {
//         data = doc.data().jobs;
//         setstate(true);
//         // console.log(data);
//     }).then(()=>{
//         data.forEach((dat)=>{
//             // console.log(dat);
//             firebase.firestore().collection('jobs').doc('jobs').get().then(doc => {
//                 let temp = doc.data();
//                 for(const[key,value] of Object.entries(temp)){
//                     if(dat.toString() === value.jobnumber.toString()){
//                         // console.log({jobnumber: dat,description: value.description});
//                         jobs.push({jobnumber: dat,description: value.description});
//                     }
//                 }
                
//             });
//         });
        
//     });

//     // setTimeout(()=>{
//     //     console.log(jobs[0]);
//         // setstate(true);
//     // },2000);

//     console.log(jobs[0]);


//     const Button = styled.button`
//   background-color: black;
//   color:cyan;
//   font-size: 25px;
//   padding: 9px 20px;
//   border-radius: 7px;
//   margin: 10px 130px;
//   cursor: pointer;
//   margin-left: .7em;
//   text-align: center;
//   width:1.7cm;
// `;


//     return state ? (
//         <div className="candidate">
           
//             <h1 className="heads">Candidates List<FcIcons.FcList/></h1>
//             <br/>
//             <Button onClick={()=>{
//             history.push("/company/filter");
//         }
//         } className="filter"><FcIcons.FcClearFilters/></Button>
//             <br/>
//             <div>
//             <h2>Karthikeyan</h2>
//                 <h2>Dharaneesh</h2>
//                 <h2>Manu dev</h2>
                
//                 {/* <Box /> */}
                
//             </div>
//         </div>
//     ) : (<div>loading...</div>)
// }

const Box = (props)=>{
    console.log(props.description,props.jobnumber);
    let history= useHistory();
    let mani = props.manipulatedata;
    console.log(mani);
    const clickhandler = ()=>{
    history.push({pathname: '/company/applicants',state: {mani}});
    }

    return(
        <button onClick={clickhandler} className='box'>
            <h1>{props.description}</h1>
        </button>
    );
}

export default CompanyHome;