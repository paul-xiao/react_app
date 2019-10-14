import React from 'react'
import {Link} from 'react-router-dom'


class List extends React.Component {
   render() {
    return (
        <div className="list">
            {this.props.lists.map(list => {
              const {id, title, abstract, nickname } = list;
              return (
                <div key={id} className="list-item">
                  <div className="title">
                  <Link to={'/article/' + id}>{title}</Link>
                  </div>
                  <div className="abstract">{abstract}</div>
                  <div className="source"><span>{nickname}</span></div>
                </div>
              );
            })}
        </div>
    )
   }
}

export default List