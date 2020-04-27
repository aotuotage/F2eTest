import React, { Component } from "react";
import { Input, Select, Icon, Button } from 'antd';
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
      pagedata:{
        alertshow: false,
        alerttext:'',
      },
      reqdata:{
        itembankTitle:'',
        describe:'',
        list:[
          {
            title: '',
            answer:["1.答案输入","2.答案输入"],
            answerlist: ['1','2'],
            rightkey:'',
            relevant:'',
            analysis:''
          },
          {
            title: '',
            answer:["1.答案输入","2.答案输入"],
            answerlist: ['1','2'],
            rightkey:'',
            relevant:'',
            analysis:''
          }
        ]
      }
    }
  }
  componentDidMount(){
  }
  //写入答案
  inchoice(i,thei,e){
    this.state.reqdata.list[i].answer[thei] = e.target.value;
    this.forceUpdate();
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
    let _this = this;
    switch(t){
      case 'itembankTitle':
        _this.state.reqdata.itembankTitle = e.target.value
        break;
      case 'describe':
        _this.state.reqdata.describe = e.target.value
        break;
      case 'problem':
        _this.state.reqdata.list[i].title = e.target.value;
        break;
      case 'analysis':
        _this.state.reqdata.list[i].analysis = e.target.value;
        break;  
      case 'relevant':
        _this.state.reqdata.list[i].relevant = e.target.value;
        break;  
    }
    this.forceUpdate();
  }
  //选择正确答案
  sureChange(i,value){
    this.state.reqdata.list[i].rightkey = value;
    this.forceUpdate(); 
  }
  //添加答案输入
  addanswer(i){
    let listnum = this.state.reqdata.list[i].answer.length + 1;
    this.state.reqdata.list[i].answer.push(`${listnum}.答案输入`);
    this.state.reqdata.list[i].answerlist.push(`${listnum}`);
    this.forceUpdate(); 
  }
  //增加问答项目
  addanswerlist(){
    let listnum = {
    title: '',
    answer:["1.答案输入","2.答案输入"],
    answerlist: ['1','2'],
    rightkey:'',
    relevant:'',
    analysis:''};
    this.state.reqdata.list.push(listnum);
    this.forceUpdate(); 
  }
  //确认提交
  surebtn(){
    let onstate;
    if(this.state.reqdata.itembankTitle == '' || this.state.reqdata.describe == ''){
      this.showalert("标题或描述不能为空");
      onstate = false;
    }else{
      onstate = true;
    }
    this.state.reqdata.list.map((item,i)=>{
      if(item.title == '' || item.rightkey == '' || item.analysis == ''){
        this.showalert("问题，正确答案及解析不能为空");
        onstate = false;
      }else{
        item.answer.map((it)=>{
          var patt=/.答案输入/g;
          let seachtext = patt.test(it)
          if(seachtext){
            this.showalert("请输入问题答案");
            onstate = false;
          }else{
            onstate = true;
          }
        })
      }
    })
    if(onstate){
      console.log("通过")
    }
    console.log(this.state);
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
      },2000)
  }
  listdata(){
    let list;
    if(this.state.reqdata.list !== ""){
        list = this.state.reqdata.list.map((item,i)=>{
            return (
              <div key={i} className="list">
                <h3 className="addquestion">问题{i+1}:</h3>
                <Input placeholder="问题" onChange={(e)=>this.inchange(i,e,'problem')}/>
                <h3 className="listanswer_title">答案输入：</h3>
                {
                  item.answer.map((theanswer,thei)=>{
                    return(
                      <Input key={thei} placeholder={theanswer} onChange={(e)=>this.inchoice(i,thei,e)}/>
                    )
                  })
                }
                <Icon className="addanswer_icon" onClick={(e)=>this.addanswer(i)} type="plus" />
                <div className="addanswer">
                  正确答案：
                  <Select defaultValue='选择' onChange={(value)=> this.sureChange(i,value)} style={{ width: 110 }}>
                    {
                      item.answerlist.map((sureitem,surei)=>{
                        return(
                          <Option key={surei} className="select_op" value={surei}>{sureitem}</Option>
                        )
                      })
                    }
                  </Select>
                </div>
                <Input placeholder="答案解析"  onChange={(e)=>this.inchange(i,e,'analysis')}/>
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
        <h2>新建题库</h2>
        <Input  onChange={(e)=>this.inchange('',e,'itembankTitle')} placeholder="题库标题" />
        <TextArea  onChange={(e)=>this.inchange('',e,'describe')} placeholder="题库描述" rows={4} />
        {this.listdata()}
        <Icon className="addanswer_icon_big" onClick={(e)=>this.addanswerlist()} type="plus" />
        <Button type="primary" onClick={(e)=>this.surebtn()} className="surebtn" block>
          确认提交
        </Button>
        {  
          this.state.alertshow === true ? <div className="alertshow">{this.state.alerttext}</div>: ''
        }
      </div>  
    );
  }
}

export default Nav;