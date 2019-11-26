import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import './styles/App.css';
import './styles/scss/index.scss';
import { Router, Route, Switch} from "react-router-dom";
import Signin from './projects/Auth/Signin'
import Signup from './projects/Auth/Signup'
import ArticleList from './projects/Crawler/ArticleList'
import { Provider } from "react-redux";
import store from "./store";
import { history } from './utils';
import {Notification, NoMatch, PrivateRoute, SplashScreen} from './components';
import * as serviceWorker from './serviceWorker';
import Mind from './projects/Mind';
import Post from './projects/Post';

ReactDOM.render( <Provider store={store}>
    <div className="container">
    <Notification />
    <SplashScreen />
       <Router history={history}>
             <Switch>
              <PrivateRoute path="/posts" component={ArticleList} />
              <Route path="/signin" component={Signin} />
              <Route path="/signup" component={Signup} />
              <Route path="/" exact component={Mind} />
              <Route path="/post"  component={Post} />
              <Route component={NoMatch} />
             </Switch>
       </Router>  
    </div>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
