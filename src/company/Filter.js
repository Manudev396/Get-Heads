import React from 'react'
import './Filter.css'
import * as BiIcons from "react-icons/bi"; 
import {useHistory, withRouter} from "react-router-dom";
import styled from "styled-components";

function Filter() {
    let history= useHistory();
    const Button = styled.button`
    background-color: black;
    color:cyan;
    font-size: 20px;
    padding: 9px 20px;
    border-radius: 7px;
    margin: 10px 130px;
    cursor: pointer;
    margin-left: 9em;
    text-align: center;
    width:3cm;
    height:1.2cm
  `;

    return (
        <div className="body">
        <div className="sort">
            <h1 className="filterque">Candidate Selection</h1>
            <br/>
            <h2 className="sorting">Sort Candidates by</h2>
            <br/>
        <label className="new">
        <input type="checkbox" name="languages" value="c" className="check"/>
        &nbsp;&nbsp;C
        <br/>
        </label>
        <label className="new">
        <input type="checkbox" name="languages" value="c" className="check"/>
        &nbsp;&nbsp;C++
        </label>
        <br/>
        <label className="new">
        <input type="checkbox" name="languages" value="c" className="check"/>
        &nbsp;&nbsp;Java
        </label>
        <br/>
        <label className="new">
        <input type="checkbox" name="languages" value="c" className="check"/>
        &nbsp;&nbsp;Phython
        </label>
        <br/>
        <label className="new">
        <input type="checkbox" name="languages" value="c" className="check"/>
        &nbsp;&nbsp;HTML
        </label>
        <br/>
        <label className="new">
        <input type="checkbox" name="languages" value="c" className="check"/>
        &nbsp;&nbsp;React js
        </label>
        <br/>
        <label className="new">
        <input type="checkbox" name="languages" value="c" className="check"/>
        &nbsp;&nbsp;Angular js
        </label>
        <br/>
        <label className="new">
        <input type="checkbox" name="languages" value="c" className="check"/>
        &nbsp;&nbsp;Android studio
        </label>
        <br/>
        <label className="new">
        <input type="checkbox" name="languages" value="c" className="check"/>
        &nbsp;&nbsp;Flutter
        </label>
        <br/>
        <label className="new">
        <input type="checkbox" name="languages" value="c" className="check"/>
        &nbsp;&nbsp;React Native
        </label>
        <br/>
        <label className="new">
        <input type="checkbox" name="languages" value="c" className="check"/>
        &nbsp;&nbsp;Firebase
        </label>
        <br/>
        <label className="new">
        <input type="checkbox" name="languages" value="c" className="check"/>
        &nbsp;&nbsp;Mongo Db
        </label>
        <br/>
        <label className="new">
        <input type="checkbox" name="languages" value="c" className="check"/>
        &nbsp;&nbsp;Mysql
        </label>
        <br/>
        <label className="new">
        <input type="checkbox" name="languages" value="c" className="check"/>
        &nbsp;&nbsp;Sqlite
        </label>
        <br/>
        <label className="new">
        <input type="checkbox" name="languages" value="c" className="check"/>
        &nbsp;&nbsp;React Native
        </label>
        <br/>
        <label className="new">
        <input type="checkbox" name="languages" value="c" className="check"/>
        &nbsp;&nbsp;1-2 yrs Experience
        </label>
        <br/>
        <label className="new">
        <input type="checkbox" name="languages" value="c" className="check"/>
        &nbsp;&nbsp;3-4 yrs Experience
        </label>
        <br/>
        <label className="new">
        <input type="checkbox" name="languages" value="c" className="check"/>
        &nbsp;&nbsp;5 Above 
        </label>
        <br/>
        <br/>
        <Button onClick={()=>{
            history.push("/finallist");
        }
        } className="sortbut">Sort<BiIcons.BiSortDown/></Button>
        </div>
        </div>
    )
}

export default withRouter(Filter);
