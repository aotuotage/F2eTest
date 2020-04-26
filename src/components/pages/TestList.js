import React, { Component } from "react";
import axios from 'axios';
import { HashRouter as Router, Link, Route } from 'react-router-dom';
import url from 'url';

export default class TestList extends Component{
    constructor(props) {
        super(props);
        this.state={
            openshow: false,
            list:'',
            surenum:0,
            errornum:0,
            errdatalist:[],
            alertshow: false,
            alerttext:'',
            alertshow2:false,
            alerttext2:'',
            active: 1,
            gradingnum:0,
            accuracy:0,
            listnum:0
        }
        this.open = this.open.bind(this);
        this.choice = this.choice.bind(this);
    }
    componentDidMount() {
        let search = this.props.location.search;
        let id = url.parse(search, true).query.id;
        console.log(id)
        let _this = this;
        //请求数据
        axios({
            methods: 'get',
            url: `https://www.xinwanju.cn/fetest?active=${id}`,
            headers:{"Content-Type":"application/x-www-form-urlencoded"},
            }).then(function (response) {
                let newdata = response.data.map(function (item){
                    return {...item,state:false,openshow:false}
                })
                _this.setState({
                    list:newdata
                })
                _this.state.listnum = newdata.length;
            })
            .catch(function (error) {
              console.log(error);
            })
    }
    //产看答案
    open(i){
        if(this.state.list[i].state === true){
            this.state.list[i].openshow = !this.state.list[i].openshow;
            let newlist = Object.assign([],this.state.list);
            this.setState({
                list: newlist
            })
        }else{
            this.showalert("大佬请先选择答案!")
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
        },1000)
    }
    //选择答案
    choice(e,i){
        if(e.target.dataset.id !== undefined){
            if(this.state.list[i].correct === e.target.dataset.id){
                //正确答案计数
                this.setState({
                    surenum: this.state.surenum+=1
                })
                //正确提示
                switch(this.state.surenum){
                    case 1:
                        this.showalert(`first blood !`)
                        break
                    case 2:
                        this.showalert(`double kill !`)
                        break 
                    case 3:
                        this.showalert(`triple kill !`)
                        break
                    case 4:
                        this.showalert(`quatary kill !`)
                        break  
                    case 5:
                        this.showalert(`penta kill !`)
                        break    
                    case 6:
                        this.showalert(`大佬超神了 !`)
                        break 
                    default:
                        this.showalert(`震惊 ! 大佬${this.state.surenum}杀了 !`)
                        break                            
                }
                judge(this)
            }else{
                //错误答案计数
                this.setState({
                    errornum: this.state.errornum+=1
                })
                this.showalert("菜逼加油啊!")
                judge(this)
                let errdata = {
                    title: this.state.list[i].title,
                    explain: this.state.list[i].explain,
                    link: this.state.list[i].link
                }
                this.state.errdatalist.push(errdata);
                let obj = {};
                let person;
                person = this.state.errdatalist.reduce((cur,next) => {
                    if(obj[next.title] == undefined){
                        obj[next.title] = true && cur.push(next)
                    }
                    return cur;
                },[])
                let newerrlist = Object.assign([],person);
                this.setState({
                    errdatalist: newerrlist
                })
            }
            //正确率定级
            function judge(_this){
                if(_this.state.surenum >= 3){
                    _this.state.accuracy = _this.state.surenum/_this.state.listnum;
                }
            }
            this.state.list[i].state = true;
            let newlist = Object.assign([],this.state.list);
            this.setState({
                list: newlist
            })
        }
    }
    listdata(){
        let list;
        if(this.state.list !== ""){
            list = this.state.list.map((item,i)=>{
                return (
                    <div className="list" key={i} onClick={(e)=>this.choice(e,i)}>
                        <p className="question"><span>{i+1}问：</span>{item.title}</p>
                        <p className="answer">答：</p>
                        <ul className="answer_list">
                            {item.answer.map((item,i)=>{
                                return <li data-id={i} key={i}>{item}</li>
                            })}
                        </ul>
                        <div className="explain">
                            <p className="explain_title" onClick={()=>this.open(i)}>答案<span className={
                                item.openshow === true?'explain_triangle_df':'explain_triangle'
                            }></span></p>
                            {item.openshow  === true ?
                                <div className="explain_content">
                                    <p dangerouslySetInnerHTML={{__html: item.explain}}></p>
                                    <h3>相关链接：<a href={item.link}>{item.link}</a></h3>
                                </div>
                            : ''}
                        </div>
                    </div> 
                )
            })
        }
        return list;
    }
    errlistfn(){
        let errlist;
        if(this.state.errdatalist.length !== 0){
            errlist = this.state.errdatalist.map((item,i)=>{
                return(
                    <div key={i} className="err_list">
                        <p className="question"><span>错题{i+1}：</span>{item.title}</p>
                        <p className="answer_p"><span>答案：</span>{item.explain}</p>
                        <h3 className="err_relevant">相关链接：<a href={item.link}>{item.link}</a></h3>
                    </div>
                )
            })
        }
        return errlist;
    }
    render() {
        return (
            <>
            <div className="answer_title">{this.listdata()}</div>
            <div className="errrep">
                <h3 className="errrep_title">测试报告:
                    <span className="errrep_sure">正确次数:{this.state.surenum}</span>
                    <span className="errrep_num">错误次数:{this.state.errornum}</span>
                    <span className="errrep_sure">正确率:{this.state.accuracy}</span>
                </h3>
                <div>{this.errlistfn()}</div>
            </div>
            {
                this.state.alertshow === true ? <div className="alertshow">{this.state.alerttext}</div>: ''
            }
            {
                this.state.alertshow2 === true ? <div className="alertshow2">{this.state.alerttext2}</div>: ''
            }
            </>
        );
    }
}