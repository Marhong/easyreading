import React,{Component} from 'react';
import { Link } from "react-router-dom";
// 展示站内公告
export default class IndexHeaderRight extends Component{
    render(){
        // 从服务器获取前num条公告的url：localhost:3000/easyreading/bulletinList/bulletinBoard/:num
        // 这里num默认为8
        const news = [{id:"n1",type:"资讯",title:"悬疑征文悬疑征文悬疑征文",content:"不显示",time:1556676000},{id:"n21",type:"资讯",title:"2019悬疑征文",content:"明天又要去练车",time:1556676000},
            {id:"n451",type:"资讯",title:"2019悬疑征文",content:"今天星期一",time:1556676000},{id:"n231",type:"资讯",title:"2019悬疑征文",content:"感觉膝盖更疼了",time:1556676000}];
        return(
            <div className="bulletinBoard">
                <dl>
                    <dt><strong> <Link to="/bulletinList">站内公告</Link></strong></dt>
                    {news.map((news) => {
                            return  <Link to={{ pathname: `/bulletinList/${news.id}`, bulletin:news}} key={news.id}><dd >[{news.type}] {news.title.length >10 ? `${news.title.slice(0,10)}...` : news.title}</dd></Link>
                        {/*return <Link to={`/bulletinList/${news.id}`} key={news.id}><dd >[{news.type}] {news.title.length >10 ? `${news.title.slice(0,10)}...` : news.title}</dd></Link>*/}
                    })}

                </dl>
            </div>
        );
    }
}