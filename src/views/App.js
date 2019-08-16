import React, { Component } from 'react';
import '../styles/App.css';
import '../styles/scss/index.scss';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from './Home'
import About from './About'
import Signin from './user/Signin'
import Signup from './user/Signup'
import {PrivateRoute} from '../utils'
import {NoMatch} from '../components'


class App extends Component {
  render() {
    return (
     <div>
        <Router>
              <Switch>
               <PrivateRoute exact path="/" component={Home} />
               <PrivateRoute path="/about" component={About} />
               <Route path="/signin" component={Signin} />
               <Route path="/signup" component={Signup} />
               <Route component={NoMatch} />
              </Switch>
        </Router>  
     </div>
    );
  }
}

export default App;
