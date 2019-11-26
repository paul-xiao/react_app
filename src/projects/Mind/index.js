import React, {useEffect, useState, useRef, } from 'react';
import ForceGraph3D from '3d-force-graph';
import {$http} from '../../utils/api';
import moment from 'moment';

const myGraph = ForceGraph3D();

const drawChart = (data) => {
      myGraph(document.getElementById('chart'))
          .graphData(data)
          .nodeLabel(node => {
            return node.innerHTML = `<h1>${node.id}</h1>`
          })
          //.backgroundColor('#FFF')
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
      })
      .onNodeRightClick((node, event) => {
        alert('rightClicked'+ node)

        return false 
      });

    }
const focusNode = (myGraph, filter) => {
  console.log(filter)
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

const addNode = (node, target, group, desc) => {
  const { nodes, links } = myGraph.graphData();
  $http.post('/graph/add',{
    nodename: node,
    category: group,
    target,
    desc
  }).then(data => {
    console.log(data)
  })
  myGraph.graphData({
    nodes: [...nodes, { id: node, group: group }],
    links: target ? [...links, {source: node, target: target} ] : [...links]
  });
}

const Tree = () => {
    return (
      <div id="chart"></div>
    )
}

const Desc = ({nodeInfo}) => {
  const {data, status} = nodeInfo
    return (
      <div id="desc" className={status ? 'show': ''}>
       {data.desc && <div className="desc-content">
        <div className="desc-title">{data.nodename} <span className="desc-date">{moment(new Date(data.createdAt).getTime()).format('MMMM Do YYYY, h:mm:ss a')}</span></div>
        <div className="desc-detail">
        {data.desc}
        </div>
       </div>}
      </div>
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
    const [desc, setDesc] = useState('')
    // nodeInfo
    const [nodeInfo, setNodeInfo] = useState({
      data: '',
      status: false
    })
    const graphData = {
        nodes: [],
        links: []
      }


    
    const initGraph = () => {
       $http.get('/graph').then(({data}) => {
         const graph = {
          nodes:data.map(item => {return {id: item.nodename, group: item.category}}),
          links:data.filter(item => item.target).map(item => {return {source: item.nodename, target: item.target}}),
         }
         drawChart(graph)
         setTargets(data.map(item => item.nodename))

       })
    }

    const getNodeInfo = (nodename) => {
      $http.get(`graph/${nodename}`).then(({data}) => {
       if(data.desc) {
        setNodeInfo({
          data: data,
          status: true
        })
       } else {
        setNodeInfo({
          data: data,
          status: false
        })
       }
      })
    }
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
    const handleDescInput = (e) => {
      const {value} = e.target
      setDesc(value)
    }
    const handleSubmit = () => {
      addNode(node, target, category, desc)
      setTargets([
        ...targets,
        node
      ])
    }

    const initTargets = () => {
      const {nodes} = graphData
      let arr = nodes.map(node => node.id)
      setTargets(arr)
    }
   
    const resizeGraph = () => {
      myGraph.width(document.body.clientWidth).height(document.body.clientHeight)
    }
    useEffect(() => {
     
      if(!isMounted.current){
        initGraph()
        initTargets()
         window.addEventListener('resize', function(){
           resizeGraph()
         })
      }
      isMounted.current = true
      return () => window.removeEventListener('resize', function(){
        resizeGraph()
       });

    }, [search, targets, nodeInfo]);

    const showDialog = (e) => {

      setDialog(e.target.name)
       
    }
    const handleSearch = (e) => {
      if(e.key === 'Enter') {
        focusNode(myGraph, search)
        getNodeInfo(search)
      }   
    }

    return (
        <div className="container">
         <div className="navs">
           <button name="add" onClick={showDialog}>Add</button>
           <button name="search" onClick={showDialog}>Search</button>
         </div>         
        <Tree />
        <Desc nodeInfo={nodeInfo}/>
        <div className={'search-box' + (dialog === 'search' ? ` show-${dialog}` : '')}>
        <input type="text" placeholder="input node name" value={search} onChange={handleInput} onKeyPress={handleSearch}/>
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
            <textarea name="desc" cols="20" rows="5" placeholder="descriptions" value={desc} onChange={handleDescInput}>
            
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