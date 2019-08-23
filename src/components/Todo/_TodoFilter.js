import React from 'react'
import { connect } from 'react-redux'

const TodoFilter = ({set}) => {
        return (
           <div className="filter">
           <button>all</button>
           <button>completed</button>
           <button>incompleted</button>
           </div>
        )
  }

  const mapStateToProps = state => {
      return {
         filter: state.visibilityFilter
      }
  }

export default connect(mapStateToProps)(TodoFilter);