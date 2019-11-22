import React, {useEffect, useState, useRef, } from 'react';
import ForceGraph3D from '3d-force-graph';
import MdClose from 'react-ionicons/lib/MdClose'


const data = JSON.parse(localStorage.getItem('graphData')) || {
  nodes: [],
  links: []
}
const myGraph = ForceGraph3D();

const drawChart = () => {
      myGraph(document.getElementById('chart'))
          .graphData(data)
          .nodeLabel('id')
          // .backgroundColor('#FFF')
        .nodeAutoColorBy('group')
        .onNodeClick(node => {
          // Aim at node from outside it
          const distance = 40;
          const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);
          myGraph.cameraPosition(
            { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
            node, // lookAt ({ x, y, z })
            3000  // ms transition duration
          );
      });

    }
const focusNode = (myGraph, filter) => {
 if(filter) {
  const { nodes } = myGraph.graphData();
  const filteredNodes = nodes.filter(item => item.id === filter)
  const distance = 40;
  filteredNodes.forEach(node => {
    const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);
    myGraph.cameraPosition(
      { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
      node, // lookAt ({ x, y, z })
      3000  // ms transition duration
    );
  })
  
 }
}

const addNode = (node, target, group) => {
  const { nodes, links } = myGraph.graphData();

  myGraph.graphData({
    nodes: [...nodes, { id: node, group: group }],
    links: target ? [...links, {source: node, target: target} ] : [...links]
  });
  const filteredData = {
    nodes: myGraph.graphData().nodes.map(item => {const {id, group} = item; return {id, group} }),
    links: myGraph.graphData().links.map(item => {
      const {source, target} = item; 
      const linksource = source.id || source; const linktarget = target.id || target;
      return {source:linksource, target:linktarget}
      })
  }
  localStorage.setItem('graphData', JSON.stringify(filteredData))

}

const Tree = () => {
    return (
      <div id="chart"></div>
    )
}


function Mind(props) {

    const isMounted = useRef(false);
   
    const [search, setSearch] = useState('')
    const [node, setNode] = useState('')
    const [category, setCategory] = useState('')
    const [target, setTarget] = useState('')
    const [targets, setTargets] = useState([])
    const [dialog, setDialog] = useState('')


    
    const handleInput = (e) => {
      const {value} = e.target
      setSearch(value)
    }
    const handleNodeInput = (e) => {
      const {value} = e.target
      setNode(value)
    }
    const handleTargetSelect = (e) => {
      const {value} = e.target

      setTarget(value)
    }
    const handleCategorySelect = (e) => {
      const {value} = e.target
      setCategory(value)
    }
    const handleSubmit = () => {
      addNode(node, target, category)
      setTargets([
        ...targets,
        node
      ])
    }

    const initTargets = () => {
      const {nodes} = data
      let arr = nodes.map(node => node.id)
      setTargets(arr)
    }
   
    const resizeGraph = () => {
      myGraph.width(document.body.clientWidth).height(document.body.clientHeight)
    }
    useEffect(() => {
     
      if(!isMounted.current){
        drawChart()
        initTargets()
         window.addEventListener('resize', function(){
           resizeGraph()
         })

      }else {
        focusNode(myGraph, search)
      }
      isMounted.current = true
      return () => window.removeEventListener('resize', function(){
        resizeGraph()
       });

    }, [search, targets]);

    const showDialog = (e) => {

      setDialog(e.target.name)
       
    }

    return (
        <div className="container">
         <div className="navs">
           <button name="add" onClick={showDialog}>Add</button>
           <button name="search" onClick={showDialog}>Search</button>
         </div>         
        <Tree />
        <div className={'search-box' + (dialog === 'search' ? ` show-${dialog}` : '')}>
        <input type="text" placeholder="input node name" value={search} onChange={handleInput}/>
        <MdClose className="search-close" onClick={showDialog} fontSize="30px" color="#777" />

        </div>
        <div className={'add-node' + (dialog === 'add' ? ` show-${dialog}` : '')}>
          <div className="node-name form-item">
            <label htmlFor="">Nodename</label>
          <input type="text" value={node} onChange={handleNodeInput}/>
          </div>
          <div className="node-category form-item">
          <label htmlFor="">Category</label>
           <input type="text" value={category} onChange={handleCategorySelect} />
          </div>
          <div className="node-category form-item">
          <label htmlFor="">target</label>
           <select value={target} onChange={handleTargetSelect}>
               <option value="">None</option>
              {targets.length > 0 && targets.map((target,index) => {
                return (
                  <option value={target} key={index}>{target}</option>
                )
              })}
           </select>
          </div>
          <div className="desc form-item">
            <textarea name="" id="" cols="20" rows="5" placeholder="descriptions">
            
            </textarea>
          </div>
          <div className="submit form-item">
            <button onClick={showDialog}>Close</button>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
        </div>
    );
}

export default Mind;