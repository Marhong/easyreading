import React,{Component} from 'react';
import '../css/BookListItem.css';
import {timestampFormat} from '../static/commonFun';
import BookItemFooter from "./BookItemFooter";
import { Link } from "react-router-dom";
export default class BookListItem extends Component{
    render(){
        const item = this.props.item;
        const imgs = item.imgs;
        const bookList = item.bookList;
        return(
            <div className="bookListItem">
                <div className="imgArray">
                    <dl>
                        {imgs.map((img,index) => {
                            // 每张img的id应该与对应书籍id相同
                            return <dd key={index}><Link to={`/bookCity/books/${img.id}`} ><img src={img.src} alt={img.name}/></Link></dd>
                        })}
                    </dl>
                </div>
                <div className="bookListInfo">
                    <p className="title"><strong><Link to={`/bookList/${item.id}`} >{bookList.name}</Link></strong></p>
                    <p className="description">{bookList.description.length > 150 ? `${bookList.description.slice(0,150)}...` : bookList.description}
                        </p>
                    <BookItemFooter bookList={bookList}/>
                </div>
            </div>
        );
    }
}