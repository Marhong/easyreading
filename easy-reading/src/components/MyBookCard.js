import React,{Component} from 'react';
import {Tag } from 'antd';
import '../css/MyBookCard.css';

// 自定义的Card，用于展示“静态”书籍信息
export default class MyBookCard extends Component{
    static defaultProps = {
        book: {id:"sm122",author:"天蚕土豆",imgSrc:"https://bookcover.yuewen.com/qdbimg/349573/1013451202/180",name:"11征服荒野",bookHref:"",desc:"我是简介所为和司我是我是简介所为和司我是我是简介所为和司我是我是简介所为和司我是我是简介所为和司我是简介所为和司我是",type:"玄幻",isOver:false},
    }
    render(){
        return(
            <div className="myBookCard" >
                    <div className="bookImg">
                        <img src={this.props.book.imgSrc} alt={this.props.book.name} />
                    </div>
                    <div className="bookInfo">
                        <p className="bookName">{this.props.book.name}</p>
                        <p className="author"><i className="iconfont icon-yonghudianji" />{this.props.book.author} |  {this.props.book.type} | {this.props.book.isOver ? "完结" : "连载中"}</p>
                        <p className="bookDesc">{this.props.book.desc.length>70 ? `${this.props.book.desc.slice(0,70)}...` : this.props.book.desc}</p>
                        <p className="statistics"><span className="fans"> 200万人气</span><span className="secondTag">200万字</span></p>
                    </div>
            </div>
        );
    }
}