import React, { Component } from 'react';
import { $http } from '../../utils/api'


class Post extends Component {
   
  constructor(props) {
    super(props);
    this.state = {
        file: {},
        spec: ''
    };
    this.onUpdateSpec = this.onUpdateSpec.bind(this)
    this.onUpdateFile = this.onUpdateFile.bind(this)
    this.onSave = this.onSave.bind(this)
  }
   onSave = (file, desc) => {

    const formData = new FormData({
        file: this.state.file,
        desc: this.state.desc,
    })
    console.log(file)
    console.log(desc)
    console.log(formData)
    // $http.post('/savepost/',{
    //  formData
    // }).then(res => {
    //   console.log(res)
    //   }).catch(err => {
    //     console.log(err)
    //   })
    }
    onUpdateFile = (e) => {
      e.target && e.target.files[0] && this.setState({
        file: e.target.files[0]
    });
      
    }
    onUpdateSpec = (e) => {
      this.setState({
          spec: e.target.value
      });
      console.log(this.state)
    }
    
  render(){
    const {file, desc} = this.state
    return (
      <div>
        <input type="file" onChange={this.onUpdateFile}/>
        <input type="text" placeholder="desc" onChange={this.onUpdateSpec}/>
        <button onClick={this.onSave(file, desc)}>Save</button>
  
      </div>
    );
  }
}

export default Post;
