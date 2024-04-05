import React, { useState } from "react";
import Graph from 'react-vis-network-graph'
import { options } from "../components/graph4";

let old_state = {}
let start_variables = []
let neighbours = [[]]

let colors = 1
let real_colors = Infinity

let isSolved = false

// state.push([null, [1, 2, 3]])
// state.pop(0)

function set_start_variables(){
    for(let node of old_state.graph.nodes){
        let color_array = []
        for (let color = 0; color < colors; color++){
            color_array.push(color + 1)
        }
        console.log("node = ", node)
        start_variables.push([null, color_array])
    }
    // // temp
    // start_variables[3][1].push(555)
    // // 
    console.log("old_stateeeee = ", old_state)
    console.log("start_variables = ", start_variables)
}

function set_neighbours(){
    for (let node of old_state.graph.nodes){
        console.log("node = ", node)
        neighbours.push([])
    }
    console.log("neighbours = ", neighbours)
    for (let edge of old_state.graph.edges){
        console.log("edge = ", edge)
        if(!neighbours[edge.from].includes(edge.to)){
            neighbours[edge.from].push(edge.to);
        }
        if(!neighbours[edge.to].includes(edge.from)){
            neighbours[edge.to].push(edge.from);
        }
    }
}


export function test_function(){
    // const[state, setState] = useState(start_variables)
    // let new_State = state
    // console.log("From test_function start_variables=  ", start_variables)
    // console.log("From test_function() start_variables[0]=  ", start_variables[0])
    // console.log("From test_function() before start_variables=  ", start_variables)
    minimum_remaining_variable(start_variables)
    // console.log("From test_function() after start_variables=  ", start_variables)
}
function minimum_remaining_variable( [...state] ){
    let indexes = []
    let flag = []
    for(let i = 0; i < state.length + 1; i++){
        flag.push(1);
    }

    for (let s1 = 0; s1 < state.length; s1++){
        let min = Infinity
        let index = -1
        console.log("s1 = ", s1)
        for(let s2 = 0; s2 < state.length; s2++){
            if(flag[s2] === -1 || state[s2][0] !== null){
                continue
            }
            console.log("state[s2][1].length = ", state[s2][1].length)
            if(state[s2][1].length <= min){
                min = state[s2][1].length
                index = s2
            }
            if(state[s2][1].length === min){
                index = s2
            }
        }
        flag[index] = -1
        if(index !== -1){
            indexes.push(index)
        }
    }
    console.log("indexes = ", indexes)
    return indexes
    // console.log("From minimum_remaining_variale() state =  ", state)
    // console.log("From minimum_remaining_variale() state.length() =  ", state.length)
    
}
function least_constraining_value( [...state] ){
    let sorted_vals = state
    for(let s1 = 0; s1 < state.length; s1++){
        if(state[s1][0] !== null){
            continue
        }
        let new_values = []
        let flag = []
        let max = -1
        for(let value of state[s1][1]){
            if(value > max){
                max = value
            }
        }
        for(let i = 0; i < max + 1; i++){
            flag.push(1)
        }
        for(let val0 of state[s1][1]){
            let minimum = Infinity
            let val = -1
            for(let value of state[s1][1]){
                if (flag[value] === -1){
                    continue
                }
                let counter = 0
/*
                for neighbour in neighbours[s1]:
                    if state[neighbour][0] is not None:
                        continue
                if counter < minimum:
                    minimum = counter
                    val = value
                
*/
            }
        }

    }
}
/*
def least_constraining_value(state):
    #################################################################
    # (Point: 15% of total score)                                   #
    # This function returns sorted values in ascending order        #
    # based on the no of constraints and return the list.           #
    #################################################################
    sorted_vals = state.copy()
    for s1 in state:
        if state[s1][0] is not None:
            continue
        new_values = []
        flag = []
        max = -1
        for value in state[s1][1]:
            if value > max:
                max = value
        for i in range(max + 1):
            flag.append(1)

        for val0 in state[s1][1]:
            minimum = 9999999999
            val = -1
            for value in state[s1][1]:
                if flag[value] == -1:
                    continue
                counter = 0

                for neighbour in neighbours[s1]:
                    if state[neighbour][0] is not None:
                        continue
                if counter < minimum:
                    minimum = counter
                    val = value
            new_values.append(val)
            flag[val] = -1
        sorted_vals[s1][1].clear()
        sorted_vals[s1][1] = new_values
    return sorted_vals
*/
function another_test_function( [...state] ){
    console.log("From another_test_function() state=  ", state)
    state[1] = [null, [1000,2000,3000]]
}

export function Solve({ oldState }) {
    old_state = oldState
    // const { graph, events } = state;
    // console.log("Reached here")
    // console.log("state : ", oldState)
    // const [isSolved, setIsSolved] = useState(false)
    const [state, setState] = useState({
        counter: oldState.counter,
        // graph: {
        //   nodes: [
        //     { id: 1, label: "Node 1", color: "#e04141" },
        //     { id: 2, label: "Node 2", color: "#e09c41" },
        //     { id: 3, label: "Node 3", color: "#e0df41" },
        //     { id: 4, label: "Node 4", color: "#7be041" },
        //     { id: 5, label: "Node 5", color: "#41e0c9" }
        //   ],
        //   edges: [
        //     { from: 1, to: 2 },
        //     { from: 1, to: 3 },
        //     { from: 2, to: 4 },
        //     { from: 2, to: 5 }
        //   ]
        // },
        graph: oldState.graph,
        // events: {
        //   select: ({ nodes, edges }) => {
        //     console.log("Selected nodes:");
        //     console.log(nodes);
        //     console.log("Selected edges:");
        //     console.log(edges);
        //     // alert("Selected node: " + nodes);
        //   },
        //   doubleClick: ({ pointer: { canvas } }) => {
        //     createNode(canvas.x, canvas.y);
        //   }
        // }
        events: oldState.events
      })
      const createNode = (x, y) => {
        if(x == null || y == null){
            let width = 100
            let height = 100

            x = Math.random() * width
            y = Math.random() * height
        }
        setState(({ graph: { nodes, edges }, counter, ...rest }) => {
          const id = counter + 1;
          console.log("id = ", id)
          const from = Math.floor(Math.random() * (counter - 1)) + 1;
          return {
            graph: {
              nodes: [
                ...nodes,
                // { id, label: `Node ${id}`, color, x, y , shape: "circle"}
                {  label: `Node ${id}`, x, y , shape: "circle"}
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
        const [showDelayedText, setShowDelayedText] =
        useState(true);
        const Recursive = () => {
        // console.log("old_state = ", old_state)
        // minimum_remaining_variable()
        if(!isSolved){
            set_start_variables();
            set_neighbours();
            test_function();

            isSolved = true
        }
            // if (state.counter < 10){
            //     if(showDelayedText){
            //     console.log("NOW : ", state.counter)
            //     console.log("===============================================================")
            //     setShowDelayedText(false)
            //     createNode();
                
            //     }
                
            //     setTimeout(() => {
            //         setShowDelayedText(true);
            //     }, 200);
            //     // while(!showDelayedText){

            //     // }
            
            // }
            return(
                <p> counter is : {state.counter}</p>
            )
        
      }
      const { graph, events } = state;
    return(
        <>
            {/* <div className="App">
            <h2> We Reached else</h2>
            </div> */}  
            <div>
                <Recursive />
                        <Graph 
                        graph={graph}
                        options={options} 
                        events={events} 
                        style={{ height: "640px" }} />
                    </div>
        </>
    )
}