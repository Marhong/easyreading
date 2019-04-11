import React,{Component} from 'react';
import MySelectedCard from "./MySelectedCard";
import { Carousel } from 'antd';
import { Menu, Icon } from 'antd';
import {CardDeck,Card,Button} from 'react-bootstrap';
import LeftSelectedCard from "./LeftSelectedCard";
import MyNormalCard from "./MyNormalCard";

export default class FinishedModule extends Component{
    static defaultProps = {
        moduleType : "",
    }
    render(){
        const data =[{id:"sm122",imgSrc:"https://bookcover.yuewen.com/qdbimg/349573/1013451202/180",name:"11征服荒野",bookHref:"",desc:"我是简介所为和司我是"},
            {id:"sm1232",imgSrc:"http://imgsrc.baidu.com/forum/pic/item/bfb87c22dd54564e60f2e846bdde9c82d0584f2c.jpg",name:"22征服荒野",bookHref:"",desc:"我是简介所为和司我是简所发生的发了科技和分类进卡士大夫阿斯蒂芬拉三等奖分类撒大声地房间里看电视"},
            {id:"sm3122",imgSrc:"https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=10da86d6df43ad4bb92e40c0b2035a89/03087bf40ad162d93b3a196f1fdfa9ec8b13cde9.jpg",name:"33征服荒野",bookHref:"",desc:"我是简介所为和司我是我是简介所为和司我是我是简介所为和司我是我是简介所为和司我是我是简介所为和司我是"},
            {id:"s4m122",imgSrc:"https://bookcover.yuewen.com/qdbimg/349573/1013451202/180",name:"44征服荒野",bookHref:"",desc:"我是简介所为和司我是简所发生的发了科技和分类进卡士大夫阿斯蒂芬拉三等奖分类撒大声地房间里看电视"},];
        return(
            <div className="finishedModule">
                <div className="leftSelectedCards">
                    <LeftSelectedCard data={data} moduleType={this.props.moduleType}/>
                </div>
                <div className="rightNormalCards">
                    <ul>
                        {data.slice(0,2).map((book) => {
                            return <li key={book.id}><MyNormalCard  book={book} /></li>
                        })}
                    </ul>
                    <hr style={{marginTop:200,marginLeft:50}}/>
                    <ul>
                        {data.slice(2).map((book) => {
                            return <li key={book.id}><MyNormalCard  book={book} /></li>
                        })}
                    </ul>

                </div>
            </div>
        );
    }
}