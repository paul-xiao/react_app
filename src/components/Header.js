import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom'
import {Button} from 'antd'
import {fakeAuth} from '../utils'
const isLogin = fakeAuth.isAuthenticated || !!localStorage.getItem('token')
const AuthButton = withRouter(
  ({ history , ...props}) =>
  isLogin ? (
      <span>
        Welcome! {props.name}
        <Button
         
          onClick={() => {
            fakeAuth.signout(() => {
              history.push("/");
              clearToken();
            });
          }}
        >
          Sign out
        </Button>
      </span>
    ) : (
      <p>You are not logged in.</p>
    )
);
const clearToken = () => {
  localStorage.removeItem('token')
}
const getToken = () => {
 return localStorage.getItem('token')
}
const userinfo = 'http://localhost:8080/userinfo'
class Header extends Component {
  state = {
    username: ""
  }
  logout = () => {
    fakeAuth.signout()
    console.log('out')
  }
  getUserInfo = () => {
    fetch(userinfo, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
         'Authorization': getToken()
      },
      mode: 'cors'
    }).then(response => {
      response.json().then((json) => {
        if(json.success) {
         this.setState({
           username: json.user
         })
        }
       })
    }).catch(err => {
      console.log(err)
    })
  }
  componentDidMount(){
    this.getUserInfo()
  }
  render() {
    return (
      <div className="header">
        <div className="logo">
           <h1>PX</h1>
        </div>
        <div className="nav">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/signin">Signin</Link>
        <AuthButton name={this.state.username}/>
        </div>
      </div>
    );
  }
}

export default Header;
