import React,{Component} from 'react';
import '../css/BookListDetailItem.css';
import {timestampFormat} from '../static/commonFun';
import { Link } from "react-router-dom";
export default class BookListDetailItem extends Component{
    render(){
        const book = this.props.book;
        return(
            <div className="detailItem">
                <div className="topInfo">
                    <div className="leftImg">
                        <Link to={`/bookCity/books/${book.id}`} ><img src={book.imgSrc} alt={book.name} /></Link>
                    </div>
                    <div className="rightInfo">
                        <div className="bookName"><h3><strong><Link to={`/bookCity/books/${book.id}`} >{book.name}</Link></strong></h3></div>
                        <p className="author"><i className="iconfont icon-yonghudianji" /> {book.author} |  {book.type} | {book.isOver ? "完结" : "连载中"}</p>
                        <p className="bookDesc">{book.desc.length>70 ? `${book.desc.slice(0,70)}...` : book.desc}</p>
                        <p className="latestUpdate">最近更新 <span className="latestUpdateName"> {book.latestUpdate.name}</span> {timestampFormat(book.latestUpdate.time)}</p>
                    </div>
                </div>
                <div className="botDesc">
                    <p><span className="quote"><em><i className="iconfont icon-yinhao"/> </em></span> {this.props.recommend}</p>
                </div>
            </div>
        );
    }
}