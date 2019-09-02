import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom'
import {Button, IconButton, Menu, MenuItem} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { connect } from 'react-redux'
import { userActions } from '../store/actions';
const AuthButton = withRouter(
  ({ history , ...props}) =>
  localStorage.getItem('token') ? (
      <span>
        <span
         
          onClick={() => {
              history.push("/");
              clearToken();
          }}
        >
          Sign out
        </span>
      </span>
    ) : (
      <p>You are not logged in.</p>
    )
);
const clearToken = () => {
  localStorage.removeItem('token')
}


class Header extends Component {
  state = {
    anchorEl: null,
    menuId: 1,
    isMenuOpen: false
  }
  handleMenuClose = () =>{
    this.setState({
      anchorEl: null,
      isMenuOpen: false
    });
  }
  handleMenu = (event) =>{

    this.setState({
      anchorEl: event.currentTarget,
      isMenuOpen: true
    });
    console.log(this.state)

  }
  componentDidMount(){
   this.props.getUserInfo()
  }
  render() {
    return (
      <div className="header">
        <div className="logo">
           <span>PX</span>
        </div>
        <div className="nav">
          <div className="nav-item">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={this.handleMenu}
            color="inherit">
            <AccountCircle />
          </IconButton>           
            <Menu
              anchorEl={this.state.anchorEl}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              id={this.state.menuId}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={this.state.isMenuOpen}
              onClose={this.handleMenuClose}
            >
            <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
            <MenuItem onClick={this.handleMenuClose}><AuthButton /></MenuItem>
          </Menu>
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
