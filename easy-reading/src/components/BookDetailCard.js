import React,{Component} from 'react';
import {Button,Tag,Rate} from 'antd';
import '../css/BookDetailCard.css';
import ReportItem from "./ReportItem";
import { Link } from "react-router-dom";
import {message} from "antd/lib/index";
import reqwest from "reqwest";
const bookUrl = "http://localhost:5000/easyreading/book";
const collectUrl = "http://localhost:5000/easyreading/collect";
export default class BookDetailCard extends Component{
    constructor(props){
        super(props);
        let user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
        let userId = user ? user.id : null;
        this.state = {
            book:{},
            userId:userId,
        };

    }
    componentWillReceiveProps(props){
        // 当该组件创建时，认为该书被点击浏览过一次，该书clickNumbers+1
        let book = props.book;
        reqwest({
            url:`${bookUrl}/click`,
            type:'json',
            method:'post',
            data:{userId:this.state.userId,bookId:book.id,time:Date.now()},
            error:(err)=>{
                console.log(err)},
            success:(res)=>{
                console.log("查看书籍详情成功");
                let memberClickNumbers= this.state.userId ? book.memberClickNumbers+1 : book.memberClickNumbers;
                this.setState({...this.state,book:{...book,clickNumbers:book.clickNumbers+1,memberClickNumbers:memberClickNumbers}});
            }
        });

    }
    handleChange = (bookId,number) => {
        reqwest({
            url:`${bookUrl}/rank`,
            type:'json',
            method:'post',
            data:{userId:this.state.userId,bookId:bookId,score:number*2},
            error:(err)=>{
                message.error("评分失败！");
                console.log(err)},
            success:(res)=>{
                message.success("评分成功！");
                if(res.code === 200){
                    // 之前没打过评分
                    this.setState((preState) => {
                        let preBook = preState.book;
                        let oldScore = 0;
                        if(String(preBook.score) !== "NaN"){
                            oldScore = preBook.score;
                        }
                        let newScore = ((number*2)+(oldScore*preBook.rankNumbers))/(preBook.rankNumbers+1).toFixed(1);
                        return {...preState,book:{...preBook,score:newScore,rankNumbers:preBook.rankNumbers+1}};
                    });
                }else if(res.code === 300 && res.oldScore){

                    // 之前打过评分
                    this.setState((preState) => {
                        let preBook = preState.book;
                        let newScore = (((number*2)+(preBook.score*preBook.rankNumbers) - res.oldScore)/(preBook.rankNumbers)).toFixed(1);

                        return {...preState,book:{...preBook,score:newScore}};
                    });
                }

            }
        });
    };
    // 用户点击“投推荐票”
    handleRecommend(bookId,e){

        reqwest({
            url:`${bookUrl}/recommend`,
            type:'json',
            method:'post',
            data:{userId:this.state.userId,bookId:bookId},
            error:(err)=>{
                message.error("推荐书籍失败！");
                console.log(err)},
            success:(res)=>{
                message.success("推荐书籍成功！");
                this.setState((preState) => {
                    let preBook = preState.book;
                    return {...preState,book:{...preBook,recommendNumbers:preBook.recommendNumbers+1}};
                });
            }
        });
    }
    // 用户收藏书籍
    handleCollect(bookId,e){
        reqwest({
            url:`${collectUrl}/add`,
            type:'json',
            method:'post',
            data:{userId:this.state.userId,bookId:bookId,time:Date.now()},
            error:(err)=>{
                message.error("收藏书籍失败！");
                console.log(err)},
            success:(res)=>{
                if(res){
                    message.success("收藏书籍成功！");
                }else{
                    message.warn("已经收藏过该书!");
                }
            }
        });
    }
    handleSubmit(values){
        console.log("BookDetailCard",values);
    }
    render(){
        let book = this.state.book;
        return(
            <div className="detailCard">
                <div className="fImg">
                    <img src={`${bookUrl}/image/${book.imgUrl}`}/>
                </div>
                <div className="sInf">
                    <h1>{book.name}<span className="author">{book.author}著</span></h1>
                    <div className="tags"><Tag color="blue">{book.isFree?"连载":"完结"}</Tag><Tag color="blue">{book.isFree?"免费":"VIP"}</Tag>
                        <Tag color="red" >{book.type}</Tag>
                        {book.keywords ?
                            (book.keywords.split(",")).map((item,index) => {
                                return <Tag color="red" key={index}>{item}</Tag>
                            })
                            : ""}

                    </div>
                    <p className="intro">{book.description ? book.description : "" }</p>
                    <p className="count">{(book.numbers/10000).toFixed(2)}<span className="suffix">万字</span>
                        {book.clickNumbers }<span className="suffix">总点击</span>
                       {/* 目前暂不统计非登录人员点击次数，所以会员点击量==总点击*/}
                        {book.memberClickNumbers }<span className="suffix">会员点击</span>
                        {book.recommendNumbers }<span className="suffix">总推荐</span></p>
                    <p className="buttons"><Link to={`/bookCity/books/${book.id}/chapterList/${book.firstChapter}`}><Button >开始阅读</Button></Link> <Button onClick={this.handleCollect.bind(this,book.id)}>加入书架</Button> <Button onClick={this.handleRecommend.bind(this,book.id)}>投推荐票</Button> <Button > <Link to={`/bookCity/books/${book.id}/chapterList`}>全部目录</Link></Button><ReportItem item={book} onSubmit={this.handleSubmit.bind(this)}/> </p>
                </div>
                <div className="tRan">
                    <h2>{String(book.score) === "NaN" ? "暂无评分" : Math.floor(book.score)}.<span className="point">{String(book.score).split(".")[1]}</span></h2>
                    <p className="bookRank">{book.rankNumbers}人评价</p>
                    <p><strong>我要评价</strong></p>
                    <Rate allowHalf defaultValue={2.5} onChange={this.handleChange.bind(this,book.id)}/>
                </div>


            </div>
        );
    }
}