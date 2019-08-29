import React, { Component } from 'react'
import { Snackbar } from '@material-ui/core'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import {removeSnackbar} from '../../store/actions/_snackbar.actions'
class Notification extends Component {
  constructor(props) {
    super(props)
    this.state = { open: false }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Only re-render when snackbar is going from closed to open
    console.log(this.props)
    return !this.state.open && nextState.open;
  }

  closeNotification = () => {
    this.setState({ open: false })
    this.props.removeSnackbar()
  }

  render() {
    return (
      <Snackbar
        open={this.state.open}
        message={'test'}
        autoHideDuration={4000}
        onRequestClose={this.closeNotification}
      />
    )
  }
}
// clearstate
const mapStateToProps = state => {
    return {
       messages: state.snackbar.notifications
    }
}
const mapDispatchToProps = dispatch => bindActionCreators({ removeSnackbar }, dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(Notification)