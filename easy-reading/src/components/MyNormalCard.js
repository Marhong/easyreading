import React,{Component} from 'react';
import {Tag } from 'antd';
import '../css/MyNormalCard.css';
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
                        <Link to={`/bookCity/books/${book.id}`}><img src={book.imgSrc} alt={book.name} /></Link>
                    </div>
                    <div className="bookInfo">
                        <p className="bookName"> <Link to={`/bookCity/books/${book.id}`}>{book.name}</Link></p>
                        <p className="bookDesc">{book.desc.length>38 ? `${book.desc.slice(0,38)}...` : book.desc}</p>
                        <div className="bookStatistics">
                            <div className="leftName">
                                <i className="iconfont icon-yonghudianji"/> {book.author}
                            </div>
                            <div className="rightTags">
                                <Tag>体育赛事</Tag><Tag color="red">100万字</Tag>
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}