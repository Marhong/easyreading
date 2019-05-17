import React,{Component} from 'react';
import {Breadcrumb} from 'antd';
import moment from 'moment';
import '../css/BulletinItem.css';
import { Link } from "react-router-dom";
import {withRouter} from 'react-router';
import reqwest from "reqwest";
const bulletinUrl = "http://localhost:5000/easyreading/bulletin";
class BulletinItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            bulletin:{},
        }

    }
    componentDidMount(){
        // 可以获取从BulletinList传递过来的bulletin对象，不需要再从服务器获取数据
        console.log("传递的对象为：",this.props.location.query);
        console.log("当前公告ID:",this.props.match.params.id);
        // 从服务器获取所有bulletin
        reqwest({
            url:`${bulletinUrl}/${this.props.match.params.id}`,
            type:'json',
            method:'get',
            error:(err)=>console.log(err),
            success:(res)=>{
                this.setState({...this.state,bulletin:res});
            }
        });
    }
    render(){
        const bulletin = this.state.bulletin;
       // const bulletin = JSON.parse(sessionStorage.getItem("bulletin")) || this.props.location.state || {title:"阅文侠之精神征文大赛",time:1556676000,content:"侠者，不惜身，不惜财，敢为常人所不敢为之事。义者，天下公理，道德共识。简而言之，侠是行为，义为准则。如果没有义字当先，行为是否能称为侠，就值得三思了，毕竟不惜身，不惜财，敢为常人所不敢为之事，邪魔外道亦是如此。"};
        return(
            <div className="bulletinItem">
                <Breadcrumb separator=">" >
                    <Breadcrumb.Item ><Link to={`/index`} >首页</Link></Breadcrumb.Item>
                    <Breadcrumb.Item ><Link to={`/bulletinList`} >公告列表</Link></Breadcrumb.Item>
                    <Breadcrumb.Item ><Link to={`/bulletinList/${this.props.match.params.id}`} style={{color:"#40a9ff"}}>公告详情</Link></Breadcrumb.Item>
                </Breadcrumb>
                <h2 style={{fontSize:24,marginTop:10}}> {bulletin.title}</h2>
                <p><i className="iconfont icon-shijian"/> {moment(bulletin.time).format('YYYY-MM-DD HH:mm:ss')}</p>
                <p>各位易读网的用户：</p>
                <p>{bulletin.content}</p>
                <p style={{float:"right"}}>-------易读网</p>
            </div>
        );
    }
}
export default withRouter(BulletinItem)