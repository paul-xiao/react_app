import React, { Component } from 'react';
import { $http } from '../../utils/api'
import { Input, Button, Box } from '@material-ui/core';



class Post extends Component {
   
  constructor(props) {
    super(props);
    this.state = {
        file: {},
        desc: '',
        postList: []
    };
    this.onUpdateDesc = this.onUpdateDesc.bind(this)
    this.onUpdateFile = this.onUpdateFile.bind(this)
    this.onSave = this.onSave.bind(this)
    this.onGetPosts = this.onGetPosts.bind(this)
    this.onDelPost = this.onDelPost.bind(this)
  }
   onSave = (e) => {
    e.preventDefault();
    let formData = new FormData()
    console.log(this.state.file)
    formData.append('file', this.state.file)
    formData.append('desc', this.state.desc)
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    $http.post('/savepost/', formData, config).then(res => {
      this.onGetPosts()
      }).catch(err => {
        console.log(err)
      })
    }
    onUpdateFile = (e) => {
      e.target && e.target.files[0] && this.setState({
        file: e.target.files[0]
    });
      
    }
    onUpdateDesc = (e) => {
      this.setState({
          desc: e.target.value
      });
    }

    onGetPosts = () => {
      $http.get('/getpost').then(data => {
        console.log(data.data)
        this.setState({
          postList: data.data
        })
      }).catch(err => {
        console.log(err.message || 'get post fail')
      })
    }
    onDelPost = (id) => {
      $http.delete(`/delpost/${id}`).then(res => {
        this.onGetPosts()
      })
    }
    componentDidMount(){
      this.onGetPosts()
    }
    
    
  render(){
    const { postList } = this.state
    return (
      <div>
        <div className="post-list">
        {postList && postList.map(item => {
             return (
               <div className="post-item" key={item.id}>
                {item.contentType.split('/')[0] === 'image' ?
                  <img src={item.url} alt=""/> : <audio src={item.url} controls></audio>
                }
                 <p>{item.desc}         
                   <Button variant="contained" color="secondary" style={{'marginLeft': '40px'}} onClick={() => this.onDelPost(item.id)}>Del</Button>
                 </p>
               </div>
             )
        })}
        </div>
        <div className="post-upload">
        <Box>
        <Input type="file" onChange={this.onUpdateFile}/>
        </Box>
        <Box style={{'marginTop': '40px'}}>
        <Input type="text" placeholder="desc" onChange={this.onUpdateDesc}/>
        <Button variant="contained" color="primary" style={{'marginLeft': '40px'}} onClick={this.onSave}>Save</Button>
        </Box>
        </div>
  
      </div>
    );
  }
}

export default Post;
