import React,{Component} from 'react';

// 展示站内公告
export default class IndexHeaderRight extends Component{
    render(){
        const news = [{id:"n1",type:"资讯",title:"悬疑征文悬疑征文悬疑征文",href:""},{id:"n1",type:"资讯",title:"2019悬疑征文",href:""},
            {id:"n1",type:"资讯",title:"2019悬疑征文",href:""},{id:"n1",type:"资讯",title:"2019悬疑征文",href:""}];
        return(
            <div >
                <dl>
                    <dt><h4>站内公告</h4></dt>
                    {news.map((news) => {
                        return <dd key={news.id}>[{news.type}] {news.title.length >10 ? `${news.title.slice(0,10)}...` : news.title}</dd>
                    })}

                </dl>
            </div>
        );
    }
}