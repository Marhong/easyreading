import React,{Component} from 'react';
import {Button} from 'react-bootstrap';
import '../css/MyCard.css';
import { Link } from "react-router-dom";

// 自定义的Card，用于展示轮播的书籍信息
export default class MySelectedCard extends Component{

    render(){
        const book = this.props.book;

        return(
            <div className="myCard" >
                <Link to={`/bookCity/books/${book.id}`}><img src={book.imgUrl} alt={book.name} /></Link>
                <p className="bookName"> <Link to={`/bookCity/books/${book.id}`}>{book.name}</Link></p>
                <p className="bookRank">{(book.numbers/10000).toFixed(2)}万字{/*不要 8.8分*/}</p>{/*先不要<p > <span className="bookFans"> 822</span>人在追</p>*/}
                <p className="bookDesc">{book.description.length>27 ? `${book.description.slice(0,27)}...` : book.description}</p>
                <Link to={`/bookCity/books/${book.id}`}><Button variant="danger" className="bookDetail" size="sm"> 书籍详情</Button></Link>

            </div>
        );
    }
}