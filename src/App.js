//import firebase from './firebase/firebase';
import './App.css';
import DataForm from './containers/Landingpage/DataForm/DataForm';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import React from 'react';
import Landingpage from './containers/Landingpage/Landingpage';
import 'firebase/firestore';
import 'firebase/storage';
import Home from './hr/Pages/Home';
import Profile from './hr/Pages/Profile';
import About from './hr/Pages/About';
import Status from './hr/Pages/Status';
import Qualification from './hr/Pages/Qualification';
import CompanyHome from  './company/Home';
import Filter from './company/Filter';
import {ThemeProvider} from 'styled-components';
import { UseDarkMode } from './hr/styles/useDarkMode';
import {Toggle} from './hr/Pages/Toggle';
import {GlobalStyles, lightTheme, darkTheme} from './hr/styles/globalStyles';
import Applicants from './company/Applicants';
import Givejobs from './company/Givejobs';
import Application from './hr/Pages/Application';
import Applicationcompany from './company/Application';
import Profilecompany from './company/Profile';



function App(){
  const [theme,toggleTheme]=UseDarkMode();
  const themeMode=theme ==='light' ? lightTheme : darkTheme;
  console.log(window.location.href);

  return(
    <>
      <Router>
      <ThemeProvider theme={themeMode}>
      <GlobalStyles/>
       <Toggle theme={theme} toggleTheme={toggleTheme}/>
         <Switch>
                <Route exact path='/'  component={Landingpage} />
                <Route path='/createaccount' component={DataForm} />
                <Route path='/candidate' exact  component={Home}/>
                <Route path='/candidate/profile' component={Profile}/>
                <Route path='/candidate/status' component={Status}/>
                <Route path='/candidate/qualification' component={Qualification}/>
                <Route path='/candidate/about' component={About}/>
                <Route path='/company' exact component={CompanyHome} />
                <Route path='/company/applicants' component={Applicants} />
                <Route path='/company/application' component={Applicationcompany} />
                {/* <Route path='/company/jobs' component={Givejobs} /> */}
                <Route path='/company/jobs' component={Application} />
                <Route path='/company/filter' component={Filter} />
                <Route path='/company/profile' component={Profilecompany} />
                <Route path='/company/about' component={About} />
            </Switch>
            </ThemeProvider>
            </Router>
    </>
  );
}







// function App() {

//   var uri="";
//   const [image , setImage] = useState('');
//   const upload = ()=>{
//     if(image == null)
//       return;
//     storage.ref(`/images/${image.name}`).put(image)
//     .on("state_changed" , alert("success") , alert);
//   }

//   const download = ()=>{
//     storage.ref(`/images/19BIT040.xlsx`).getDownloadURL().then((url) => {

//       // `url` is the download URL for 'images/stars.jpg'
//         console.log(url);
//         uri = url;
        
//         window.open(uri);
      
//     });
//   }
    
//     return (
//       <div className="App">
//         <center>
//         <img  alt="something" />
//         <input type="file" onChange={(e)=>{setImage(e.target.files[0])}}/>
//         <button  onClick={upload}>Upload</button>
//         <button  onClick={download}>Download</button>
        
//         </center>
//       </div>
//     );
//   }

export default App;