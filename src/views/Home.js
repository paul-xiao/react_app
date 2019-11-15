import React, { Component } from 'react';
import IndexLayout from '../components/layouts/IndexLayout';
// import { $http } from '../utils/api'
import Chat from '../components/Chat';
class Home extends Component {
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

  }

 
  render() {
    return (
      <IndexLayout>
        <div className="container">
          <Chat />
        </div>
      </IndexLayout>
    );
  }
}

export default Home;
