import React,{Component} from 'react';
import {Tag } from 'antd';
import '../css/MyNormalCard.css';
import {booktypes} from '../static/commonFun';
import { Link } from "react-router-dom";
// 自定义的Card，用于展示“静态”书籍信息
export default class MyNormalCard extends Component{
    static defaultProps = {
        book: {}
    }
    render(){
        const book  = this.props.book;
        return(
            <div className="myNormalCard" >
                    <div className="bookImg">
                        <Link to={`/bookCity/books/${book.id}`}><img src={book.imgUrl} alt={book.name} /></Link>
                    </div>
                    <div className="bookInfo">
                        <p className="bookName"> <Link to={`/bookCity/books/${book.id}`}>{book.name}</Link></p>
                        <p className="bookDesc">{book.description.length>38 ? `${book.description.slice(0,38)}...` : book.description}</p>
                        <div className="bookStatistics">
                            <div className="leftName">
                                <i className="iconfont icon-yonghudianji"/> {book.author}
                            </div>
                            <div className="rightTags">
                                <Tag>{booktypes[book.type]}</Tag><Tag color="red">{(book.numbers/10000).toFixed(2)}万字</Tag>
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}