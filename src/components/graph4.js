// import Graph from "react-graph-vis";
import Graph from 'react-vis-network-graph'
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { edges, nodes } from './data';
import { Solve  } from '../logic/solve';
// const options = {
//   layout: {
//     hierarchical: false
//   },
//   edges: {
//     color: "#000000"
//   }
// };
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
        // arrowStrikethrough: false,
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
          const id = counter + 1;
          const from = Math.floor(Math.random() * (counter - 1)) + 1;
          return {
            graph: {
              nodes: [
                ...nodes,
                // { id, label: `Node ${id}`, color, x, y , shape: "circle"}
                { id, label: `Node ${id}`, x, y , shape: "circle"}
              ],
              edges: [
                ...edges,
                //{ from, to: id }
              ]
            },
            counter: id,
            ...rest
          }
        });
      }
      const [state, setState] = useState({
        counter: 4,
        graph: {
          nodes: [
            { id: 0, label: "Node 0", color: "#e04141" },
            { id: 1, label: "Node 1", color: "#e09c41" },
            { id: 2, label: "Node 2", color: "#e0df41" },
            { id: 3, label: "Node 3", color: "#7be041" },
            // { id: 4, label: "Node 4", color: "#41e0c9" }
          ],
          edges: [
            { from: 0, to: 1 },
            { from: 1, to: 2 },
            { from: 2, to: 3 },
            { from: 3, to: 0 }
          ]
        },
        events: {
          select: ({ nodes, edges }) => {
            console.log("Selected nodes:");
            console.log(nodes);
            console.log("Selected edges:");
            console.log(edges);
            // alert("Selected node: " + nodes);
          },
          doubleClick: ({ pointer: { canvas } }) => {
            createNode(canvas.x, canvas.y);
          }
        }
      })

      const addEdge = (event) => {
            event.preventDefault();
            setState(({ graph: { nodes, edges }, counter, ...rest }) => {
                console.log("Here")
                return {
                    graph: {
                      nodes: [
                        ...nodes,
                        // { id, label: `Node ${id}`, color, x, y , shape: "circle"}
                      ],
                      edges: [
                        ...edges,
                        {from: edge.node1, to: edge.node2},
                      ]
                    },
                    counter: counter,
                    ...rest
                  }
            });
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
            console.log("What about here")
            setIsSolve(true)
            // Solve( state );
        }
      const { graph, events } = state;
        if (isSolve == false) {
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
                <button type="button" onClick={createNode}> add node </button>
                <button type="button" onClick={solve}> Solve </button>
                    </div>
                    <div>
                        <Graph 
                        graph={graph}
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
                // <>
                // <div className="App">
                //     <h2> We Reached else</h2>
                // </div>
                // </>
            )
        }
}

// ReactDOM.render(
//   <App />,
//   document.getElementById("root")
// );