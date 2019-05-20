import React,{Component} from 'react';
import {List, Button,Breadcrumb,Typography,Skeleton} from 'antd';
import reqwest from 'reqwest';
import moment from 'moment';
import '../css/BulletinList.css';
import { Link } from "react-router-dom";
import IndexHeaderSearch from "./IndexHeaderSearch";
const bulletinUrl = "http://localhost:5000/easyreading/bulletin";
const num = 8; // 获取最近的8条公告
export default class BulletinList extends Component{
    constructor(props){
        super(props);
        this.state = {
            initLoading: false,
            loading: false,
            data: [],
            // 从服务器获取数据的url: localhost:3000/easyreading/bulletinList/:start
            // start初始化为0，之后每点击“加载更多”按钮一次，start+=10
            list:[],
        }
    }
   componentDidMount() {

       let bulletinList = [];
       // 从服务器获取所有bulletin
       reqwest({
           url:`${bulletinUrl}/top/${num}`,
           type:'json',
           method:'get',
           error:(err)=>console.log(err),
           success:(res)=>{
               this.setState({...this.state,list:res});
           }
       });
    }

/*    // 获取json数据
    getData = (callback) => {
        reqwest({
            url: fakeDataUrl,
            type: 'json',
            method: 'get',
            contentType: 'application/json',
            success: (res) => {
                console.log(res);
                callback(res);
            },
        });
    }*/

    // 点击获取更多按钮
    onLoadMore = () => {
        let length = this.state.list.length;
        // 从服务器获取所有bulletin
        reqwest({
            url:`${bulletinUrl}/more/${length}`,
            type:'json',
            method:'get',
            error:(err)=>console.log(err),
            success:(res)=>{
                this.setState({...this.state,list:res});
            }
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
            <div>
                <IndexHeaderSearch/>
            <div className="bulletinList">
                    <Breadcrumb separator=">" >
                        <Breadcrumb.Item > <Link to={`/`} >首页</Link></Breadcrumb.Item>
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
                        <Link to={`/bulletinList/${item.id}`}>
                       {/* <Link to={`/bulletinList/${item.id}`} >*/}
                            <List.Item>
                                <Skeleton avatar title={false} loading={item.loading} active>
                                    <span  className="item">[资讯]  {item.title} <span className="time" > {moment(item.time).format('YYYY-MM-DD HH:mm:ss')}</span></span>
                                </Skeleton>
                            </List.Item>
                        </Link>)}

                />
            </div>
            </div>
        );
    }
}