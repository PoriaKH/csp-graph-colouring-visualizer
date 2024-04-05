import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { useState } from 'react';
import './App.css';
import { GraphView } from './components/graph';
import { GraphView2 } from './components/graph2'
import { NewAPP } from "./components/graph3";
import { Copied } from "./components/graph4";
import { test_function } from './logic/solve';
import { temp_func } from './temp/temp';
// import { graph } from './components/graph'
// import { addNode } from './components/graph'
import WorldCup from './components/worldcup';
import MyPage from './components/flow';
// import GraphView from './components/graph';
// import WorldCup from './components/worldcup';

const root = ReactDOM.createRoot(document.getElementById('root'));


/*
function MyForm() {
  let isChanged = false
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // <newFunc name = {name}/>
    this.isChanged = true
    alert(`The name you entered was: ${name}`);
    // newFunc()
  }

  return (
    <>
    <h1>
    {isChanged ? (
        <newFunc  name = {name}/>
      ) : (
        // <newFunc  />
        <p do nothing/>
      )}
    </h1>
    <form onSubmit={handleSubmit}>
      <label>Enter your name:
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <input type="submit" />
    </form>
    </>
  );
}
function newFunc({ name }){
  console.log("Reached here");
  const value = name.value
  alert(`The name you entered was: ${name.value}`);
  return(
    <h1> your input was {name.value}</h1>
  )
}
*/

class TheAPP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numOfNodes : 0,
      submited: false
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();
    // this.state.submited = true
    console.log("num of nodes before : ")
    console.log(this.state.numOfNodes)  
    this.setState({ submited: true})
    console.log("num of nodes after : ")
    console.log(this.state.numOfNodes)
    // alert(`The name you entered was: ${this.state.numOfNodes}`);
    // newFunc()
  }
  render() {
    if(this.state.submited){
      // return <h2> submitted </h2>
      return <Submitted state={this.state}/>
    }
    else{
      return(
        <>
          <h2>Please Submit !</h2>
          <form onSubmit={this.handleSubmit}>
            <label>Enter a number:
              <input 
                type="number" 
                // value={this.state.numOfNodes}
                onChange={(e) => {
                  console.log(this.state.numOfNodes)
                  console.log("target: ", e.target.value)
                  // this.state.numOfNodes = (e.target.value)
                  this.setState({ numOfNodes: e.target.value})
                  console.log(this.state.submited)
              }}
              />
            </label>
            <input type="submit" />‍‍
          </form>
        </>
      );
    }
  }
}
function Submitted({ state }){
  // return <h2> submitted {state.numOfNodes}</h2>
  // const add_node = () => {
  //   addNode()
  //   // alert("Great Shot!");
  // }
  // graph.nodes.push({id: 11, label: "Node 11", title: "node 2 tooltip text", shape: "star"})
  return (
    <>
    {/* <div className="App">
      <p> this is a paragraf</p>
      <button type="button" onClick={add_node}> add node</button>
    </div> */}
    <div className="App">
      {/* <WorldCup /> */}
      <GraphView />
    </div>
    </>
  );
  
}

//
//
//
//
//
//
//


/*
state =  {1: [None, [2]], 2: [1, [1, 2]], 3: [2, [1, 2]], 4: [1, [1, 2]]}
neighbours =  {1: [2, 4], 2: [1, 3], 3: [2, 4], 4: [3, 1]}
sorted_vals =  {1: [None, [2]], 2: [1, [1, 2]], 3: [2, [1, 2]], 4: [1, [1, 2]]}
*/
// let state = [[null, [2]], [1, [1, 2]], [2, [1, 2]], [1, [1, 2]]]
// let sorted_vals = test_function()
// console.log("sorted_vals = ", sorted_vals)
root.render(<Copied />)








/*
const myTheme = {
  "root": {
    "base": "h-full",
    "collapsed": {
      "on": "w-16",
      "off": "w-64"
    },
    "inner": "h-full overflow-y-auto overflow-x-hidden rounded bg-gray-50 px-3 py-4 dark:bg-gray-800"
  },
  "collapse": {
    "button": "group flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
    "icon": {
      "base": "h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
      "open": {
        "off": "",
        "on": "text-gray-900"
      }
    },
    "label": {
      "base": "ml-3 flex-1 whitespace-nowrap text-left",
      "icon": {
        "base": "h-6 w-6 transition delay-0 ease-in-out",
        "open": {
          "on": "rotate-180",
          "off": ""
        }
      }
    },
    "list": "space-y-2 py-2"
  },
  "cta": {
    "base": "mt-6 rounded-lg bg-gray-100 p-4 dark:bg-gray-700",
    "color": {
      "blue": "bg-cyan-50 dark:bg-cyan-900",
      "dark": "bg-dark-50 dark:bg-dark-900",
      "failure": "bg-red-50 dark:bg-red-900",
      "gray": "bg-alternative-50 dark:bg-alternative-900",
      "green": "bg-green-50 dark:bg-green-900",
      "light": "bg-light-50 dark:bg-light-900",
      "red": "bg-red-50 dark:bg-red-900",
      "purple": "bg-purple-50 dark:bg-purple-900",
      "success": "bg-green-50 dark:bg-green-900",
      "yellow": "bg-yellow-50 dark:bg-yellow-900",
      "warning": "bg-yellow-50 dark:bg-yellow-900"
    }
  },
  "item": {
    "base": "flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
    "active": "bg-gray-100 dark:bg-gray-700",
    "collapsed": {
      "insideCollapse": "group w-full pl-8 transition duration-75",
      "noIcon": "font-bold"
    },
    "content": {
      "base": "flex-1 whitespace-nowrap px-3"
    },
    "icon": {
      "base": "h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
      "active": "text-gray-700 dark:text-gray-100"
    },
    "label": "",
    "listItem": ""
  },
  "items": {
    "base": ""
  },
  "itemGroup": {
    "base": "mt-4 space-y-2 border-t border-gray-200 pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-gray-700"
  },
  "logo": {
    "base": "mb-5 flex items-center pl-2.5",
    "collapsed": {
      "on": "hidden",
      "off": "self-center whitespace-nowrap text-xl font-semibold dark:text-white"
    },
    "img": "mr-3 h-6 sm:h-7"
  }
}






// "use client";

// import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";


function Component() {
  return (
    <Sidebar aria-label="Default sidebar example" theme={myTheme}>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#">
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item href="#" label="Pro" labelColor="dark">
            Kanban
          </Sidebar.Item>
          <Sidebar.Item href="#" label="3">
            Inbox
          </Sidebar.Item>
          <Sidebar.Item href="#">
            Users
          </Sidebar.Item>
          <Sidebar.Item href="#">
            Products
          </Sidebar.Item>
          <Sidebar.Item href="#">
            Sign In
          </Sidebar.Item>
          <Sidebar.Item href="#">
            Sign Up
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}


// root.render(<Component />)
*/