import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom'
import { Input, Button, message } from 'antd';
import {fakeAuth} from '../../utils'

const api = 'http://localhost:8080/signin'
class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      username: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

 
  login = () => {
    const opt = {
      username: this.state.username,
      password: this.state.password,
    }
    fetch(api, {
      method: 'post',
      body: JSON.stringify(opt),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors'
    }).then(response => {
      response.json().then((json) => {
       if(json.success) {
         localStorage.setItem('token', json.token)
        fakeAuth.authenticate(() => {
          this.setState({redirectToReferrer: true})
        })
       } else{
        message.info(json.msg);
       }
      })
    }).catch(err => {
      message.info(err);
    })
  };
  handleChange(event) {
    const name = event.target.name
    this.setState({
      [name]: event.target.value
    });
  }
  render() {
    let { from } = this.props.location.state || { from: { pathname: "/" }};
    let { redirectToReferrer } = this.state;

    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <div className="signin">
        <p>You must log in to view the page at {from.pathname}</p>
        <Input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
        <Input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
        <Button type="primary" onClick={this.login}>Signin</Button>
        <Link to="/signup">Signup</Link>
      </div>
    );
  }
}

export default Signin;
