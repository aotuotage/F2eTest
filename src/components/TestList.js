import React, { Component } from "react";
import axios from 'axios';

export default class TestList extends Component{
    constructor(props) {
        super(props);
        this.state={
            openshow: false,
            list:'',
            surenum:0,
            errornum:0
        }
        this.open = this.open.bind(this);
        this.choice = this.choice.bind(this);
    }
    componentWillMount() {
        let _this = this;
        //请求数据
        axios({
            methods: 'get',
            url: `https://www.xinwanju.cn/fetest?active=${_this.props.onactive}`,
            headers:{"Content-Type":"application/x-www-form-urlencoded"},
            }).then(function (response) {
                let newdata = response.data.map(function (item){
                    return {...item,state:false,openshow:false}
                })
                _this.setState({
                    list:newdata
                })
            })
            .catch(function (error) {
              console.log(error);
            })
    }
    //产看答案
    open(i){
        if(this.state.list[i].state == true){
            this.state.list[i].openshow = !this.state.list[i].openshow;
            let newlist = Object.assign([],this.state.list);
            this.setState({
                list: newlist
            })
        }else{
            this.props.showalert("大佬请先选择答案!")
        }
    }
    //选择答案
    choice(e,i){
        if(e.target.dataset.id != undefined){
            if(this.state.list[i].correct == e.target.dataset.id){
                //正确答案计数
                this.setState({
                    surenum: this.state.surenum+=1
                })
                //正确提示
                switch(this.state.surenum){
                    case 1:
                        this.props.showalert(`first blood !`)
                        break
                    case 2:
                        this.props.showalert(`double kill !`)
                        break 
                    case 3:
                        this.props.showalert(`triple kill !`)
                        break
                    case 4:
                        this.props.showalert(`quatary kill !`)
                        break  
                    case 5:
                        this.props.showalert(`penta kill !`)
                        break    
                    case 6:
                        this.props.showalert(`大佬超神了 !`)
                        break 
                    default:
                        this.props.showalert(`震惊 ! 大佬${this.state.surenum}杀了 !`)
                        break                            
                }
                judge(this)
            }else{
                //错误答案计数
                this.setState({
                    errornum: this.state.errornum+=1
                })
                this.props.showalert("菜逼加油啊!")
                judge(this)
            }
            //nav p0-p8定级
            function judge(_this){
                if(_this.state.surenum >= 3){
                    let start = _this.state.errornum/_this.state.surenum;
                    switch(true){
                        case start<=0.1:
                            _this.props.grading(8)
                            break
                        case start >0.1 && start<=0.2:
                            _this.props.grading(7)
                            break 
                        case start >0.2 && start<=0.3:
                            _this.props.grading(6)
                            break
                        case start >0.3 && start<=0.4:
                            _this.props.grading(5)
                            break  
                        case start >0.4 && start<=0.5:
                            _this.props.grading(4)
                            break    
                        case start >0.5 && start<=0.6:
                            _this.props.grading(3)
                            break 
                        case start >0.6 && start<=0.7:
                            _this.props.grading(2)
                            break 
                        case start>0.8:
                            _this.props.grading(1)
                            break                          
                    }
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
        let _this = this;
        if(this.state.list !== ""){
            list = this.state.list.map((item,i)=>{
                return (
                    <div className="list" key={i} onClick={(e)=>this.choice(e,i)}>
                        <p className="question"><span>问：</span>{item.title}</p>
                        <p className="answer">答：</p>
                        <ul className="answer_list">
                            {item.answer.map((item,i)=>{
                                return <li data-id={i} key={i}>{item}</li>
                            })}
                        </ul>
                        <div className="explain">
                            <p className="explain_title" onClick={()=>this.open(i)}>答案<span className={
                                item.openshow == true?'explain_triangle_df':'explain_triangle'
                            }></span></p>
                            {item.openshow  == true ?
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
    render() {
        return (
            <div>{this.listdata()}</div>
        );
    }
}