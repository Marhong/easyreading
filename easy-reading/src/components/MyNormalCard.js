import React,{Component} from 'react';
import {Tag } from 'antd';
import '../css/MyNormalCard.css';

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
                        <p className="bookDesc">{this.props.book.desc.length>38 ? `${this.props.book.desc.slice(0,38)}...` : this.props.book.desc}</p>
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