import React,{Component} from 'react';
import { Menu, Icon,Tag } from 'antd';
import { Carousel } from 'antd';
import {CardDeck,Card,Button} from 'react-bootstrap';
import '../css/MyNormalCard.css';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

// 自定义的Card，用于展示“静态”书籍信息
export default class MyNormalCard extends Component{
    static defaultProps = {
        book: {}
    }
    render(){
        return(
            <div className="myNormalCard" >
                <a href={this.props.book.bookHref}>
                    <div className="bookImg">
                    <img src={this.props.book.imgSrc} alt={this.props.book.name} />
                    </div>
                    <div className="bookInfo">
                        <p className="bookName">{this.props.book.name}</p>
                        <p className="bookDesc">{this.props.book.desc.length>50 ? `${this.props.book.desc.slice(0,50)}...` : this.props.book.desc}</p>
                        <div className="bookStatistics">
                            <div className="leftName">
                                <i className="iconfont icon-yonghudianji"/> {this.props.book.author}
                            </div>
                            <div className="rightTags">
                                <Tag>体育赛事</Tag><Tag color="red">100万字</Tag>
                            </div>
                        </div>
                    </div>

                </a>
            </div>
        );
    }
}