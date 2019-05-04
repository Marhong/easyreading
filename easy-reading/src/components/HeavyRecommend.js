import React,{Component} from 'react';
import { Menu, Icon } from 'antd';
import { Carousel } from 'antd';
import {CardDeck,Card} from 'react-bootstrap';
import MyCardDeck from "./MyCardDeck";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

// 展示“重磅推荐”模块书籍
export default class HeavyRecommend extends Component{
    render(){
        const data =[{id:"sm122",imgSrc:"https://bookcover.yuewen.com/qdbimg/349573/1013451202/180",name:"11征服荒野"},
            {id:"sm1232",imgSrc:"http://imgsrc.baidu.com/forum/pic/item/bfb87c22dd54564e60f2e846bdde9c82d0584f2c.jpg",name:"22征服荒野"},
            {id:"sm3122",imgSrc:"https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=10da86d6df43ad4bb92e40c0b2035a89/03087bf40ad162d93b3a196f1fdfa9ec8b13cde9.jpg",name:"33征服荒野"},
            {id:"s4m122",imgSrc:"https://bookcover.yuewen.com/qdbimg/349573/1013451202/180",name:"44征服荒野"},
            {id:"sm5122",imgSrc:"https://bookcover.yuewen.com/qdbimg/349573/1013451202/180",name:"55征服荒野"},
            {id:"sm6122",imgSrc:"https://bookcover.yuewen.com/qdbimg/349573/1013451202/180",name:"66征服荒野"},
            {id:"sm1722",imgSrc:"https://bookcover.yuewen.com/qdbimg/349573/1013451202/180",name:"77征服荒野"},
            {id:"sm1822",imgSrc:"https://bookcover.yuewen.com/qdbimg/349573/1013451202/180",name:"88征服荒野"},
           ];
        let datas = [];
        let index=0;
        for(let i=0;i<data.length;){
            if(i+4<data.length){
                datas[index] = data.slice(i,i+4);
            }else{
                datas[index] = data.slice(i);
            }
            i += 4;
            index++;
        }
        return(
            <div className="heavyModule">
                <div><h5>重磅推荐</h5></div>
                <Carousel  autoplay  >
                    {
                       datas.map((data,index) => {
                           return(
                               <MyCardDeck key={index} data={data}/>
                           );
                       })
                    }
                </Carousel>
            </div>
        );


    }
}