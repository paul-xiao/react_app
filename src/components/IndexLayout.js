import React from 'react'
import Header from './Header'

class IndexLayout extends React.Component {
   render() {
    return (
        <div className="index-layout">
            <Header />
           {this.props.children}
        </div>
    )
   }
}

export default IndexLayout