import React, { Component } from 'react';
import {IndexLayout, List, Archive} from '../../components'
class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: []
    };
  }

  componentDidMount() {
  // $http.get('/test').then(res => {
  //     this.setState({
  //       lists: res.data
  //     })
  //   })
    const fakeData = [{

      id: '1', 
      title: 'test',
       abstract: '2', 
       nickname: 'paul'
    },{

      id: '2', 
      title: 'test',
       abstract: '2', 
       nickname: 'paul'
    },{

      id: '3', 
      title: 'test',
       abstract: '2', 
       nickname: 'paul'
    },{

      id: '4', 
      title: 'test',
       abstract: '2', 
       nickname: 'paul'
    }]

    this.setState({
      lists : fakeData
    })
  }

 
  render() {
    const { lists } = this.state
    return (
      <IndexLayout>
          <List lists={lists}/>
          <Archive />
      </IndexLayout>
    );
  }
}

export default ArticleList;
