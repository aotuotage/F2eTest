import React, { Component } from "react";
import './App.css';
import Nav from './components/Nav.js'
import TestList from './components/TestList.js'

export default class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      alertshow: false,
      alerttext:'',
      alertshow2:false,
      alerttext2:'',
      active: 1,
      gradingnum:0
    }
  }
  componentWillMount(){
    //获取储存的等级
    let grading = localStorage.getItem("grading");
    if(grading){
      this.setState({
        gradingnum:grading
      })
    }
  }
  //正确与否提示
  showalert(text){
    let _this = this;
    this.setState({
      alerttext:text,
      alertshow:true
    })
    setTimeout(function(){
      _this.setState({
        alerttext:'',
        alertshow:false
      })
    },800)
  }
  //等级变动提示
  showalert2(text){
    let _this = this;
    setTimeout(function(){
      _this.setState({
        alerttext:"",
        alertshow:false,
        alerttext2:text,
        alertshow2:true
      })
    },900)
    setTimeout(function(){
      _this.setState({
        alerttext2:'',
        alertshow2:false
      })
    },2000)
  }
  //选择答题类型
  onactive(num){
    this.setState({
      active:num
    })
  }
  //定级函数
  grading(num){
    localStorage.setItem("grading", num);
    this.setState({
      gradingnum:num
    })
  }
  render(){
    return (
      <div className="App">
        <Nav onactive={this.state.active} gradingnum = {this.state.gradingnum} showalert2={this.showalert2.bind(this)}/>
        <div className="classification">
            <p onClick={()=>this.onactive(1)} className={this.state.active == 1 ? 'active' : 'default'}>基础知识</p>
            <p onClick={()=>this.onactive(2)} className={this.state.active == 2 ? 'active' : 'default'}>vue知识</p>
            <p  onClick={()=>this.onactive(3)} className={this.state.active == 3 ? 'active' : 'default'}>react知识</p>
        </div>
        <TestList key={this.state.active} onactive={this.state.active} showalert={this.showalert.bind(this)} grading={this.grading.bind(this)}/>
        {
          this.state.alertshow === true ? <div className="alertshow">{this.state.alerttext}</div>: ''
        }
        {
          this.state.alertshow2 === true ? <div className="alertshow2">{this.state.alerttext2}</div>: ''
        }
      </div>
    );
  }
};
