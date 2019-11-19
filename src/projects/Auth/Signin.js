import React, { Component } from 'react';
import {Redirect, withRouter} from 'react-router-dom'
import { Button, Box, TextField} from '@material-ui/core';
import { connect } from 'react-redux'
import { userActions } from '../../store/actions';
class Signin extends Component {
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
    const name = event.target.id
    this.setState({
      [name]: event.target.value
    });
  }
  handleSubmit(event){
    event.preventDefault();
    const {username, password} = this.state
    this.props.signin({username, password})
  }
  componentDidMount() {
    localStorage.removeItem('token')
  }
  render() {
    let { from } = this.props.location.state || { from: { pathname: "/" }};
    let { redirectToReferrer } = this.state;

    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <div className="signin">
        <h1>SignIn</h1>
        <Box color="text.primary">
        <TextField
        id="username"
        label="Username"
        style={{ margin: 8 }}
        placeholder=""
        helperText=""
        fullWidth
        margin="normal"
        onChange={this.handleChange}
        value={this.state.username}
        InputLabelProps={{
          shrink: true,
        }}
      />
       <TextField
        id="password"
        label="Password"
        type="password"
        style={{ margin: 8 }}
        placeholder=""
        helperText=""
        fullWidth
        margin="normal"
        onChange={this.handleChange}
        value={this.state.password}
        InputLabelProps={{
          shrink: true,
        }}
      />
        </Box>
        <Box color="text.primary" style={{padding: '20px'}}>
          <Button variant="contained" color="primary" style={{'marginRight': '20px'}} onClick={this.handleSubmit}>Signin</Button>
          <Button variant="contained" href="/signup">signup</Button>
        </Box>
      </div>
    );
  }
}
const mapStateToProps = state =>{
  return {
    user: state.user,
    message: state.user.message
  }
}
const actionCreators = {
  signin: userActions.signin
}
export default withRouter(connect(mapStateToProps, actionCreators)(Signin));
