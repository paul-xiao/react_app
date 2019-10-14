import React, { Component } from 'react';
import IndexLayout from '../../components/layouts/IndexLayout';
import { $http } from '../../utils/api'
import List from '../../components/List'
import { Link } from 'react-router-dom'
class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: []
    };
  }

  componentDidMount() {
  $http.get('/test').then(res => {
      this.setState({
        lists: res.data
      })
    })
  }

 
  render() {
    const { lists } = this.state
    return (
      <IndexLayout>
        <div className="home">
          <h1>List</h1>
          <Link to="/create">New Post</Link>
          <List lists={lists}/>
        </div>
      </IndexLayout>
    );
  }
}

export default ArticleList;
