import React, { Component } from "react";
import { HashRouter as Router, Link, Route } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css'; 
//公用组件
import Nav from './components/Nav.js'
//页面组件
import Login from './components/pages/login.js'
import Register from './components/pages/register.js'
import List from './components/pages/list.js'
import TestList from './components/pages/TestList.js'
import Addtopic from './components/pages/addtopic.js'

export default class App extends Component{
  constructor(props){
    super(props)
    this.state = {}
  }
  componentWillMount(){
  }
  render(){
    return (
      <Router>
      <div className="App">
        <Nav/>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/" component={List} exact></Route>
        <Route path="/testlist" component={TestList}></Route>
        <Route path="/addtopic" component={Addtopic}></Route>
      </div>
      </Router>
    );
  }
};
