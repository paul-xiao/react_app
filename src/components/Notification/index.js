import React, { Component } from 'react'
import { Snackbar } from '@material-ui/core'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import {removeSnackbar, closeSnackbar} from '../../store/actions/_snackbar.actions'
class Notification extends Component {
  constructor(props) {
    super(props)
    this.state = { open: false }
  }
  closeNotification = () => {
    this.setState({ open: false })
    this.props.messages[0] && this.props.closeSnackbar()
    this.props.messages[0] && this.props.removeSnackbar(this.props.messages[0].key)
  }
  shouldComponentUpdate(nextProps, nextState) {
    // Only re-render when snackbar is going from closed to open
    if(nextProps.messages.length > 0 && !this.state.open){
      return !this.state.open
    } else {
      return false
    }
      
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.messages.length === 0 && !this.state.open){
      this.setState({ open: true })
    }
  }

  render() {
    return (
      <Snackbar
        open={this.state.open}
        anchorOrigin={{ vertical:'top', horizontal: 'center' }}
        key={`top,center`}
        message={this.props.messages[0] && this.props.messages[0].message}
        autoHideDuration={3000}
        onClose={this.closeNotification}
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
const mapDispatchToProps = dispatch => bindActionCreators({ closeSnackbar, removeSnackbar }, dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(Notification)