import React, { Component } from 'react';
import IndexLayout from '../components/layouts/IndexLayout';


class Home extends Component {
  render() {
    return (
      <IndexLayout>
        <div className="home">
           <h1>Home</h1>
        </div>
      </IndexLayout>
    );
  }
}

export default Home;
