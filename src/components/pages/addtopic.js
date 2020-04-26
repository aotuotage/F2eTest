import React, { Component } from "react";
import { Input, Select, Icon } from 'antd';
import { HashRouter as Router, Link, Route } from 'react-router-dom';
const { TextArea } = Input;
const { Option } = Select;

const selectAfter = (
  <Select defaultValue="false" className="select" style={{ width: 110 }}>
    <Option value="false">错误</Option>
    <Option value="true">正确</Option>
  </Select>
);

class Nav extends Component{
  constructor(props){
    super(props);
    this.state={
      list:[
        {
          title: '',
          answerlist: ['A','B','C'],
          answer:[
            {A:''},
            {B:''},
            {C:''}
          ],
          relevant:'',
          analysis:''
        },
        {
          title: '',
          answerlist: ['A','B','C'],
          answer:[
            {A:''},
            {B:''},
            {C:''}
          ],
          relevant:'',
          analysis:''
        }
      ]
    }
  }
  componentDidMount(){
  }
  //选择答案
  inchoice(i,e,num){
    console.log(e)  
  }
  //获取key
  getObjectKeys(object){
    var keys = [];
    for (var property in object){
      keys.push(property);
    }
    console.log(keys)
    return keys;
  }
  inchange(i,e,t){
    if(t=='problem'){
      this.state.list[i].title = e.target.value;
    }else if(t=='analysis'){
      this.state.list[i].analysis = e.target.value;
    }else if(t=='relevant'){
      this.state.list[i].relevant = e.target.value;
    }
    let newlist = Object.assign([],this.state.list);
    this.setState({
        list: newlist
    })
    // console.log(this.state.list)
  }
  //正确答案
  sureChange(value){
    console.log(value)
  }
  listdata(){
    let list;
    if(this.state.list !== ""){
        list = this.state.list.map((item,i)=>{
            return (
              <div key={i} className="list">
                <p className="addquestion">问题1:</p>
                <Input placeholder="问题" onChange={(e)=>this.inchange(i,e,'problem')}/>
                <div className="addanswer">
                  答案：
                  <Select defaultValue='选择' onChange={(value)=> this.sureChange(value)} style={{ width: 110 }}>
                    {
                      item.answerlist.map((sureitem,surei)=>{
                        return(
                          <Option key={surei} className="select_op" value={surei}>{sureitem}</Option>
                        )
                      })
                    }
                  </Select>
                </div>
                {
                  item.answerlist.map((sureitem,surei)=>{
                    return (
                      <Input placeholder="{sureitem}选项描述" onChange={(e)=>this.inchoice(surei,e,surei)}/>
                    )
                  })
                }

                <Input placeholder="B" onChange={(e)=>this.inchoice(i,e,1)}/>
                <Input placeholder="C" onChange={(e)=>this.inchoice(i,e,2)}/>
                <Icon className="addanswer_icon" type="plus" />
                <Input placeholder="答案解析"  onChange={(e)=>this.inchange(i,e,'analysis')}/>
                <p className="addlink">相关链接：</p>
                <Input placeholder="相关链接"  onChange={(e)=>this.inchange(i,e,'relevant')}/>
              </div>
            )
        })
    }
    return list;
  }
  render(){
    return (
      <div className="addtopic">
        <h3>新建题库</h3>
        <Input placeholder="题库标题" />
        <TextArea placeholder="题库描述" rows={4} />
        {this.listdata()}
      </div>  
    );
  }
}

export default Nav;