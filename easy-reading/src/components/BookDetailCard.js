import React,{Component} from 'react';
import {Button,Tag,Rate} from 'antd';
import '../css/BookDetailCard.css';
import ReportItem from "./ReportItem";
import { Link } from "react-router-dom";
export default class BookDetailCard extends Component{
    static defaultProps = {
        book:{id:"book20190100",name:"仙宫",isFinished:false,isFree:true,author:"大眼怪",tags:["武侠","仙侠","幻想"],rankNumber:40,wordNumbers:231454545,clickedTimes:1514514,membershipClicked:8452852,recommend:525742,intro:"修仙觅长生，热血任逍遥，踏莲曳波涤剑骨，凭虚御风塑圣魂！修仙觅长生，热血任逍遥，踏莲曳波涤剑骨，凭虚御风塑圣魂！修仙觅长生，热血任逍遥，踏莲曳波涤剑骨，凭虚御风塑圣魂！",href:"",imgSrc:"https://bookcover.yuewen.com/qdbimg/349573/1013561350/180"},
    }
    constructor(props){
        super(props);
    }
    handleChange = (number) => {
        alert(`选择的分值为: ${number}`);
    };

    handleSubmit(values){
        console.log("BookDetailCard",values);
    }
    render(){
        let book = this.props.book;
        return(
            <div className="detailCard">
                <div className="fImg">
                    <img src={book.imgSrc}/>
                </div>
                <div className="sInf">
                    <h1>仙宫<span className="author">{book.author}著</span></h1>
                    <div className="tags"><Tag color="blue">{book.isFree?"连载":"完结"}</Tag><Tag color="blue">{book.isFree?"免费":"VIP“"}</Tag>
                        {book.tags.map((item,index) => {
                            return <Tag color="red" key={index}>{item}</Tag>
                        })}
                    </div>
                    <p className="intro">{book.intro.length>45 ? `${book.intro.slice(0,45)}...` : book.intro }</p>
                    <p className="count">{(book.wordNumbers/10000).toFixed(2)}<span className="suffix">万字</span>
                        {(book.clickedTimes/10000).toFixed(2)}<span className="suffix">万总点击</span>
                        {(book.membershipClicked/10000).toFixed(2)}<span className="suffix">万会员点击</span>
                        {(book.recommend/10000).toFixed(2)}<span className="suffix">万总推荐</span></p>
                    <p className="buttons"><Link to={`/bookCity/books/${book.id}/chapterList/1`}><Button >开始阅读</Button></Link> <Button >加入书架</Button> <Button >投推荐票</Button> <Button ><Link to={`/bookCity/books/${book.id}/chapterList`}>全部目录</Link></Button><ReportItem item={this.props.book} onSubmit={this.handleSubmit.bind(this)}/> </p>
                </div>
                <div className="tRan">
                    <h2>8.<span className="point">5</span></h2>
                    <p className="bookRank">{book.rankNumber}人评价</p>
                    <p><strong>我要评价</strong></p>
                    <Rate allowHalf defaultValue={2.5} onChange={this.handleChange}/>
                </div>


            </div>
        );
    }
}