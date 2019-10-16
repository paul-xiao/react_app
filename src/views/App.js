import React, { Component } from 'react';
import '../styles/App.css';
import '../styles/scss/index.scss';
import { Router, Route, Switch} from "react-router-dom";
// import Home from './Home'
import About from './About'
import TodoApp from './TodoApp'
import Signin from './user/Signin'
import Signup from './user/Signup'
import Article from './posts/Article'
import ArticleList from './posts/ArticleList'
import Post from './posts/Post'
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
               <PrivateRoute exact path="/" component={Post} />
               <PrivateRoute path="/about" component={About} />
               <PrivateRoute path="/create" component={Post} />
               <PrivateRoute path="/posts" component={ArticleList} />
               <PrivateRoute path="/article/:id" component={Article} />
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
