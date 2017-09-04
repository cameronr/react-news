import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from './App.js';
import './scss/main.css';

render(
  <Router>
    <Route component={ App } />
  </Router>,
  document.getElementById('app')
);
