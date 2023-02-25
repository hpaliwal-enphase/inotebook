import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// const url = "https://www.google.com"

// const a = async () => {
//   console.log("Hi1");

//   let temp = () => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         console.log('hi');
//         resolve();
//       }, 5000);
//     });
//   }
//   await temp();

//   console.log("Hi2");
// }

// a();