import React,{Component} from 'react';
import { Menu, Icon } from 'antd';
import { Carousel } from 'antd';
import { BrowserRouter as Router, Route, Link ,Switch} from "react-router-dom";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
// 展示菜单栏和“个性化推荐”书籍
export default class IndexHeaderCenter extends Component{
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
        const personalizedBooks = [{id:"w1",name:"兴街镇吧",imgSrc:"https://bookcover.yuewen.com/qdbimg/349573/1013451202/180"},{id:"w2",name:"兴街镇吧",imgSrc:"https://bookcover.yuewen.com/qdbimg/349573/1013451202/180"}];
        return(
            <div>
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                    className="indexMenu"
                >
                    <Menu.Item key="all">
                        <Link to="/bookCity">全部</Link>
                    </Menu.Item>
{/*                    <Menu.Item key="rank">
                      排行
                    </Menu.Item>*/}
                    <Menu.Item key="list">
                        <Link to="/bookList">书单</Link>
                    </Menu.Item>

                </Menu>
            <Carousel autoplay  >
                {personalizedBooks.map((book) =>{
                    return(
                        <div key={book.id}>
                            <img alt={book.name} src={book.imgSrc} />
                        </div>
                    );
                })}
            </Carousel>
            </div>
            );


    }
}