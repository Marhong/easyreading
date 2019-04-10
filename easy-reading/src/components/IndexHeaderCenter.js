import React,{Component} from 'react';
import { Menu, Icon } from 'antd';
import { Carousel } from 'antd';

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
        return(
            <div>
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                    className="indexMenu"

                >
                    <Menu.Item key="all">
                      完本
                    </Menu.Item>
                    <Menu.Item key="rank">
                      排行
                    </Menu.Item>
                    <Menu.Item key="list">
                       书单
                    </Menu.Item>

                </Menu>
            <Carousel autoplay  >
                <div><h3>1</h3></div>
                <div><h3>2</h3></div>
                <div><h3>3</h3></div>
                <div><h3>4</h3></div>
            </Carousel>
            </div>
            );


    }
}