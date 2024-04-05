import React from 'react'
import Graph from 'react-vis-network-graph'
import { v4 as uuidv4 } from "uuid";
// import ReactDOM from "react-dom";
// import Graph from "react-graph-vis";
// import "./styles.css";
// import "./network.css";
import { useState } from 'react';
import { useEffect } from 'react';
// import uuid from "react-uuid";

export var options = {

    physics: {
        enabled: false
    },
    interaction: {
        navigationButtons: true
    },
    nodes: {
        borderWidth: 2,
        size: 40,
        color: {
            border: "#222222",
            background: "#666666"
        },
        font: {color: "yellow"}
    },
    edges: {
        arrows: {
            to: {
            enabled: false,
            imageHeight: undefined,
            imageWidth: undefined,
            scaleFactor: 1,
            src: undefined,
            type: "arrow"
            }
        },
        // arrowStrikethrough: false,
        color: "yellow"
    },
    shadow: true,
    smooth: true,
    height: "900px"
}

// export function addNode(){
    
//     // graph.nodes.push({id: 12, label: "Node 12", title: "node 2 tooltip text", shape: "star"})
//     return (
//         <div className='container'>
//             <Graph 
//                 graph={graph}
//                 options={options}
//             />
//         </div>
//       )
//     // alert("Great Choice!");
// }
export function GraphView() {
    // const [nodes, setNodes] = useState({
    //     nodes: [
    //         {id: 1, label: "Node 1", title: "node 1 tooltip text"},
    //         {id: 2, label: "Node 2", title: "node 2 tooltip text", shape: "circle"},
    //         {id: 3, label: "Node 3", title: "node 3 tooltip text"},
    //         {id: 4, label: "Node 4", title: "node 4 tooltip text"},
    //         {id: 5, label: "Node 5", title: "node 5 tooltip text"},
    //         {id: 6, label: "Node 6", title: "node 6 tooltip text"},
    //         {id: 7, label: "Node 7", title: "node 7 tooltip text"},
    //         {id: 8, label: "Node 8", title: "node 8 tooltip text"},
    //         {id: 9, label: "Node 9", title: "node 9 tooltip text"}
    //     ]
    // });
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [graph, setGraph] = useState({
        nodes: {nodes},
        edges: {edges}
    });
    const [nodeCounter, setNodeCounter] = useState(0)

    const addNode = () => {
        console.log("nodesCounter = ", nodeCounter)
        // alert("Hey")
        setNodeCounter(nodeCounter + 1)
        let newElement = {id: nodeCounter, label: "Node " + nodeCounter, title: "node tooltip " + nodeCounter, shape: "circle"}
        setNodes([...nodes, newElement]);
        setGraph({
            nodes: nodes,
            edges: edges,
        })
      }
    // const addEdge = () => {
    //     newElement = 
    //     setEdges(edges => [...edges, newElement]);
    // }
    // var graph = {
    //     nodes: [
    //         {id: 1, label: "Node 1", title: "node 1 tooltip text"},
    //         {id: 2, label: "Node 2", title: "node 2 tooltip text", shape: "circle"},
    //         {id: 3, label: "Node 3", title: "node 3 tooltip text"},
    //         {id: 4, label: "Node 4", title: "node 4 tooltip text"},
    //         {id: 5, label: "Node 5", title: "node 5 tooltip text"},
    //         {id: 6, label: "Node 6", title: "node 6 tooltip text"},
    //         {id: 7, label: "Node 7", title: "node 7 tooltip text"},
    //         {id: 8, label: "Node 8", title: "node 8 tooltip text"},
    //         {id: 9, label: "Node 9", title: "node 9 tooltip text"}
    //     ],
    //     edges: [
    //         {from: 1, to: 1, smooth: {type: "curvedCW"}, arrows: {from: {enabled: true, type: "circle"}, to: {enabled: true, type: "circle"}}},
    //         {from: 1, to: 7, arrows: {from: {enabled: false, type: "vee"}, to: {enabled: false, type: "vee"}}},
    //         {from: 1, to: 3, arrows: {to: {enabled: true, type: "curve"}}},
    //         {from: 6, to: 5, color: {highlight: "#fff", opacity: 0.2}},
    //         {from: 6, to: 2},
    //         {from: 7, to: 2},
    //         {from: 6, to: 7},
    //         {from: 6, to: 8},
    //         {from: 7, to: 8},
    //         {from: 8, to: 2},
    //         {from: 3, to: 7},
    //     ]
    // }
//set Edge
    const [edge, setEdge] = useState({
        node1: "",
        node2: ""
    });
// set Edge


//Add Edge
    const addEdge = (event) => {
    //     event.preventDefault();
    //     let newElement = {from: edge.node1, to: edge.node2}
    //     setEdges([...edges, newElement]);
    //     setGraph({
    //         nodes: nodes,
    //         edges: edges
    //     })
    //     // setGraphKey(nodeCounter)
    //     // alert(`added`);
    //     // newFunc()
      }
//

      const handleChangeEdge = (event) => {
        // const name = event.target.name;
        // const value = event.target.value;
        // setEdge(values => ({...values, [name]: value}))
      }
    
  return (
    <>
    <div className='App'>
    <>
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
        </>
      <p> this is a paragraf</p>
      {/* <p> num of nodes is {nodeCounter}</p> */}
      <button type="button" onClick={addNode}> add node</button>
    </div>
    <div className='container'>
        <p> num of nodes is {nodeCounter}</p>
        <Graph 
            graph={graph}
            options={options}
        />
    </div>
    </>
  );
}