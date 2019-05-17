import React,{Component} from 'react';
import { Link } from "react-router-dom";
import reqwest from "reqwest";
const bulletinUrl = "http://localhost:5000/easyreading/bulletin";
const num = 8; // 获取最近的8条公告
// 展示站内公告
export default class IndexHeaderRight extends Component{
    constructor(props){
        super(props);
        this.state = {
            bulletinList :[],
        }
    }
    componentDidMount(){
        let bulletinList = [];
        // 从服务器获取所有bulletin
        reqwest({
            url:`${bulletinUrl}/top/${num}`,
            type:'json',
            method:'get',
            error:(err)=>console.log(err),
            success:(res)=>{
                this.setState({...this.state,bulletinList:res});
            }
        });

    }
    render(){
        const news = this.state.bulletinList;
        return(
            <div className="bulletinBoard">
                <dl>
                    <dt><strong> <Link to="/bulletinList">站内公告</Link></strong></dt>
                    {news.map((news) => {
                            return  <Link to={{ pathname: `/bulletinList/${news.id}`, bulletin:news}} key={news.id}><dd >[{news.type}] {news.title.length >10 ? `${news.title.slice(0,10)}...` : news.title}</dd></Link>
                    })}

                </dl>
            </div>
        );
    }
}