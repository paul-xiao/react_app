import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import { Input, Button, message } from 'antd';
import { connect } from 'react-redux'
import { userActions } from '../../store/actions'

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      username: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // login = () => {
  //   const opt = {
  //     username: this.state.username,
  //     password: this.state.password,
  //   }
  //   fetch(signup, {
  //     method: 'post',
  //     body: JSON.stringify(opt),
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     mode: 'cors'
  //   }).then(response => {
  //     response.json().then((json) => {
  //      if(json.successs) {
  //       message.info(json.msg);
  //      } else{
  //       message.info(json.message);
  //      }
  //     })
  //   }).catch(err => {
  //     message.info(err);
  //   })
  // };

  handleChange(event) {
    const name = event.target.name
    this.setState({
      [name]: event.target.value
    });
    console.log(this.state)
  }

  handleSubmit(event) {
    const user = {
          username: this.state.username,
          password: this.state.password,
       }
       console.log(this.state)
    this.props.signup(user)
  }
  render() {
    let { from } = this.props.location.state || { from: { pathname: "/" }};
    let { redirectToReferrer } = this.state;

    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <div className="signin">
        <Input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
        <Input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
        <Button type="primary" onClick={this.handleSubmit}>Signup</Button>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user ? state.user : {}
  }
}

const actionCreators = {
  signup: userActions.signup
}

export default connect(mapStateToProps, actionCreators)(Signup);
