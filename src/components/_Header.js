import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import { userActions } from '../store/actions';
const AuthButton = withRouter(
  ({ history , ...props}) =>
  localStorage.getItem('token') ? (
      <span>
        Welcome! {props.name}
        <Button
         
          onClick={() => {
              history.push("/");
              clearToken();
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

class Header extends Component {
  componentDidMount(){
   this.props.getUserInfo()
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
        <AuthButton name={this.props.userInfo.username}/>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
 return {
  userInfo: state.user.userInfo
 }
}
const actionCreator = {
  getUserInfo: userActions.getUserInfo
}

export default connect(mapStateToProps, actionCreator)(Header);
