import React, { Component } from "react";
import { Icon } from 'antd';
import { HashRouter as Router, Link, Route } from 'react-router-dom';

class Nav extends Component{
  constructor(props){
    super(props);
    this.state={}
  }
  render(){
    return (
      <div>
        <header className="App-header">
          <h3>题海</h3><h4>admin1</h4>
        </header>
        <footer className="App-footer">
          <div className="App-nav">
            <Link to="/">
              <Icon className="nav-icon" type="home" />
            </Link>
            <Link to="/login">
              <Icon className="nav-icon" type="user" />
            </Link>
          </div>
          <Link to="/addtopic">
            <Icon className="addlist" type="plus" />
          </Link>
        </footer>
      </div>  
    );
  }
}

export default Nav;