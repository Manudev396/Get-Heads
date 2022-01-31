import React from 'react';
import './popup.css';

class Popup extends React.Component{

  constructor(props){
    super(props);
  }

  shortingDatahandler = ()=>{
     var sortdata = {
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
     }
     console.log(sortdata);
     this.props.parrentcallback(sortdata);
     this.props.toggle();
  }

    render(){
        return(
            <div className="modal">
        <div className="modal_content">
          <span className="close" onClick={this.props.toggle}>
            &times;
          </span>
         
          <div>
            <h4>Programing languages</h4>
            <input type="checkbox" name='languages' />c &nbsp;&nbsp;
            <input type="checkbox" name='languages' />c++&nbsp;&nbsp;
            <input type="checkbox" name='languages' />Java&nbsp;&nbsp;
            <input type="checkbox" name='languages' />Python
          </div>
          <br/>
          <div>
            <h4>FrontEnd Technology</h4>
            <input type="checkbox" name='frontend' />HTML&nbsp;&nbsp;
            <input type="checkbox" name='frontend' />React js&nbsp;&nbsp;
            <input type="checkbox" name='frontend' />Angular js&nbsp;&nbsp;
          </div>
          <br/>
          <div>
            <h4>App development</h4>
            <input type="checkbox" name='appdev' />Android Studio&nbsp;&nbsp;
            <input type="checkbox" name='appdev' />Flutter&nbsp;&nbsp;
            <input type="checkbox" name='appdev' />React Native&nbsp;&nbsp;
          </div>
          <br/>
          <div>
            <h4>Backend tools</h4>
            <input type="checkbox" name='backend' />Firebase&nbsp;&nbsp;
            <input type="checkbox" name='backend' />Mysql&nbsp;&nbsp;
            <input type="checkbox" name='backend' />mongodb&nbsp;&nbsp;
            <input type="checkbox" name='backend' />Sqlite
          </div>
          <button style={{fontSize:'20px'}} onClick={this.shortingDatahandler}>Short</button>
        </div>
      </div>
        );
    }
}

export default Popup;