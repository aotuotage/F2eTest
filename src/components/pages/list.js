import React, { Component } from "react";
import { HashRouter as Router, Link, Route } from 'react-router-dom';

class List extends Component{
  constructor(props){
    super(props);
    this.state={}
  }
  render(){
    return (
      <div className="list_surface">
        <div className="list">
          <Link to="/testlist?id=1">
            <p className="question"><span>题库1：</span>以下href和src、link和@import的区别错误的是？</p>
          </Link>
          <p className="explain_title"></p>
          <p className="introduce"><span>介绍：</span>以下href和src、link和@import的区别错误的是？</p>
        </div>
        <div className="list">
          <Link to="/testlist?id=2">
            <p className="question"><span>题库1：</span>以下href和src、link和@import的区别错误的是？</p>
          </Link>
          <p className="explain_title"></p>
          <p className="introduce"><span>介绍：</span>以下href和src、link和@import的区别错误的是？</p>
        </div>
        <div className="list">
          <p className="question"><span>题库1：</span>以下href和src、link和@import的区别错误的是？</p>
          <p className="explain_title"></p>
          <p className="introduce"><span>介绍：</span>以下href和src、link和@import的区别错误的是？</p>
        </div>
        <div className="list">
          <p className="question"><span>题库1：</span>以下href和src、link和@import的区别错误的是？</p>
          <p className="explain_title"></p>
          <p className="introduce"><span>介绍：</span>以下href和src、link和@import的区别错误的是？</p>
        </div>
      </div>  
    );
  }
}

export default List;