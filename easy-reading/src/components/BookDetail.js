import React,{Component} from 'react';
import {Breadcrumb,Tabs} from 'antd';
import BookDetailCard from "./BookDetailCard";
import '../css/BookDetail.css';
import { Link } from "react-router-dom";
import MyPostComponent from "./MyPostComponent";
const TabPane = Tabs.TabPane;
export default class BookDetail extends Component{
    componentDidMount(){
        document.documentElement.style.backgroundColor = "white";
        document.body.style.backgroundColor = "white";
    }
    render(){
        console.log("书籍id:",this.props.match.params.id);
        // 通过this.props.match.params.id传递过来的书籍id参数，可以从服务器获取书籍详细信息
        // 从服务器获取数据的url: localhost:3000/easyreading/books/:id
        const book = {id:"book20190100",name:"仙宫",isFinished:false,isFree:true,author:"大眼怪",tags:["武侠","仙侠","幻想"],rankNumber:40,wordNumbers:231454545,clickedTimes:1514514,membershipClicked:8452852,recommend:525742,intro:"修仙觅长生，热血任逍遥，踏莲曳波涤剑骨，凭虚御风塑圣魂！修仙觅长生，热血任逍遥，踏莲曳波涤剑骨，凭虚御风塑圣魂！修仙觅长生，热血任逍遥，踏莲曳波涤剑骨，凭虚御风塑圣魂！",href:"",imgSrc:"https://bookcover.yuewen.com/qdbimg/349573/1013561350/180",preface:`"冤有头，债有主，你我往日无怨，近日无仇，在下职责所在，奉命行事，得罪了。”
                               王腾念了一遍工作语，一刀斩下犯人头颅。
                               然后，一个白色光团从囚犯身体里冒出。
                               他的目光不由看向这个白色光团。
                               基础刀法！
                               在这光团上面，还有着‘拾取’字样。
                               “拾取！”
                               王腾意念一动。`};
        // 这里还要展示最新章节的信息，所以还要通过该book获取到他的最新章节
        // 从服务器获取章节的url: localhost:3000/easyreading/chapters/:id

        const latestChapter = {};
       return(
           <div className="bookDetail">
               <div className="header">
                   <Breadcrumb separator=">" >
                       <Breadcrumb.Item ><Link to="/index">首页</Link></Breadcrumb.Item>
                       <Breadcrumb.Item ><Link to="/bookCity">书城</Link></Breadcrumb.Item>
                       <Breadcrumb.Item ><Link to={`/bookCity/books/${this.props.match.params.id}`} style={{color:"#40a9ff"}}>剑来</Link></Breadcrumb.Item>
                   </Breadcrumb>
               </div>
               <div className="content">
                    <BookDetailCard book={book}/>
               </div>
               <div className="card-container">
                   <Tabs type="card">
                       <TabPane tab="最新章节" key="1">
                           <p>第八百九十章 露出笑脸<span  className="time">. 9小时前</span></p>
                           <p className="con">说时，就两个老女人走到木桶旁，从旁边拉过屏风，把木桶遮挡的严实，一个老女人同时说道：“两位...”</p>
                       </TabPane>
                       <TabPane tab="作品信息" key="2">
                           <p className="detailedIns">{book.preface}</p>
                       </TabPane>
                       <TabPane tab="作品讨论" key="3">
                           <div>
                           <MyPostComponent id={book.id}/>
                           </div>
                       </TabPane>
                   </Tabs>
               </div>
           </div>
       );
    }
}

