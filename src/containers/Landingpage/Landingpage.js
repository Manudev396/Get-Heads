import React from 'react';
import Loginmodule from './Loginmodule';
import Font from './font';
import './Landingpage.css';

class Landingpage extends React.Component{
    render(){
        return(
            <div >         
            <Font/>
            <div className="background">
            &nbsp;&nbsp;<Description />
            <Loginmodule />
            </div>
            </div>
        );
    }
}
function Description(){
    return(
        
        <p style={{display: 'inline-block',fontSize: "30px",fontFamily: 'Inconsolata'}}>
            <br/>
            <br/><br/><br/><br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <br /><p style={{fontSize: "50px",marginTop:'-600px',fontFamily: 'Inconsolata'}}>
            <br /><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Wanna Get Jobs <br/><br/><br/><br/>
            &nbsp;&nbsp;&nbsp;&nbsp;The perfect place is Here</p><p style={{fontWeight:'bold',fontSize: "30px",fontFamily: 'Inconsolata'}}>
            <br/><br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;You are only 4 steps away for Your Dream job</p></p>
    );
}

export default Landingpage;