import React,{Component} from 'react';
import {Breadcrumb,Tabs} from 'antd';
import BookDetailCard from "./BookDetailCard";
import '../css/BookDetail.css';
import { Link } from "react-router-dom";
import MyPostComponent from "./MyPostComponent";
import moment from 'moment';
import reqwest from "reqwest";
import {message} from "antd/lib/index";
const bookUrl = "http://localhost:5000/easyreading/book";
const TabPane = Tabs.TabPane;
export default class BookDetail extends Component{
    constructor(props){
        super(props);
        let user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
        let userId = user ? user.id : null;
        let bookId = this.props.match.params.id;
        this.state = {
            book:{},
            latestChapter:{},
            bookId:bookId,
        }

    }
    componentWillMount(){
        document.documentElement.style.backgroundColor = "white";
        document.body.style.backgroundColor = "white";
        // 获取传递过来的bookId参数
        let bookid = this.props.match.params.id;
        // 通过bookId从服务器获取书籍
        reqwest({
            url:`${bookUrl}/${bookid}`,
            type:'json',
            method:'get',
            error:(err)=>console.log(err),
            success:(res)=>{
                this.setState({...this.state,book:res,latestChapter:res.latestChapter});
            }
        });
    }

    render(){
        const latestChapter = this.state.latestChapter;
        const book =this.state.book;
       return(
           <div className="bookDetail">
               <div className="header">
                   <Breadcrumb separator=">" >
                       <Breadcrumb.Item ><Link to="/index">首页</Link></Breadcrumb.Item>
                       <Breadcrumb.Item ><Link to="/bookCity">书城</Link></Breadcrumb.Item>
                       <Breadcrumb.Item ><Link to={`/bookCity/books/${this.props.match.params.id}`} style={{color:"#40a9ff"}}>{book.name}</Link></Breadcrumb.Item>
                   </Breadcrumb>
               </div>
               <div className="content">
                    <BookDetailCard book={book}  />
               </div>
               <div className="card-container">

                   <Tabs type="card">
                       <TabPane tab="最新章节" key="1">
                           <p>{latestChapter.name}<span  className="time">{latestChapter.time ? moment(latestChapter.time).format('YYYY-MM-DD HH:mm:ss') : ""}</span></p>
                           {/*这里怎么展示最近更新章节的部分内容还没想好怎么实现*/}
                          {/* <p className="con">{latestChapter.content ? latestChapter.content.slice(0,150) : ""}</p>*/}
                           <p className="content"
                                dangerouslySetInnerHTML={{__html: latestChapter.content ? latestChapter.content.slice(0,150) : ""}}/>
                       </TabPane>
                       <TabPane tab="作品信息" key="2">
                           <p className="detailedIns">{book.preface}</p>
                       </TabPane>
                       <TabPane tab="作品讨论" key="3">
                           <div>
                           <MyPostComponent id={this.state.bookId}/>
                           </div>
                       </TabPane>
                   </Tabs>
               </div>
           </div>
       );
    }
}

