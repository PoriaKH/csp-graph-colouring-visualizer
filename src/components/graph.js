import Graph from 'react-vis-network-graph'
import React, { useState } from "react";
import { Solve  } from '../logic/solve';

;
export var options = {

    physics: {
        enabled: true
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
        color: "yellow"
    },
    shadow: true,
    smooth: true,
    height: "900px"
}

function randomColor() {
  const red = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
  const green = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
  const blue = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
  return `#${red}${green}${blue}`;
}

export const Copied = () => {
    const [isSolve, setIsSolve] = useState(false)
    
    const createNode = (x, y) => {
        if(x == null || y == null){
            let width = 100
            let height = 100

            x = Math.random() * width
            y = Math.random() * height
        }
        const color = randomColor();
        setState(({ graph: { nodes, edges }, counter, ...rest }) => {
          const id = counter;
          const from = Math.floor(Math.random() * (counter - 1)) + 1;
          return {
            graph: {
              nodes: [
                ...nodes,                
                { id, label: `Node ${id}`, x, y , shape: "circle"}
              ],
              edges: [
                ...edges,                
              ]
            },
            counter: id + 1,
            ...rest
          }
        });
      }
      const [state, setState] = useState({
        counter: 5,
        graph: {
          nodes: [
            { id: 0, label: "Node 0", color: "#e04141", shape: "circle" },
            { id: 1, label: "Node 1", color: "#e09c41", shape: "circle"},
            { id: 2, label: "Node 2", color: "#e0df41", shape: "circle"},
            { id: 3, label: "Node 3", color: "#7be041", shape: "circle"},
            { id: 4, label: "Node 4", color: "#41e0c9", shape: "circle"}
          ],
          edges: [
            { from: 0, to: 1 },
            { from: 1, to: 2 },
            { from: 2, to: 3 },
            { from: 3, to: 0 },
            { from: 4, to: 0}
          ]
        },
        events: {
          select: ({ nodes, edges }) => {
            // alert("Selected node: " + nodes);
          },
          doubleClick: ({ pointer: { canvas } }) => {
            createNode(canvas.x, canvas.y);
          }
        }
      })

      const addEdge = (event) => {
            event.preventDefault();
            if(!(edge.node1 === null || edge.node2 === null || edge.node1 === "" || edge.node2 === "" || edge.node1 === undefined || edge.node2 === undefined || parseInt(edge.node1) < 0 || parseInt(edge.node2) < 0 || parseInt(edge.node1) >= state.counter || parseInt(edge.node2) >= state.counter || parseInt(edge.node1) === parseInt(edge.node2))){
              let exist_flag = false
              for(let e of state.graph.edges){
                if((e.from === parseInt(edge.node1) && e.to === parseInt(edge.node2)) || (e.from === parseInt(edge.node2) && e.to === parseInt(edge.node1))){
                  // edge has been already added
                  exist_flag = true
                  break
                }
              }
              if (!exist_flag){
            setState(({ graph: { nodes, edges }, counter, ...rest }) => {
                return {
                    graph: {
                      nodes: [
                        ...nodes,
                      ],
                      edges: [
                        ...edges,
                        {from: parseInt(edge.node1), to: parseInt(edge.node2)},
                      ]
                    },
                    counter: counter,
                    ...rest
                  }
            });
            setEdge({
              node1: "",
              node2: ""
            })
          }
        }
      }
      
          const [edge, setEdge] = useState({
            node1: "",
            node2: ""
        });
        const handleChangeEdge = (event) => {
            const name = event.target.name;
            const value = event.target.value;
            setEdge(values => ({...values, [name]: value}))
          }
        const solve = () => {            
            setIsSolve(true)            
        }
      const { graph, events } = state;
        if (!isSolve) {
            return (
              <>
                    <div className="topnav">
                    <button type="button" className="button button2" onClick={createNode}> Add Node </button>
                    <button type="button" className="button button3" onClick={solve}> Solve </button>
                    <div className="login-container">
                    <form onSubmit={addEdge}>
                        <label>
                        <input 
                            type="number" 
                            name="node1"
                            placeholder="node 1"
                            value={edge.node1 || ""}
                            onChange={handleChangeEdge}
                        />
                        </label>
                        <label>
                            <input 
                            type="number" 
                            name="node2" 
                            placeholder="node 2"
                            value={edge.node2 || ""} 
                            onChange={handleChangeEdge}
                            />
                            </label>
                        <input type="submit" className="button button4" value = "Add Edge" id="clk"/>‍‍
                    </form>
                    <div/>
                    </div>
                  </div>
                    <div>
                        <Graph 
                        graph={state.graph}
                        options={options} 
                        events={events} 
                        style={{ height: "640px" }} />
                    </div>
                    </>
            );
        }
        else{
            return(
                <Solve oldState={state}/>
            )
        }
}