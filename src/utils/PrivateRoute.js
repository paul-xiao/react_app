import React from 'react'
import fakeAuth from './fakeAuth'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {

  // Add your own authentication on the below line.
  const isAuthenticated = fakeAuth.isAuthenticated
 console.log(isAuthenticated)
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default PrivateRoute