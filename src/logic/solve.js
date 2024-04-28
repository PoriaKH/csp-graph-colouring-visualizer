import { useState, useEffect } from "react";
import Graph from 'react-vis-network-graph'
import { options } from "../components/graph";
// delay time, set lower to increase solving speed
const delay = 500

let old_state = {}
let start_variables = []
let neighbours = []

let colors = 1


let isSolved = false
const all_states = []
let state_number = 0

let color_array = []

// initialize the first state of graph
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

// initialize neighbours of each node
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

// Function to find the minimum remaining variable to be assigned.
// This function returns sorted values in ascending order
// based on the no of constraints and return the list. 
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

// Function to find the least constraining value.
// This function returns sorted values in ascending order
// based on the no of constraints and return the list.
function least_constraining_value( state ){
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

// Function to ensure arc consistency.
// This function returns variables with consistent values.  
function arc_consistency(variables){
    let new_variables = variables.map(obj => ({...obj}));
    let to_append = []
    for(let i = 0; i < colors; i++){
        to_append.push(i + 1)
    }
    for(let s = 0; s < variables.length; s++){
        variables[s][1] = []
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

// Function to remove the inconsistent values in an arc.
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
// This function returns a solution with minimum number of colors
function backtrack(){
    let state = start_variables.map(obj => ({...obj}));

    let res = backtrack_search(state)
    while(res === null){
        colors = colors + 1
        set_start_variables()
        state = start_variables.map(obj => ({...obj}));
        res = backtrack_search(state)
    }
    return res
}

// Recursive function that performs backtracking search based on the heuristics.
function backtrack_search([...state]){
    const temp_state = state.map(obj => ({...obj}));
    all_states.push(temp_state)

    state = arc_consistency(state)
    if(state === null){
        return null
    }
    let indexes = minimum_remaining_variable(state)
    state = least_constraining_value(state)
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
            let red;
            let green;
            let blue;
            let flag = true
            while(flag){
                red = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
                green = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
                blue = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
                if(color_array.length == 0){
                    break
                }

                let counter = 0
                while(counter < color_array.length){
                    const red_prime = color_array[counter].substring(1, 3);
                    const green_prime = color_array[counter].substring(3, 5);
                    const blue_prime = color_array[counter].substring(5, 7);
                    const int_val_red = parseInt(red, 16) - parseInt(red_prime, 16);
                    const int_val_blue = parseInt(blue, 16) - parseInt(blue_prime, 16);
                    const int_val_green = parseInt(green, 16) - parseInt(green_prime, 16);
                    let distance = Math.sqrt((int_val_red * int_val_red) + (int_val_blue * int_val_blue) + (int_val_green * int_val_green));
                    let percentage = distance / Math.sqrt((255 * 255) + (255 * 255) + (255 * 255));
                    if(percentage <= 0.3){
                        // if two colors look the same, change them.
                        break
                    }
                    else if(counter == color_array.length - 1){
                        flag = false
                    }
                    counter++
                }
            }
            return `#${red}${green}${blue}`;
          }
        const Recursive = () => {

        if(!isSolved){
            set_start_variables();
            set_neighbours();
            
            let result = backtrack()
            for(let i = 0; i < colors; i++){
                color_array.push(randomColor())
            }

            isSolved = true
        }
            useEffect(() => {
                setTimeout(() => {
                    if(state_number < all_states.length){
                    let new_graph = {}
                    const new_nodes = graph.nodes.map(obj => ({...obj}));

                    for(let node of new_nodes){
                        if(all_states[state_number][node.id][0] !== null){
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
                }, delay); 
              },[]);
      }
      const { graph, events } = state;
    return(
        <>
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