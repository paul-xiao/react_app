import React, { useState } from 'react';

function Post(props) {
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        tags: '',
        content: ''
    })
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData({[name]: value})
    }
   
    const handleSubmit = () => {
      
      }

    return (
        <div className="post">
          <div className="node-name form-item">
            <label htmlFor="">Nodename</label>
          <input type="text" value={formData.title} onChange={handleChange}/>
          </div>
          <div className="node-category form-item">
          <label htmlFor="">Category</label>
           <input type="text" value={formData.category} onChange={handleChange} />
          </div>
          <div className="node-category form-item">
          <label htmlFor="">target</label>
           {/* <select value={formData.tags} onChange={handleChange}>
               <option value="">None</option>
              {targets.length > 0 && targets.map((target,index) => {
                return (
                  <option value={target} key={index}>{target}</option>
                )
              })}
           </select> */}
          </div>
          <div className="desc form-item">
            <textarea name="desc" cols="20" rows="5" placeholder="descriptions" value={formData.desc} onChange={handleChange}></textarea>
          </div>
          <div className="submit form-item">
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
    );
}

export default Post;