import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Init from './Init';
import { io } from "socket.io-client";


ReactDOM.render(
  <React.StrictMode>
    <Init />
  </React.StrictMode>,
  document.getElementById('root')
);
