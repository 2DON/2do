import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './globals.scss';
import Main from './Main';

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.querySelector('#root')
);
