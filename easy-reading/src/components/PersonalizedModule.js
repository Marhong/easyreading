import React,{Component} from 'react';
import { Menu, Icon } from 'antd';
import { Carousel } from 'antd';
import {CardDeck,Card} from 'react-bootstrap';
import MyCardDeck from "./MyCardDeck";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class PersonalizedModule extends Component{
    state = {
        current: 'mail',
    }

    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }
    render(){
        const data =[{id:"sm122",imgSrc:"https://bookcover.yuewen.com/qdbimg/349573/1013451202/180",name:"11征服荒野"},
            {id:"sm1232",imgSrc:"https://bookcover.yuewen.com/qdbimg/349573/1013451202/180",name:"22征服荒野"},
            {id:"sm3122",imgSrc:"https://bookcover.yuewen.com/qdbimg/349573/1013451202/180",name:"33征服荒野"},
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
            <div className="personModule">
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                    className="indexMenu"
                >
                    <Menu.Item key="all">
                        重磅推荐
                    </Menu.Item>
                </Menu>
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