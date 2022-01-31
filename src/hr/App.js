import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import { useState } from "react";

//Dark theme
import styled,{ThemeProvider} from 'styled-components';
import { useDarkMode } from './styles/useDarkMode';
import {Toggle} from './Pages/Toggle';
import {GlobalStyles, lightTheme, darkTheme} from './styles/globalStyles';

// CANDIDATE PAGE

// import Navbar from './components/Navbar';
// import Home from './Pages/Home';
// import Profile from './Pages/Profile';
// import Status from './Pages/Status';
// import Qualification from './Pages/Qualification';
// import About from './Pages/About';


// CLIENT PAGE

// import Homea from './Client/home';
// import Candidate from './Client/Candidate';
// import Selection from './Client/Selection';
// import Navbar1 from './Client/Navbar1';

// HR PAGE

 import Home from './Pages/Home';
 import Application from './Pages/Application';
 import Profile from './Pages/Profile'; 
 import About from './Pages/About';
 import Navbar2 from './Pages/Navbar2';

function App() {
  const [theme,toggleTheme]=useDarkMode();
  const themeMode=theme ==='light' ? lightTheme : darkTheme;
  return (
    
     <Router>
       <ThemeProvider theme={themeMode}>
       {/* <Navbar/> */}
       <GlobalStyles/>
       <Toggle theme={theme} toggleTheme={toggleTheme}/>
       {/* <Navbar1 /> */}
       <Navbar2 />
       <Switch>
{/* CANDIDATE PAGE */}

         {/* <Route path='/' exact component={Home}/>
         <Route path='/profile' component={Profile}/>
         <Route path='/status' component={Status}/>
         <Route path='/qualification' component={Qualification}/>
         <Route path='/about' component={About}/> */}
         

{/* CLIENT PAGE */}
{/* 
         <Route path='/' exact component={Homea}/>
         <Route path='/candidate' component={Candidate}/>
         <Route path='/selection' component={Selection}/> */}


 {/* HR PAGE */}

 <Route path='/' exact component={Home}/>
<Route path='/application' component={Application}/>
<Route path='/profile' component={Profile}/>
<Route path='/about' component={About}/> 

       </Switch>      
       </ThemeProvider>
     </Router>
   
  );
}

export default App;



 