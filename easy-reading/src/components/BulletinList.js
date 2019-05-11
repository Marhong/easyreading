import React,{Component} from 'react';
import {List, Button,Breadcrumb,Typography,Skeleton} from 'antd';
import reqwest from 'reqwest';
import moment from 'moment';
import '../css/BulletinList.css';
import { Link } from "react-router-dom";
const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;
export default class BulletinList extends Component{
    constructor(props){
        super(props);
        this.state = {
            initLoading: false,
            loading: false,
            data: [],
            // 从服务器获取数据的url: localhost:3000/easyreading/bulletinList/:start
            // start初始化为0，之后每点击“加载更多”按钮一次，start+=10
            list:[{id:"n1",type:"资讯",title:"随手举报参与有奖",content:"中国网络文学用户超4亿，阅文平台内月活跃用户达到2.1亿。要保持用户对我们的喜爱，在对原创内容的品质把控工作上，我们不惜大投入，建立专项技术检测机制，设立专业的人工团队，来净化阅文网络生态环境。",time:1556676000},{id:"n21",type:"资讯",title:"2019悬疑征文",content:"明天又要去练车",time:1556676000},
                {id:"n451",type:"资讯",title:"乘风御剑新书上线!",content:"今天星期一",time:1556675000},{id:"n231",type:"资讯",title:"对话小说征文大赛",content:"感觉膝盖更疼了",time:1556646000},
                {id:"n1s",type:"资讯",title:"奋斗，点燃青春热血",content:"不显示",time:15566176000},{id:"n2ds1",type:"资讯",title:"短篇创意故事征文大赛",content:"明天又要去练车",time:1556206000},
                {id:"n451sd",type:"资讯",title:"我是三国霸道男!",content:"今天星期一",time:15556676000},{id:"nsd231",type:"资讯",title:"二次元樱花祭征文",content:"感觉膝盖更疼了",time:1555676000}],
        }
    }
/*    componentDidMount() {
        this.getData((res) => {
            this.setState({
                initLoading: false,
                data: res.results,
                list: res.results,
            });
        });
    }*/

    // 获取json数据
    getData = (callback) => {
        reqwest({
            url: fakeDataUrl,
            type: 'json',
            method: 'get',
            contentType: 'application/json',
            success: (res) => {
                callback(res);
            },
        });
    }

    // 点击获取更多按钮
    onLoadMore = () => {
        this.setState({
            loading: true,
            list: this.state.data.concat([...new Array(count)].map(() => ({ loading: true, name: {} }))),
        });
        this.getData((res) => {
            const data = this.state.data.concat(res.results);
            this.setState({
                data,
                list: data,
                loading: false,
            }, () => {
                // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
                // In real scene, you can using public method of react-virtualized:
                // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
                window.dispatchEvent(new Event('resize'));
            });
        });
    }
    render(){
        const { initLoading, loading, list } = this.state;
        const loadMore = !initLoading && !loading ? (
            <div style={{
                textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px',
            }}
            >
                <Button onClick={this.onLoadMore}>加载更多</Button>
            </div>
        ) : null;
        return(
            <div className="bulletinList">
                    <Breadcrumb separator=">" >
                        <Breadcrumb.Item > <Link to={`/index`} >首页</Link></Breadcrumb.Item>
                        <Breadcrumb.Item > <Link to={`/bulletinList`} style={{color:"#40a9ff"}}>公告列表</Link></Breadcrumb.Item>
                    </Breadcrumb>
                <h2 style={{fontSize:24,marginTop:10}}>最新动态</h2>

                <List
                    className="demo-loadmore-list"
                    size="large"
                    footer={loadMore}
                    loading={initLoading}
                    itemLayout="horizontal"
                    bordered
                    dataSource={list}
                    style={{width:1000}}
                    renderItem={item => (
                        <Link to={{ pathname: `/bulletinList/${item.id}`, bulletin:item}}>
                       {/* <Link to={`/bulletinList/${item.id}`} >*/}
                            <List.Item>
                                <Skeleton avatar title={false} loading={item.loading} active>
                                    <span  className="item">[资讯]  {item.title} <span className="time" > {moment(item.time*1000).format('YYYY-MM-DD HH:mm:ss')}</span></span>
                                </Skeleton>
                            </List.Item>
                        </Link>)}

                />
            </div>
        );
    }
}