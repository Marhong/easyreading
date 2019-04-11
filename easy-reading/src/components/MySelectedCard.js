import React,{Component} from 'react';
import { Menu, Icon } from 'antd';
import { Carousel } from 'antd';
import {CardDeck,Card,Button} from 'react-bootstrap';
import '../css/MyCard.css';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

// 自定义的Card，用于展示轮播的书籍信息
export default class MySelectedCard extends Component{
    static defaultProps = {
        book: {}
    }
    render(){
        return(
            <div className="myCard" >
                <a href={this.props.book.bookHref}>
                <img src={this.props.book.imgSrc} alt={this.props.book.name} />
                <p className="bookName">{this.props.book.name}</p>
                <p className="bookRank">200万字 8.8分</p><p > <span className="bookFans"> 822</span>人在追</p>
                <p className="bookDesc">{this.props.book.desc.length>27 ? `${this.props.book.desc.slice(0,27)}...` : this.props.book.desc}</p>
                    <Button variant="danger" className="bookDetail" size="sm">书籍详情</Button>
                </a>
            </div>
        );
    }
}