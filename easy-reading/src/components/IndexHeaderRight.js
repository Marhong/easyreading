import React,{Component} from 'react';
import { Link } from "react-router-dom";
// 展示站内公告
export default class IndexHeaderRight extends Component{
    render(){
        const news = [{id:"n1",type:"资讯",title:"悬疑征文悬疑征文悬疑征文",href:""},{id:"n21",type:"资讯",title:"2019悬疑征文",href:""},
            {id:"n451",type:"资讯",title:"2019悬疑征文",href:""},{id:"n231",type:"资讯",title:"2019悬疑征文",href:""}];
        return(
            <div className="bulletinBoard">
                <dl>
                    <dt><strong> <Link to="/bulletinList">站内公告</Link></strong></dt>
                    {news.map((news) => {
                        return <dd key={news.id}>[{news.type}] {news.title.length >10 ? `${news.title.slice(0,10)}...` : news.title}</dd>
                    })}

                </dl>
            </div>
        );
    }
}