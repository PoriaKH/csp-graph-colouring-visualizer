import React from 'react'
import { useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
// import { uuid } from 'uuidv4';
// import { v4 as uuidv4 } from "uuid";


// const myData = {
//     nodes: [{ id: 'a' }, { id: 'b' }, { id: 'c' }],
//     links: [
//       { source: 'a', target: 'b' },
//       { source: 'c', target: 'a' }
//     ]
//   };
  
//   export function Home() {
//     return <NoSSRForceGraph graphData={myData} />;
//   }
export function GraphView2() {
    const [nodeCounter, setNodeCounter] = useState(0)
    const [nodes, setNodes] = useState([
        { id: 'a' }, 
        { id: 'b' }, 
        { id: 'c' }
    ]);
    const [links, setLinks] = useState([]);

    const [myData, setMyData] = useState({
        nodes: nodes,
        links: links,
    });

    const addNode = () => {
        console.log("nodesCounter = ", nodeCounter)
        setNodeCounter(nodeCounter + 1)
        let newElement = {id: nodeCounter, label: "Node " + nodeCounter, title: "node tooltip " + nodeCounter, shape: "circle"}
        setNodes([...nodes, newElement]);
        // setNodes([...nodes, newElement2]);
        setMyData({
            nodes: nodes,
            links: links
        })
      }

//     const myData = {
//     nodes: [{ id: 'a' }, { id: 'b' }, { id: 'c' }],
//     links: [{ source: 'a', target: 'b' },{ source: 'c', target: 'a' }]
//   };
  return (
    <>
    <div className='App'>
       {/* <>
          <h2>Add Edge !</h2>
          <form onSubmit={addEdge}>
            <label>Node 1:
              <input 
                type="number" 
                name="node1"
                value={edge.node1 || ""}
                onChange={handleChangeEdge}
              />
            </label>
            <label>Node 2:
                <input 
                type="number" 
                name="node2" 
                value={edge.node2 || ""} 
                onChange={handleChangeEdge}
                />
                </label>
            <input type="submit" />‍‍
          </form>
        </> */}
      <p> this is a paragraf</p>
      {/* <p> num of nodes is {nodeCounter}</p> */}
      <button type="button" onClick={addNode}> add node</button>
    </div>
    <div className='App'>
        <p> num of nodes is {nodeCounter}</p>
        <ForceGraph2D
        graphData={myData}
        // key={uuidv4}
        />
    </div>
    </>
  );
    // return(
    //     <ForceGraph2D
    //     graphData={myData}
    //     />
    // )
}