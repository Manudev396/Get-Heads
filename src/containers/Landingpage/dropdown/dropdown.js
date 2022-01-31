import React from 'react';


var style ={
    "margin-left":" 68px",
    "height": "30px",
    "width": "160px",
    "color": "white",
    "background":" #FF8E00"
    }


class Dropdown extends React.Component{

    

    render(){
        return(
            <div className="custom-select">
  <select id="logintype" style={style}>
    <option value="0">Select LoginType:</option>
    <option value="company">Company</option>
    <option value="customer">Applicant</option>
    {/* <option value="client">Client</option> */}
  </select>
</div>
        );
    }
}

export default Dropdown;