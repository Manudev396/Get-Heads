import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle `
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: 'Roboto', sans-serif;
    transition: all .5s linear;
  }
  p {
    line-height: 1.4rem;
  }
  .btn-primary {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.body};
    padding: 0.5rem 1.5rem;
    font-size: 1rem;
    border-radius: 1rem;
    cursor: pointer;
    outline: none;
    border: none;
    transition: all .5s linear;
  }
`;



// function check() {
//     if () {
//         return true;
//     } else {
//         return false;
//     }

// }

export const lightTheme = {
    body: window.location.href.toString() === "http://localhost:3000/" || window.location.href.toString() === "http://localhost:3000/createaccount" ? '#008FCC' : '#fff',
    text: '#121212',
    primary: '#6200ee',
};

export const darkTheme = {
    body: 'rgb(43, 44, 43)',
    text: '#fff',
    primary: '#bb86fc',
};