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
                <h3 className="bookName">{this.props.book.name}</h3>
                <h3 className="bookRank">200万字 8.8分</h3>
                    <h3 className="bookFans"><span>822</span>人在追</h3>
                <h3 className="bookDesc">{this.props.book.desc.length>27 ? `${this.props.book.desc.slice(0,27)}...` : this.props.book.desc}</h3>
               {/* <button className="bookDetail">书籍详情</button>*/}
                    <h3>  <Button variant="danger" className="bookDetail" size="sm">书籍详情</Button></h3>
                </a>
            </div>
        );
    }
}