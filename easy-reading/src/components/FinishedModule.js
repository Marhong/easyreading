import React,{Component} from 'react';
import MyCard from "./MyCard";
import { Carousel } from 'antd';
import { Menu, Icon } from 'antd';
import {CardDeck,Card,Button} from 'react-bootstrap';
export default class FinishedModule extends Component{
    render(){
        const data =[{id:"sm122",imgSrc:"https://bookcover.yuewen.com/qdbimg/349573/1013451202/180",name:"11征服荒野",bookHref:"",desc:"我是简介所为和司我是简"},
            {id:"sm1232",imgSrc:"http://imgsrc.baidu.com/forum/pic/item/bfb87c22dd54564e60f2e846bdde9c82d0584f2c.jpg",name:"22征服荒野",bookHref:"",desc:"我是简介所为和司我是简"},
            {id:"sm3122",imgSrc:"https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=10da86d6df43ad4bb92e40c0b2035a89/03087bf40ad162d93b3a196f1fdfa9ec8b13cde9.jpg",name:"33征服荒野",bookHref:"",desc:"我是简介所为和司我是简"},
            {id:"s4m122",imgSrc:"https://bookcover.yuewen.com/qdbimg/349573/1013451202/180",name:"44征服荒野",bookHref:"",desc:"我是简介所为和司我是简"},];
       /* return <MyCard book={data[0]}/>*/
        return(
           <div className="finishedModule">
                <Menu
                    onClick={this.handleClick}
                    mode="horizontal"
                    className="indexMenu"
                >
                    <Menu.Item key="all">
                        重磅推荐
                    </Menu.Item>
                </Menu>
                <Carousel autoplay dots={false} >
                    {data.map((book) => {
                    return <MyCard key={book.id} book={book}/>
                    })}
                </Carousel>
            </div>
        )
    }
}