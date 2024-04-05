// import "./styles.css";
import React, { useEffect, useState } from "react";
// // import Graph from "react-graph-vis";
import Graph from 'react-vis-network-graph'
function RelationGraph1() {
  const [network, setNetwork] = useState(null);
  const [graph, setGraph] = useState({
    nodes: [
      {
        id: 1,
        label: "Node 1",
        title: ""
      },
      { id: 2, label: "Node 2", title: "" },
      { id: 3, label: "Node 3", title: "" },
      { id: 4, label: "Node 4", title: "" },
      { id: 5, label: "Node 5", title: "" }
    ],
    edges: [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 5 }
    ]
  });

  const options = {
    layout: {
      hierarchical: false
    },
    edges: {
      color: "#1D1D1D"
    },
    interaction: {
      hover: true,
      navigationButtons: true,
      tooltipDelay: 0
    },
    nodes: {
      borderWidth: 0,
      borderWidthSelected: 0,
      color: "#0262C4",
      shape: "circle",
      size: 1,
      shadow: {
        enabled: true,
        color: "rgba(0,0,0,0.5)",
        size: 10,
        x: 5,
        y: 5
      },
      font: {
        color: "#fff",
        size: 13,
        bold: {
          mod: "bold"
        }
      }
    }
  };
  const events = {
    select: function(event) {
    //   var { graph.nodes, graph.edges } = event;
    }
  };

//   const events = {
//     hoverNode: (e) => {
//       const data = graph.nodes.map((el) => {
//         if (el.id === e.node) return { ...el, label: "sample node name" };
//         else return el;
//       });

//       const temp = { ...graph };
//       temp.nodes = data;
//       setGraph(temp);

//     },
//     select: function (event) {
//       var { nodes, edges } = event;
//       console.log("Selected nodes:");
//       console.log(nodes);
//       console.log("Selected edges:");
//       console.log(edges);
//     },
//     // showPopup: (id) => {
//     //   // node id
//     //   // const data = graph.nodes.map((el) => {
//     //   //   if (el.id === id) {
//     //   //     el.label = `sample node name`;
//     //   //   }
//     //   //   return el;
//     //   // });
//     //   // setGraph({ ...graph, nodes: data });
//     // }
//   };

  return (
    <Graph
      graph={graph}
      options={options}
      events={events}
      style={{ height: "450px" }}
    //   getNetwork={(network) => {
    //     console.log(network);
    //     setNetwork(network);
    //     //  if you want access to vis.js network api you can set the state in a parent component using this property
    //   }}
    />
  );
}

export function NewAPP() {
  return (
    <div className="container">
      <RelationGraph1 />
    </div>
  );
}
