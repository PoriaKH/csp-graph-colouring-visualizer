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
    // console.log("from test_func : state = ", state)
    // const[state, setState] = useState(start_variables)
    // let new_State = state
    // console.log("From test_function start_variables=  ", start_variables)
    // console.log("From test_function() start_variables[0]=  ", start_variables[0])
    // console.log("From test_function() before start_variables=  ", start_variables)
    // minimum_remaining_variable(start_variables)
    start_variables = [[null, [2]], [1, [1, 2]], [2, [1, 2]], [1, [1, 2]]]
    neighbours = [[2, 4], [1, 3], [2, 4], [3, 1]]
    return (least_constraining_value(start_variables))
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
function least_constraining_value( ...state ){
    let sorted_vals = state.slice()
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
                for(let neighbour of neighbours[s1]){
                    if(state[neighbour][0] !== null){
                        continue
                    }
                }
                if(counter < minimum){
                    minimum = counter
                    val = value
                }
/*
                for neighbour in neighbours[s1]:
                    if state[neighbour][0] is not None:
                        continue
                if counter < minimum:
                    minimum = counter
                    val = value
                
*/
            }
            new_values.push(val)
            flag[val] = -1
        }
        sorted_vals[s1][1] = []
        sorted_vals[s1][1] = new_values
    }
    return sorted_vals
}
function arc_consistency(...variables){
    let new_variables = variables.slice()
    let to_append = []
    for(let i = 0; i < colors; i++){
        to_append.push(i + 1)
    }
    for(let s = 0; s < variables.length; s++){
        variables[s][1] = []
        variables[s][1] = to_append.slice()
    }
    for(let s1 = 0; s1 < new_variables.length; s1++){
        if(new_variables[s1][0] === null){
            continue
        }
        for(let s2 of neighbours[s1]){
            if(s1 === s2 || new_variables[s2][0] !== null){
                continue
            }
            let found_index = new_variables[s2][1].indexOf(new_variables[s1][0])
            if(found_index > -1){
                new_variables[s2][1].splice(found_index, 1)
            }
        }
    }
    let queue = [[]]
    let popped = [[]]
    for(let s1 = 0; s1 < new_variables.length; s1++){
        if(new_variables[s1][0] !== null){
            continue
        }
        for(let s2 of neighbours[s1]){
            if(s1 === s2 || new_variables[s2][0] != null){
                continue
            }
            let flag1 = true
            let flag2 = true
            for(let q of queue){
                if(q[0] === s1 && q[1] === s2){
                    flag1 = false
                    break
                }
            }
            for(let p of popped){
                if(p[0] === s1 && p[1] === s2){
                    flag2 = false
                    break
                }
            }
            if(flag1 && flag2){
                queue.push([s1, s2])
            }
        }
    }
    while(queue.length > 0){
        let arc = queue[0]
        if(remove_inconsistent_values(arc, new_variables)){
            for(let neighbour of neighbours[queue[0][0]]){
                let flag1 = true
                let flag2 = true
                for(let q of queue){
                    if(q[0] === neighbour && q[1] === queue[0][0]){
                        flag1 = false
                        break
                    }
                }
                for(let p of popped){
                    if(p[0] === neighbour && p[1] === queue[0][0]){
                        flag2 = false
                        break
                    }
                }
                if(flag1 && flag2){
                    if(neighbour !== queue[0][0]){
                        queue.push([neighbour, queue[0][0]])
                    }
                }
            }
            popped.push(queue[0])
            queue.splice(0, 1)
        }
        else{
            return null
        }
    }
    return new_variables
}
/*
    while len(queue) > 0:
        arc = queue[0]
        if remove_inconsistent_values(arc, new_variables):
            for neighbour in neighbours[queue[0][0]]:
                if [neighbour, queue[0][0]] not in queue and [neighbour, queue[0][0]] not in popped:
                    if neighbour != queue[0][0]:
                        queue.append([neighbour, queue[0][0]])
            popped.append(queue.pop(0))
        else:
            return None
    return new_variables
*/
function remove_inconsistent_values(arc, variables){

}

/*
def arc_consistency(variables):
    new_variables = variables.copy()
    #################################################################
    # (Point: 15% of total score)                                   #
    # This function returns variables with consistent values.       #
    #################################################################
    ###
    to_append = []
    for i in range(colors):
        to_append.append(i + 1)
    for s in variables:
        variables[s][1].clear()
        variables[s][1] = to_append.copy()
    ###
    for s1 in new_variables:  # s1 has a value
        if new_variables[s1][0] is None:
            continue
        for s2 in neighbours[s1]:  # s2 doesn't have a value
            if s1 == s2 or new_variables[s2][0] is not None:
                continue
            if new_variables[s1][0] in new_variables[s2][1]:
                new_variables[s2][1].remove(new_variables[s1][0])
    queue = []
    popped = []
    for s1 in new_variables:
        if new_variables[s1][0] is not None:
            continue
        for s2 in neighbours[s1]:
            if s1 == s2 or new_variables[s2][0] is not None:
                continue
            if [s1, s2] not in queue and [s1, s2] not in popped:
                queue.append([s1, s2])

    while len(queue) > 0:
        arc = queue[0]
        if remove_inconsistent_values(arc, new_variables):
            for neighbour in neighbours[queue[0][0]]:
                if [neighbour, queue[0][0]] not in queue and [neighbour, queue[0][0]] not in popped:
                    if neighbour != queue[0][0]:
                        queue.append([neighbour, queue[0][0]])
            popped.append(queue.pop(0))
        else:
            return None
    return new_variables
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