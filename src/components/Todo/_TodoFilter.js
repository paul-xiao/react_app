import React from 'react'
import { connect } from 'react-redux'
import { Button, ButtonGroup } from '@material-ui/core'



const TodoFilter = ({set}) => {
        return (
           <div className="filter">
           <ButtonGroup color="primary" aria-label="outlined primary button group">
              <Button>All</Button>
              <Button>Completed</Button>
              <Button>Pending</Button>
            </ButtonGroup>
           </div>
        )
  }

  const mapStateToProps = state => {
      return {
         filter: state.visibilityFilter
      }
  }

export default connect(mapStateToProps)(TodoFilter);