import { useState, useEffect } from "react";
import Graph from 'react-vis-network-graph'
import { options } from "../components/graph4";

let old_state = {}
let start_variables = []
let neighbours = []

let colors = 1


let isSolved = false
const all_states = []
let state_number = 0

let color_array = []
let temp = 0
// 
//  null : represents -> null
// 

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
    // let sorted_vals = state.slice()
    let sorted_vals = state.map(obj => ({...obj}));
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
    // let new_variables = variables.slice()
    let new_variables = variables.map(obj => ({...obj}));
    let to_append = []
    for(let i = 0; i < colors; i++){
        to_append.push(i + 1)
    }
    for(let s = 0; s < variables.length; s++){
        variables[s][1] = []
        // variables[s][1] = to_append.slice()
        variables[s][1] = to_append.map(obj => ({...obj}));
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
    // let state = start_variables.slice()
    let state = start_variables.map(obj => ({...obj}));

    let res = backtrack_search(state)
    while(res === null){
        colors = colors + 1
        set_start_variables()
        // state = start_variables.slice()
        state = start_variables.map(obj => ({...obj}));
        res = backtrack_search(state)
    }
    return res
}
function backtrack_search([...state]){
    const temp_state = state.map(obj => ({...obj}));
    all_states.push(temp_state)

    state = arc_consistency(state)
    if(state === null){
        return null
    }
    let indexes = minimum_remaining_variable(state)
    state = least_constraining_value(state)
    // let new_state = state.slice()
    let new_state = state.map(obj => ({...obj}));

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
        // new_state = state.slice()
        new_state = state.map(obj => ({...obj}));
    }
    return null
}

