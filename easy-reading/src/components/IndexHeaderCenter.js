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
        // 这里展示的用户每日的个性化推荐
        // 从服务器获取当天的个性化推荐书籍列表
        // 服务器应该在每晚23:59时生成第二天的个性化推荐列表
        // 从服务器端获取数据的url：localhost:3000/easyreading/books/personalBooks
        // 这里只需要获取每本书籍的id,name,img即可
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
                            <Link to={`/bookCity/books/${book.id}`} key={book.id}> <img alt={book.name} src={book.imgSrc} /></Link>
                        </div>
                    );
                })}
            </Carousel>
            </div>
            );


    }
}