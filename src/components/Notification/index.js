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
  closeNotification = () => {
    console.log('closeNotification')
    this.setState({ open: false })
   // this.props.messages[0] && this.props.removeSnackbar(this.props.messages[0].key)
  }
  shouldComponentUpdate(nextProps, nextState) {
    // Only re-render when snackbar is going from closed to open
    console.log('nextProps.messages.length')
    console.log(nextProps.messages.length)
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
        message={'test'}
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
const mapDispatchToProps = dispatch => bindActionCreators({ removeSnackbar }, dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(Notification)