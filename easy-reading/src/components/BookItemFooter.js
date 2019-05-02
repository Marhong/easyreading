import React,{Component} from 'react';
import {timestampFormat} from "../static/commonFun";
import '../css/BookItemFooter.css';
export default class BookItemFooter extends Component{
    render(){
        const bookList = this.props.bookList;
        return(
            <p className="authorInfo">
                <img src={bookList.authorImg} className="authorImg"/>
                <span className="authorName"><strong>{bookList.author}</strong></span>
                <span className="dataInfo">{timestampFormat(bookList.createTime)}  <span className="divider"/> 共{bookList.num}本</span>
                <span className="collect">
                            <button> {bookList.likeNum} 关注</button>
                        </span>
            </p>
        );
    }
}