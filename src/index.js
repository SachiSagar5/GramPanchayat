import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css'; 

import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'

import './index.css';
import Login from './Components/Login.js'
import PropertyTax from './Components/Home.js'
import Dashboard from './Components/Dashboard'

ReactDOM.render(
  <div>
  <Router>
      <Switch>
          <Route exact path='/' component={Login}/>
          <Route  path='/Dashboard' component={Dashboard}/>
          <Route  path='/Property-Tax' component={PropertyTax}/>
      </Switch>
  </Router>

</div>,
  document.getElementById('root')
);

