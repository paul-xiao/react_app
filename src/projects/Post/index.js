import React, { Component } from 'react';
import { $http } from '../../utils/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'


class Post extends Component {
   
  constructor(props) {
    super(props);
    this.state = {
        file: {},
        desc: '',
        content: '',
        files: [],
        tags: []
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
    //   e.target && e.target.files[0] && this.setState({
    //     file: e.target.files[0]
    // });

    if (e.target.files) {
      console.log(e.target.files)
      
      const data = e.target.files;
      const _this = this
      const {files} = this.state
      let arr = []
      if(data.length > 2) {
        alert("You can only upload a maximum of 2 files");
      } 

      if(data[0].type.includes('video')){
        const video = {
          type: 'video',
          url: URL.createObjectURL(data[0])
        }
        _this.setState({
          files:[
            ...files,
            video
          ]
        })
      } else{
        Object.values(data).forEach((file,index) => {
          const reader = new FileReader();

          reader.onload = function (event) {
            const image = {
              type: 'image',
              url: event.target.result
            }
            arr = [...arr, image]

            _this.setState({
              files:arr
            })
          }
  
          reader.readAsDataURL(e.target.files[index]);
        })
      }
    }
      
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
    
    handleHashTags = (e) => {
      const value = e.target.textContent.match(/(?:\s|^)#([^\s]+)/g)
     const {tags = []} = this.state
      // starts with white space and # , end with white space
      console.log(tags)
      console.log(value)

      // if((tags && value && (value.length - tags.length === 1))){
      //  const content = e.target.textContent.replace(/(?:\s|^)#([^\s]+)/g, '<span class="tag">$1</span>')
      //   this.setState({
      //     content: content
      //   })

      // }
      this.setState({
        tags: value
      })
    }
  
    handleUpload = () => {
     this.refs.myInput.click()
    }
    componentDidMount(){
      this.onGetPosts()
    }
    
    
  render(){
    const { files, content } = this.state
    const isVideoUploaded = files[0] && files[0].type === 'video'
    return (
      <div className="post">
        
        <div className="post-content">
           <div contentEditable="true" className="content-txt" suppressContentEditableWarning={true} onKeyUp={this.handleHashTags} dangerouslySetInnerHTML={{__html: content}}>
           </div>
           <div className="attch">
              <div className="preview">
                    {!isVideoUploaded && files.map((image, index) => {
                      return (
                        <div className="preview-img-item" key={index}>
                          <img src={image.url} alt=""/>
                        </div>
                      )
               
                    })}
                    {isVideoUploaded && <div className="preview-video-item">
                        <video preload="auto" autoplay="autoplay">
                           <source webkit-playsinline playsinline x-webkit-airplay x5-playsinline src={files[0].url} />
                        </video>
                    </div> 
                     }
                    {!isVideoUploaded && files.length < 9 &&
                       <div className="upload">
                      <FontAwesomeIcon icon={faCamera} onClick={this.handleUpload} />
                    </div>
                    }
               </div>
          </div>
          <input type="file" ref="myInput" className="file-upload" multiple="multiple" onChange={this.onUpdateFile}/>
        </div>
        <div className="post-category">
            <label htmlFor="">category:</label>
            <select name="" id="">
               <option value="">1</option>
               <option value="">2</option>
               <option value="">3</option>
               <option value="">4</option>
            </select>
        </div>
        <div className="post-options">
           <button variant="contained" color="primary" onClick={this.onSave}>Save</button>
        </div>  
      </div>
    );
  }
}

export default Post;
