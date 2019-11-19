import React, { Component } from 'react';
import {Redirect, withRouter} from 'react-router-dom'
import { Input, Button, Box } from '@material-ui/core';
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
    this.props.signup(user)
  }
  render() {
    let { from } = this.props.location.state || { from: { pathname: "/" }};
    let { redirectToReferrer } = this.state;

    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <div className="signin">
       <h1>SignUp</h1>
       <Box color="text.primary">
          <Input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
          <Input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
        </Box>
        <Box color="text.primary" style={{padding: '20px'}}>
          <Button variant="contained" color="primary"  onClick={this.handleSubmit}>SignUp</Button>
        </Box>
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

export default withRouter(connect(mapStateToProps, actionCreators)(Signup));
