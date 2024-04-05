import React, { useState } from "react";
import Graph from 'react-vis-network-graph'
import { options } from "../components/graph4";

let old_state = {}
let start_variables = []
let neighbours = []

let colors = 1
let real_colors = Infinity

let isSolved = false


function set_start_variables(){
    start_variables = []
    for(let node of old_state.graph.nodes){
        let color_array = []
        for (let color = 0; color < colors; color++){
            color_array.push(color + 1)
        }
        start_variables.push([null, color_array])
    }
}

function set_neighbours(){
    for (let node of old_state.graph.nodes){
        neighbours.push([])
    }
    for (let edge of old_state.graph.edges){
        if(!neighbours[edge.from].includes(edge.to)){
            neighbours[edge.from].push(edge.to);
        }
        if(!neighbours[edge.to].includes(edge.from)){
            neighbours[edge.to].push(edge.from);
        }
    }
}


export function test_function(){
/*
    //  minimum_remaining_variable test //

    neighbours = [[1, 3], [0, 2], [1, 3], [2, 0]]
    let state =  [[null, [2]], [null, [1]], [null, [2]], [0, [1]]]
    // indexes =  [2, 1, 0]
    return(minimum_remaining_variable(state))
*/

/*
    // least_constraining_value test //

    let state = [[null, [2]], [1, [1, 2]], [2, [1, 2]], [1, [1, 2]]]
    neighbours = [[1, 3], [0, 2], [1, 3], [2, 0]]
    // sorted_vals =  {1: [None, [2]], 2: [1, [1, 2]], 3: [2, [1, 2]], 4: [1, [1, 2]]}
    return (least_constraining_value(state))
*/

/*
    // arc_consistency test //

    let variables =  [[null, [1, 2]], [null, [1, 2]], [null, [1, 2]], [1, [0, 2]]]
    colors =  2
    neighbours =  [[1, 3], [0, 2], [1, 3], [2, 0]]
    console.log("variables from test_func = ", variables)
    return(arc_consistency(variables))
*/


    // backtrack_search test//

// test 1:
    // start_variables =  [[null, [1, 2, 3]], [null, [1, 2, 3]], [null, [1, 2, 3]], [null, [1, 2, 3]]]
    // neighbours =  [[1, 3], [0, 2], [1, 3], [2, 0]]
    // colors =  1
    // // res =  {0: [2, [1, 2]], 1: [1, [1, 2]], 2: [2, [1, 2]], 3: [1, [1, 2]]}
    // return(backtrack())

// test 2:
    // start_variables =  [[null, [1, 2, 3, 4]], [null, [1, 2, 3, 4]], [null, [1, 2, 3, 4]], [null, [1, 2, 3, 4]], [null, [1, 2, 3, 4]], [null, [1, 2, 3, 4]], [null, [1, 2, 3, 4]]]
    // neighbours =  [[1, 2, 3, 4], [0, 2, 3, 5, 6], [0, 1, 4, 5, 6], [0, 1, 4, 5, 6], [0, 2, 3, 5, 6], [1, 2, 3, 4, 6], [1, 2, 3, 4, 5]]
    // colors =  1
    // res =  {1: [1, [1, 2, 3, 4]], 2: [3, [1, 2, 3, 4]], 3: [4, [1, 2, 3, 4]], 4: [4, [1, 2, 3, 4]], 5: [3, [1, 2, 3, 4]], 6: [2, [1, 2, 3, 4]], 7: [1, [1, 2, 3, 4]]}
    // return(backtrack())
    /*
    start_variables =  {1: [None, [1, 2, 3, 4]], 2: [None, [1, 2, 3, 4]], 3: [None, [1, 2, 3, 4]], 4: [None, [1, 2, 3, 4]], 5: [None, [1, 2, 3, 4]], 6: [None, [1, 2, 3, 4]], 7: [None, [1, 2, 3, 4]]}
    neighbours =  {1: [2, 3, 4, 5], 2: [1, 3, 4, 6, 7], 3: [1, 2, 5, 6, 7], 4: [1, 2, 5, 6, 7], 5: [1, 3, 4, 6, 7], 6: [2, 3, 4, 5, 7], 7: [2, 3, 4, 5, 6]}
    colors =  1
    res =  {1: [1, [1, 2, 3, 4]], 2: [3, [1, 2, 3, 4]], 3: [4, [1, 2, 3, 4]], 4: [4, [1, 2, 3, 4]], 5: [3, [1, 2, 3, 4]], 6: [2, [1, 2, 3, 4]], 7: [1, [1, 2, 3, 4]]}
    */

//  test 3:         minimum_remaining_variable -----> Tik
/*
    console.log("in testFunc:\n")
    neighbours =  [[1, 2, 3, 4], [0, 2, 3], [0, 1, 3], [0, 1, 2], [0]]
    let state =  [[2, [1, 2, 3]], [null, [1, 3]], [null, [1, 3]], [null, [1, 3]], [1, [1, 2, 3]]]
    // indexes =  [3, 2, 1]

    let result = minimum_remaining_variable(state)
    console.log("result = ", result)
*/

// test 4 :         least_constraining_value
/*
    neighbours =  [[1, 2, 3, 4], [0, 2, 3], [0, 1, 3], [0, 1, 2], [0]]
    let state =  [[2, [1, 2, 3, 4]], [null, [4]], [3, [1, 2, 3, 4]], [1, [1, 2, 3, 4]], [1, [1, 2, 3, 4]]]
    // sorted_vals =  {0: [2, [1, 2, 3, 4]], 1: [None, [4]], 2: [3, [1, 2, 3, 4]], 3: [1, [1, 2, 3, 4]], 4: [1, [1, 2, 3, 4]]}
    let result = least_constraining_value(state)
    console.log("result = ", result)
*/

// test 5 :     arc_consistency
/*
    let variables =  [[null, [1, 2, 3, 4]], [null, [1, 2, 3, 4]], [null, [1, 2, 3, 4]], [null, [1, 2, 3, 4]], [null, [1, 2, 3, 4]]]
    colors =  1
    neighbours =  [[1, 2, 3, 4], [0, 2, 3], [0, 1, 3], [0, 1, 2], [0]]
    // null
    let result = arc_consistency(variables)
    console.log("result = ", result)
*/
// test 6 :     arc_consistency
/*
    let variables =  [[2, [2, 3]], [null, [1, 2, 3]], [null, [1, 2, 3]], [null, [1, 2, 3]], [1, [1, 2, 3]]]
    colors =  3
    neighbours =  [[1, 2, 3, 4], [0, 2, 3], [0, 1, 3], [0, 1, 2], [0]]
    // new_variables =  {0: [2, [1, 2, 3]], 1: [None, [1, 3]], 2: [None, [1, 3]], 3: [None, [1, 3]], 4: [1, [1, 2, 3]]}
    let result = arc_consistency(variables)
    console.log("result = ", result)
*/

// test 7 :     arc_consistency
/*
    let variables =  [[2, [2, 3]], [null, [1, 2, 3]], [null, [1, 2, 3]], [null, [1, 2, 3]], [1, [1, 2, 3]]]
    colors =  3
    neighbours =  [[1, 2, 3, 4], [0, 2, 3], [0, 1, 3], [0, 1, 2], [0]]
    // new_variables =  {0: [2, [1, 2, 3]], 1: [None, [1, 3]], 2: [None, [1, 3]], 3: [None, [1, 3]], 4: [1, [1, 2, 3]]}
    let result = arc_consistency(variables)
    console.log("result = ", result)
*/

// backtrack test//
/*
    start_variables =  [[null, [1, 2, 3, 4]], [null, [1, 2, 3, 4]], [null, [1, 2, 3, 4]], [null, [1, 2, 3, 4]], [null, [1, 2, 3, 4]]]
    neighbours =  [[1, 2, 3, 4], [0, 2, 3], [0, 1, 3], [0, 1, 2], [0]]
    colors =  1
    // res =  {0: [2, [1, 2, 3, 4]], 1: [4, [1, 2, 3, 4]], 2: [3, [1, 2, 3, 4]], 3: [1, [1, 2, 3, 4]], 4: [1, [1, 2, 3, 4]]}
    let result = backtrack()
    console.log("result[0   ] = ", result[0])
*/
// backtrack_search test //
/*
    start_variables =  [[null, [1, 2, 3, 4]], [null, [1, 2, 3, 4]], [null, [1, 2, 3, 4]], [null, [1, 2, 3, 4]], [null, [1, 2, 3, 4]]]
    let state = [[null, [1, 2, 3, 4]], [null, [1, 2, 3, 4]], [null, [1, 2, 3, 4]], [null, [1, 2, 3, 4]], [null, [1, 2, 3, 4]]]
    neighbours =  [[1, 2, 3, 4], [0, 2, 3], [0, 1, 3], [0, 1, 2], [0]]
    colors =  1
    // res =  None
    let result = backtrack_search(state)
    console.log("result = ", result)
*/
// backtrack_search test  //
/*
    start_variables =  [[null, [2]], [null, [1]], [null, []], [null, [1, 2]], [1, [1, 2]]]
    let state = [[null, [2]], [null, [1]], [null, []], [null, [1, 2]], [1, [1, 2]]]
    neighbours =  [[1, 2, 3, 4], [0, 2, 3], [0, 1, 3], [0, 1, 2], [0]]
    colors =  4
    // res =  None
    let result = backtrack_search(state)
    console.log("result = ", result)
*/
/*
// arc_consistency test //
    let variables =  [[2, [1, 2, 3]], [null, [1, 3]], [null, [1, 3]], [1, [1, 3]], [1, [1, 2, 3]]]
    colors =  3
    neighbours =  [[1, 2, 3, 4], [0, 2, 3], [0, 1, 3], [0, 1, 2], [0]]
    // null

    let result = arc_consistency(variables)
    console.log("result = ", result)
*/

    start_variables =  [[null, [1, 2, 3, 4]], [null, [1, 2, 3, 4]], [null, [1, 2, 3, 4]], [null, [1, 2, 3, 4]], [null, [1, 2, 3, 4]], [null, [1, 2, 3, 4]], [null, [1, 2, 3, 4]]]
    neighbours =  [[1, 2, 3, 4], [0, 2, 3, 5, 6], [0, 1, 4, 5, 6], [0, 1, 4, 5, 6], [0, 2, 3, 5, 6], [1, 2, 3, 4, 6], [1, 2, 3, 4, 5]]
    colors =  1
    // res =  {0: [1, [1, 2, 3, 4]], 1: [3, [1, 2, 3, 4]], 2: [4, [1, 2, 3, 4]], 3: [4, [1, 2, 3, 4]], 4: [3, [1, 2, 3, 4]], 5: [2, [1, 2, 3, 4]], 6: [1, [1, 2, 3, 4]]}
    let result = backtrack()
    console.log("result = ", result)
}
function minimum_remaining_variable( state ){
    let indexes = []
    let flag = []
    for(let i = 0; i < state.length + 1; i++){
        flag.push(1);
    }

    for (let s1 = 0; s1 < state.length; s1++){
        let min = Infinity
        let index = -1
        for(let s2 = 0; s2 < state.length; s2++){
            if(flag[s2] === -1 || state[s2][0] !== null){
                continue
            }
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
    return indexes
    
}
function least_constraining_value( state ){
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
            }
            new_values.push(val)
            flag[val] = -1
        }
        sorted_vals[s1][1] = []
        sorted_vals[s1][1] = new_values
    }
    return sorted_vals
}
function arc_consistency(variables){
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
    let queue = []
    let popped = []
    for(let s1 = 0; s1 < new_variables.length; s1++){
        if(new_variables[s1][0] !== null){
            continue
        }
        for(let s2 of neighbours[s1]){
            if(s1 === s2 || new_variables[s2][0] !== null){
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
function remove_inconsistent_values(arc, variables){
    for(let value1 of variables[arc[0]][1]){
        let flag = false
        for(let value2 of variables[arc[1]][1]){
            if(value1 !== value2){
                flag = true
                break
            }
        }
        if(!flag){
            let found_index = variables[arc[0]][1].indexOf(value1)
            if(found_index > -1){
                variables[arc[0]][1].splice(found_index, 1)
            }
        }
    }
    for(let s = 0; s < variables.length; s++){
        if(variables[s][0] !== null){
            continue
        }
        if(variables[s][1].length === 0){   // couldn't remove inconsistency
            return false
        }
    }
    return true
}

// Function to call the backtracking search
function backtrack(){
    let state = start_variables.slice()
    let res = backtrack_search(state)
    while(res === null){
        colors = colors + 1
        set_start_variables()
        state = start_variables.slice()
        res = backtrack_search(state)
        for(let s1 = 0; res !== null && s1 < res.length; s1++ ){
            let flag = false
            for(let neighbour of neighbours[s1]){
                if(res[s1][0] === res[neighbour][0]){
                    flag = true
                    break
                }
            }
            if(flag){
                res = null
                break
            }
        }
    }
    return res
}
function backtrack_search([...state]){
    state = arc_consistency(state)
    if(state === null){
        return null
    }
    let indexes = minimum_remaining_variable(state)
    state = least_constraining_value(state)
    let new_state = state.slice()
    let flag = false
    for(let s = 0; s < new_state.length; s++){
        if(new_state[s][0] === null){
            flag = true
            break
        }
    }
    if(!flag){
        return new_state
    }
    for(let value of new_state[indexes[0]][1]){
        new_state[indexes[0]][0] = value
        let result = backtrack_search(new_state)
        if(result !== null){
            return result
        }
        new_state = state.slice()
    }
    return null
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
        //   console.log("id = ", id)
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
        const [showDelayedText, setShowDelayedText] = useState(true);
        function randomColor() {
            const red = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
            const green = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
            const blue = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
            return `#${red}${green}${blue}`;
          }
        const Recursive = () => {
        // console.log("old_state = ", old_state)
        // minimum_remaining_variable()
        if(!isSolved){
            // // 
            // test_function()
            // // 
            set_start_variables();
            set_neighbours();
            console.log("in isSolved:\n")
            console.log("neighbours = ", neighbours, "\nstart_variables = ", start_variables)
            let result = backtrack()
            console.log("result = ", result, "\ngraph = ", graph)

            let color_array = []
            for(let i = 0; i < colors; i++){
                color_array.push(randomColor())
            }
            // console.log("color_array = ", color_array)
            for(let node of graph.nodes){
                // console.log("node = ", node, "\ncolor_array[result[node.id][0] - 1] = ",color_array[result[node.id][0] - 1])
                node.color = color_array[result[node.id][0] - 1]
            }
            // console.log("graph after = ", graph)
            // console.log("colors = ", colors)

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
            // return(
            //     // <p> colors is : {colors}</p>
            // )
        
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