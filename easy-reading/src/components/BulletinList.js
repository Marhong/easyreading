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
            list: [{id:"54242424",title:"阅文侠之精神征文大赛",time:1556676000,content:"侠者，不惜身，不惜财，敢为常人所不敢为之事。义者，天下公理，道德共识。简而言之，侠是行为，义为准则。如果没有义字当先，行为是否能称为侠，就值得三思了，毕竟不惜身，不惜财，敢为常人所不敢为之事，邪魔外道亦是如此。"},
                {id:"54242423234",title:"关于网站点击数据变化的情况说明",time:1555470058,content:"为提供更一致的数据评判标准，起点客户端作品介绍页中的点击数据，将统一切换为“阅文点击”数据，阅文点击数为阅文集团统一点击数据计算口径，本次切换于2019年4月16日正式生效。\n" +
                    "由于客户的版本问题，Androidv7.8.4与iOSv5.8.4及以下旧版本，作品介绍页中的作品点击数据单位仍然会显示为“点击”，但实际数据源为阅文点击，部分作品会感知到对应的数据发生变化，待升级最新客户端版本后，即可显示正确的数据单位。"},],
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