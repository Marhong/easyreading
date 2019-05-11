import React,{Component} from 'react';
import { Link } from "react-router-dom";
// 展示站内公告
export default class IndexHeaderRight extends Component{
    render(){
        // 从服务器获取前num条公告的url：localhost:3000/easyreading/bulletinList/bulletinBoard/:num
        // 这里num默认为8
        const news = [{id:"n1",type:"资讯",title:"随手举报参与有奖",content:"中国网络文学用户超4亿，阅文平台内月活跃用户达到2.1亿。要保持用户对我们的喜爱，在对原创内容的品质把控工作上，我们不惜大投入，建立专项技术检测机制，设立专业的人工团队，来净化阅文网络生态环境。",time:1556676000},{id:"n21",type:"资讯",title:"2019悬疑征文",content:"明天又要去练车",time:1556676000},
            {id:"n451",type:"资讯",title:"乘风御剑新书上线!",content:"今天星期一",time:1556676000},{id:"n231",type:"资讯",title:"对话小说征文大赛",content:"感觉膝盖更疼了",time:1556676000},
            {id:"n1s",type:"资讯",title:"奋斗，点燃青春热血",content:"不显示",time:1556676000},{id:"n2ds1",type:"资讯",title:"短篇创意故事征文大赛",content:"明天又要去练车",time:1556676000},
            {id:"n451sd",type:"资讯",title:"我是三国霸道男!",content:"今天星期一",time:1556676000},{id:"nsd231",type:"资讯",title:"二次元樱花祭征文",content:"感觉膝盖更疼了",time:1556676000}];
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