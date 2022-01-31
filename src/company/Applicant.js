import React from 'react';


const Applicant = ()=>{


    return(
        <div>
           <skeletonofapplication name="name:" id="name" />
        </div>
    );
}

const skeletonofapplication = (props)=>{

    return(
        <div>
            <label>{props.name}</label><span id={props.id}></span>
            <br />
        </div>
    );
}