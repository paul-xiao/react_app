import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom'
import {Button} from 'antd'
import {fakeAuth} from '../utils'

const AuthButton = withRouter(
  ({ history }) =>
    fakeAuth.isAuthenticated ? (
      <p>
        Welcome!{" "}
        <Button
          onClick={() => {
            fakeAuth.signout(() => history.push("/"));
          }}
        >
          Sign out
        </Button>
      </p>
    ) : (
      <p>You are not logged in.</p>
    )
);

class Header extends Component {
  logout = () => {
    fakeAuth.signout()
    console.log('out')
  }
  render() {
    return (
      <div className="Header">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/signin">Signin</Link>
        <AuthButton />
      </div>
    );
  }
}

export default Header;
