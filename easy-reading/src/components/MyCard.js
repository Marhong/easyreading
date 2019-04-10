import React,{Component} from 'react';
import { Menu, Icon } from 'antd';
import { Carousel } from 'antd';
import {CardDeck,Card,Button} from 'react-bootstrap';
import '../css/MyCard.css';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class MyCard extends Component{
    static defaultProps = {
        book: {}
    }
    render(){
        return(
            <div className="myCard" >

                <a href={this.props.book.bookHref}>
                <img src={this.props.book.imgSrc} alt={this.props.book.name} />
                <h3 className="bookName">{this.props.book.name}</h3>
                <p className="bookRank">200万字 8.8分</p>
                <span className="bookFans">9822</span>人在追
                <p className="bookDesc">{this.props.book.desc.length>27 ? `${this.props.book.desc.slice(0,27)}...` : this.props.book.desc}</p>
               {/* <button className="bookDetail">书籍详情</button>*/}
                    <Button variant="danger" className="bookDetail">书籍详情</Button>
                </a>
            </div>
        );
    }
}