import React, { Component } from "react";

class Nav extends Component{
  constructor(props){
    super(props);
    this.state={
      gradingnum:this.props.gradingnum,
      activeClass:"基础知识"
    }
  }
  componentWillReceiveProps(nextProps){
    if(this.props.onactive != nextProps.onactive){
      switch(nextProps.onactive){
        case 1:
          this.setState({
            activeClass:"基础知识"
          })
          break;
        case 2:
          this.setState({
            activeClass:"vue知识"
          })
          break;
        case 3:
          this.setState({
            activeClass:"react知识"
          })
          break;
      }
    }
    if (this.props.gradingnum < nextProps.gradingnum){
      this.setState({
        gradingnum:nextProps.gradingnum
      })
      this.props.showalert2(`恭喜老铁升级!当前${this.state.activeClass}等级P${nextProps.gradingnum}`);
    }else if(this.props.gradingnum > nextProps.gradingnum){
      this.setState({
        gradingnum:nextProps.gradingnum
      })
      this.props.showalert2(`老铁行不行啊？当前${this.state.activeClass}等级P${nextProps.gradingnum}`)
    }
  }
  render(){
    return (
        <header className="App-header">
          <h3>前端测试题</h3><h4>当前{this.state.activeClass}等级: <span className="grading">P{this.state.gradingnum}</span></h4>
        </header>
    );
  }
}

export default Nav;