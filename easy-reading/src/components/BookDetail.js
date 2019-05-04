import React,{Component} from 'react';
import {Breadcrumb,Tabs} from 'antd';
import BookDetailCard from "./BookDetailCard";
import '../css/BookDetail.css';
import { Link } from "react-router-dom";
import MyPostComponent from "./MyPostComponent";
const TabPane = Tabs.TabPane;
export default class BookDetail extends Component{
    render(){
       return(
           <div className="bookDetail">
               <div className="header">
                   <Breadcrumb separator=">" >
                       <Breadcrumb.Item ><Link to="/index">首页</Link></Breadcrumb.Item>
                       <Breadcrumb.Item ><Link to="/bookCity">书城</Link></Breadcrumb.Item>
                       <Breadcrumb.Item ><Link to={`/bookCity/books/${this.props.match.params.id}`}>剑来</Link></Breadcrumb.Item>
                   </Breadcrumb>
               </div>
               <div className="content">
                    <BookDetailCard/>
               </div>
               <div className="card-container">
                   <Tabs type="card">
                       <TabPane tab="最新章节" key="1">
                           <p>第八百九十章 露出笑脸<span  className="time">. 9小时前</span></p>
                           <p className="con">说时，就两个老女人走到木桶旁，从旁边拉过屏风，把木桶遮挡的严实，一个老女人同时说道：“两位...”</p>
                       </TabPane>
                       <TabPane tab="作品信息" key="2">
                           <p className="detailedIns">“冤有头，债有主，你我往日无怨，近日无仇，在下职责所在，奉命行事，得罪了。”
                               王腾念了一遍工作语，一刀斩下犯人头颅。
                               然后，一个白色光团从囚犯身体里冒出。
                               他的目光不由看向这个白色光团。
                               基础刀法！
                               在这光团上面，还有着‘拾取’字样。
                               “拾取！”
                               王腾意念一动。</p>
                       </TabPane>
                       <TabPane tab="作品讨论" key="3">
                           <div>
                           <MyPostComponent/>
                           </div>
                       </TabPane>
                   </Tabs>
               </div>
           </div>
       );
    }
}