export function Solve({ oldState }) {
    old_state = oldState
    const [state, setState] = useState({
        counter: oldState.counter,
        graph: oldState.graph,
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
          return {
            graph: {
              nodes: [
                ...nodes,
                {  label: `Node ${id}`, x, y , shape: "circle"}
              ],
              edges: [
                ...edges,
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

        if(!isSolved){
            set_start_variables();
            set_neighbours();
            
            let result = backtrack()
            console.log("all_states = ", all_states)
            
             
            console.log("result = ", result, "\ngraph = ", graph)

            for(let i = 0; i < colors; i++){
                color_array.push(randomColor())
            }

            isSolved = true
        }
            useEffect(() => {
                setTimeout(() => {
                    console.log("Here")
                    if(state_number < all_states.length){
                    console.log("heyyss");
                    let new_graph = {}
                    const new_nodes = graph.nodes.map(obj => ({...obj}));
                    console.log("graph = ", graph)
                    console.log("graph.nodes = ", graph.nodes)
                    console.log("new_nodes = ", new_nodes)

                    for(let node of new_nodes){
                        console.log("node = ", node)
                        if(all_states[state_number][node.id][0] !== null){
                            console.log("all_states[state_number][node.id][0] - 1 = ", all_states[state_number][node.id][0] - 1)
                            node.color = color_array[all_states[state_number][node.id][0] - 1]
                        }
                        else{
                            node.color = "#000000"
                        }
                    }
                    new_graph = {
                        nodes: new_nodes,
                        edges: graph.edges,
                    }
                    setState(() => {
                        return {
                          graph: {
                            nodes: new_graph.nodes,
                            edges: new_graph.edges
                          },
                          counter: state.counter,
                          events: state.events
                        }
                      });
                      state_number = state_number + 1
                    // 
                    }
                }, 400); 
              },[]);
            return(
                <p> colors is : {colors}</p>
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

export function test_function(){    // this function helps us to test and debug each present function individually
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
    /*
        start_variables =  [[null, [1, 2, 3, 4]], [null, [1, 2, 3, 4]], [null, [1, 2, 3, 4]], [null, [1, 2, 3, 4]], [null, [1, 2, 3, 4]], [null, [1, 2, 3, 4]], [null, [1, 2, 3, 4]]]
        neighbours =  [[1, 2, 3, 4], [0, 2, 3, 5, 6], [0, 1, 4, 5, 6], [0, 1, 4, 5, 6], [0, 2, 3, 5, 6], [1, 2, 3, 4, 6], [1, 2, 3, 4, 5]]
        colors =  1
        // res =  {0: [1, [1, 2, 3, 4]], 1: [3, [1, 2, 3, 4]], 2: [4, [1, 2, 3, 4]], 3: [4, [1, 2, 3, 4]], 4: [3, [1, 2, 3, 4]], 5: [2, [1, 2, 3, 4]], 6: [1, [1, 2, 3, 4]]}
        let result = backtrack()
        console.log("result = ", result)
    */
    /*
        // start_variables =  {0: [None, [1, 2, 3, 4]], 1: [None, [1, 2, 3, 4]], 2: [None, [1, 2, 3, 4]], 3: [None, [1, 2, 3, 4]], 4: [None, [1, 2, 3, 4]], 5: [None, [1, 2, 3, 4]], 6: [None, [1, 2, 3, 4]], 7: [None, [1, 2, 3, 4]], 8: [None, [1, 2, 3, 4]], 9: [None, [1, 2, 3, 4]], 10: [None, [1, 2, 3, 4]], 11: [None, [1, 2, 3, 4]], 12: [None, [1, 2, 3, 4]], 13: [None, [1, 2, 3, 4]], 14: [None, [1, 2, 3, 4]], 15: [None, [1, 2, 3, 4]], 16: [None, [1, 2, 3, 4]], 17: [None, [1, 2, 3, 4]], 18: [None, [1, 2, 3, 4]], 19: [None, [1, 2, 3, 4]], 20: [None, [1, 2, 3, 4]], 21: [None, [1, 2, 3, 4]], 22: [None, [1, 2, 3, 4]], 23: [None, [1, 2, 3, 4]], 24: [None, [1, 2, 3, 4]], 25: [None, [1, 2, 3, 4]], 26: [None, [1, 2, 3, 4]], 27: [None, [1, 2, 3, 4]], 28: [None, [1, 2, 3, 4]], 29: [None, [1, 2, 3, 4]], 30: [None, [1, 2, 3, 4]], 31: [None, [1, 2, 3, 4]], 32: [None, [1, 2, 3, 4]], 33: [None, [1, 2, 3, 4]], 34: [None, [1, 2, 3, 4]], 35: [None, [1, 2, 3, 4]], 36: [None, [1, 2, 3, 4]], 37: [None, [1, 2, 3, 4]], 38: [None, [1, 2, 3, 4]], 39: [None, [1, 2, 3, 4]], 40: [None, [1, 2, 3, 4]], 41: [None, [1, 2, 3, 4]], 42: [None, [1, 2, 3, 4]], 43: [None, [1, 2, 3, 4]], 44: [None, [1, 2, 3, 4]], 45: [None, [1, 2, 3, 4]], 46: [None, [1, 2, 3, 4]], 47: [None, [1, 2, 3, 4]], 48: [None, [1, 2, 3, 4]], 49: [None, [1, 2, 3, 4]], 50: [None, [1, 2, 3, 4]], 51: [None, [1, 2, 3, 4]], 52: [None, [1, 2, 3, 4]], 53: [None, [1, 2, 3, 4]], 54: [None, [1, 2, 3, 4]], 55: [None, [1, 2, 3, 4]], 56: [None, [1, 2, 3, 4]], 57: [None, [1, 2, 3, 4]], 58: [None, [1, 2, 3, 4]], 59: [None, [1, 2, 3, 4]]}
        let my_neighbours =  {0: [1, 2, 3], 1: [0, 5, 8], 2: [0, 58, 53], 3: [0, 59, 7], 4: [5, 6, 7], 5: [4, 1, 9], 6: [4, 14, 12], 7: [4, 19, 3], 8: [1, 52, 31], 9: [5, 16, 31], 10: [11, 12, 13], 11: [10, 15, 17], 12: [10, 6, 19], 13: [10, 20, 24], 14: [15, 6, 16], 15: [14, 11, 18], 16: [14, 27, 9], 17: [11, 20, 32], 18: [15, 27, 33], 19: [12, 26, 7], 20: [21, 13, 17], 21: [20, 22, 23], 22: [21, 34, 42], 23: [21, 45, 25], 24: [13, 25, 26], 25: [24, 54, 23], 26: [24, 56, 19], 27: [28, 16, 18], 28: [27, 29, 30], 29: [28, 37, 35], 30: [28, 40, 31], 31: [9, 8, 30], 32: [33, 17, 34], 33: [32, 18, 35], 34: [32, 22, 41], 35: [33, 29, 41], 36: [37, 38, 39], 37: [36, 29, 40], 38: [36, 43, 41], 39: [36, 46, 44], 40: [37, 47, 30], 41: [35, 34, 38], 42: [22, 43, 45], 43: [42, 38, 44], 44: [43, 49, 39], 45: [42, 50, 23], 46: [39, 47, 48], 47: [46, 52, 40], 48: [46, 51, 53], 49: [44, 50, 51], 50: [49, 55, 45], 51: [49, 48, 57], 52: [8, 47, 53], 53: [52, 2, 48], 54: [55, 25, 56], 55: [54, 50, 57], 56: [54, 26, 59], 57: [55, 58, 51], 58: [2, 57, 59], 59: [58, 56, 3]}
        colors =  1
        // res =  {0: [1, [1, 2, 3]], 1: [3, [1, 2, 3]], 2: [3, [1, 2, 3]], 3: [2, [1, 2, 3]], 4: [3, [1, 2, 3]], 5: [1, [1, 2, 3]], 6: [2, [1, 2, 3]], 7: [1, [1, 2, 3]], 8: [2, [1, 2, 3]], 9: [2, [1, 2, 3]], 10: [3, [1, 2, 3]], 11: [1, [1, 2, 3]], 12: [1, [1, 2, 3]], 13: [2, [1, 2, 3]], 14: [3, [1, 2, 3]], 15: [2, [1, 2, 3]], 16: [1, [1, 2, 3]], 17: [2, [1, 2, 3]], 18: [1, [1, 2, 3]], 19: [2, [1, 2, 3]], 20: [1, [1, 2, 3]], 21: [3, [1, 2, 3]], 22: [2, [1, 2, 3]], 23: [1, [1, 2, 3]], 24: [3, [1, 2, 3]], 25: [2, [1, 2, 3]], 26: [1, [1, 2, 3]], 27: [2, [1, 2, 3]], 28: [1, [1, 2, 3]], 29: [3, [1, 2, 3]], 30: [2, [1, 2, 3]], 31: [1, [1, 2, 3]], 32: [3, [1, 2, 3]], 33: [2, [1, 2, 3]], 34: [1, [1, 2, 3]], 35: [1, [1, 2, 3]], 36: [3, [1, 2, 3]], 37: [2, [1, 2, 3]], 38: [1, [1, 2, 3]], 39: [2, [1, 2, 3]], 40: [1, [1, 2, 3]], 41: [2, [1, 2, 3]], 42: [1, [1, 2, 3]], 43: [2, [1, 2, 3]], 44: [1, [1, 2, 3]], 45: [2, [1, 2, 3]], 46: [3, [1, 2, 3]], 47: [2, [1, 2, 3]], 48: [1, [1, 2, 3]], 49: [3, [1, 2, 3]], 50: [1, [1, 2, 3]], 51: [2, [1, 2, 3]], 52: [1, [1, 2, 3]], 53: [2, [1, 2, 3]], 54: [1, [1, 2, 3]], 55: [2, [1, 2, 3]], 56: [2, [1, 2, 3]], 57: [1, [1, 2, 3]], 58: [2, [1, 2, 3]], 59: [1, [1, 2, 3]]}
        for(let i = 0; i < 60; i++){
            start_variables.push([null, [1, 2, 3, 4]])
        }
        for(let j = 0; j < 60; j++){
            console.log("neighbours[j] = ", neighbours[j])
            neighbours.push(my_neighbours[j])
        }
        console.log(backtrack())
    */
    }