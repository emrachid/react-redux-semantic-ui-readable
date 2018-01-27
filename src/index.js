import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './components/App';
import history from './utils/history'
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
  <BrowserRouter history={history}>
    <App />
  </BrowserRouter>, document.getElementById('root')
);
