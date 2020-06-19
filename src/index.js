import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css'; 

import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'

import './index.css';
import Login from './Components/Login'
import PropertyTax from './Components/Home'
import Dashboard from './Components/Dashboard'
import TapWaterTax from './Components/TapWaterTax'

ReactDOM.render(
  <div>
  <Router>
      <Switch>
          <Route exact path='/' component={Login}/>
          <Route  path='/Dashboard' component={Dashboard}/>
          <Route  path='/Property-Tax' component={PropertyTax}/>
          <Route  path='/TapWater-Tax' component={TapWaterTax}/>
      </Switch>
  </Router>

</div>,
  document.getElementById('root')
);

