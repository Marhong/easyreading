import React,{Component} from 'react';

import '../css/MyListCard.css';
import { Link } from "react-router-dom";
// 自定义的Card，用于以列表形式展示“静态”书籍列表信息
export default class MyListCard extends Component{
    static defaultProps = {
        data: {}
    }
    render(){
        return(
            <div className="myListCard" >
                <dl>
                    <dt>
                        <span >
                            <h3><Link to={`/bookCity/${this.props.data.nickname}`}>{this.props.data.bookType}</Link></h3>
                        </span>
                        <hr  className="first"/>
                    </dt>
                    {this.props.data.books.map((book) => {
                        return  <Link to={`/bookCity/books/${book.id}`} key={book.id}><dd > <span className="itemInfo"><span className="bookType">[{book.type}]</span> <span className="bookName"> {book.name}</span></span></dd></Link>
                    })}
                </dl>
            </div>
        );
    }
}