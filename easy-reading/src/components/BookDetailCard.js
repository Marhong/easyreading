import React,{Component} from 'react';
import {Button,Tag,Rate} from 'antd';
import '../css/BookDetailCard.css';
import ReportItem from "./ReportItem";
import { Link } from "react-router-dom";
import reqwest from "reqwest";
const bookUrl = "http://localhost:5000/easyreading/book";
export default class BookDetailCard extends Component{

    handleChange = (number) => {
        alert(`选择的分值为: ${number}`);
        // 这里应该要能得到userId
        // 这里应该更新用户的评分，url: localhost:3000/easyreading/rankRecord/:userId/:bookId/update

    };

    handleSubmit(values){
        console.log("BookDetailCard",values);
    }
    render(){
        let book = this.props.book;

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
                        {book.clickedNumbers ? (book.clickedNumbers/10000).toFixed(2) : ""}<span className="suffix">万总点击</span>
                       {/* 目前暂不统计非登录人员点击次数，所以会员点击量==总点击*/}
                        {book.clickNumbers ? (book.clickedNumbers/10000).toFixed(2) : ""}<span className="suffix">万会员点击</span>
                        {book.clickNumbers ?  (book.recommendNumbers/10000).toFixed(2) : ""}<span className="suffix">万总推荐</span></p>
                    <p className="buttons"><Link to={`/bookCity/books/${book.id}/chapterList/1`}><Button >开始阅读</Button></Link> <Button >加入书架</Button> <Button >投推荐票</Button> <Button > <Link to={`/bookCity/books/${book.id}/chapterList`}>全部目录</Link></Button><ReportItem item={book} onSubmit={this.handleSubmit.bind(this)}/> </p>
                </div>
                <div className="tRan">
                    <h2>{Math.floor(book.score)}.<span className="point">{String(book.score).split(".")[1]}</span></h2>
                    <p className="bookRank">{book.rankNumber}人评价</p>
                    <p><strong>我要评价</strong></p>
                    <Rate allowHalf defaultValue={2.5} onChange={this.handleChange}/>
                </div>


            </div>
        );
    }
}