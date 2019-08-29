import React, { Component } from 'react';
import '../styles/App.css';
import '../styles/scss/index.scss';
import { Router, Route, Switch} from "react-router-dom";
import Home from './Home'
import About from './About'
import TodoApp from './TodoApp'
import Signin from './user/Signin'
import Signup from './user/Signup'
import {NoMatch, PrivateRoute} from '../components'
import { Provider } from "react-redux";
import store from "../store";
import { history } from '../utils';
import Notification from '../components/Notification';



class App extends Component {
  render() {
    return (
      <Provider store={store}>
     <div>
     <Notification />
        <Router history={history}>
              <Switch>
               <PrivateRoute exact path="/" component={Home} />
               <PrivateRoute path="/about" component={About} />
               <Route path="/signin" component={Signin} />
               <Route path="/signup" component={Signup} />
               <Route path="/todo" component={TodoApp} />
               <Route component={NoMatch} />
              </Switch>
        </Router>  
     </div>
     </Provider>
    );
  }
}
export default App
