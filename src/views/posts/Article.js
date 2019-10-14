import React, { Component } from 'react';
import IndexLayout from '../../components/layouts/IndexLayout';
import { $http } from '../../utils/api'
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: []
    };
  }
  componentDidMount() {
    const { id }  =  this.props.match.params
  $http.get('/test/'+ id).then(res => {
    console.log(res.data.title)
      this.setState({
        lists: res.data.title
      })
    })
  }
 
  
 
  render() {
    const { lists } = this.state
    return (
      <IndexLayout>
        <div className="article">
        <div dangerouslySetInnerHTML={{__html: lists}} className="article-content" />;
        </div>
      </IndexLayout>
    );
  }
}

export default Home;
