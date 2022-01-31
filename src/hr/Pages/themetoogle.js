import React from 'react';
import {ThemeProvider} from 'styled-components';
import {Toggle} from './Toggle';
import {UseDarkMode} from './../styles/useDarkMode';
import { lightTheme, darkTheme} from './../styles/globalStyles';


function themetoogle(){
    const [theme,toggleTheme]=UseDarkMode();
    const themeMode=theme ==='light' ? lightTheme : darkTheme;

    return(
        <div>
       <ThemeProvider theme={themeMode}>
       <Toggle theme={theme} toggleTheme={toggleTheme}/>
        </ThemeProvider>
        </div>
    );
}

export default themetoogle;