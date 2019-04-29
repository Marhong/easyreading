import React,{Component} from 'react';
import {Tag} from 'antd';
import { Menu, Icon } from 'antd';
import { Table } from 'antd';

const columns = [
    { title: '书名', dataIndex: 'name', key: 'name' },
    { title: '作者', dataIndex: 'author', key: 'author' },
    { title: '最新章节', dataIndex: 'chapter', key: 'chapter' },
    { title: '更新时间', dataIndex: 'updateTime', key: 'updateTime' },
    {
        title: '操作', dataIndex: '', key: 'x', render: () => <a href="javascript:;">删除</a>,
    },
];

const data = [
    {
        key: 1, name: '癞蛤蟆想吃天鹅肉', author: '烽火戏诸侯', chapter: '第二百一十三章 长得美想的还没', updateTime: '一天前',description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 2, name: '斗破苍穹', author: '天蚕土豆', chapter: '第四百一十三章 晋升斗皇', updateTime: '两天前',description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
    },
    {
        key: 3, name: '求魔', author: '耳根', chapter: '第二百三十三章 海神', updateTime: '一个月前',description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
    },
];
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
require('../css/PersonalCenter.css');
export default class PersonalCenter extends Component{
    constructor(props){
        super(props);
        this.state = {
            columns : columns,
            data:data,
        }
    }
    handleClick = (e) =>{

        switch (e.key){
            case "2":
                let columns = [
                    { title: '书单名', dataIndex: 'name', key: 'name' },
                    { title: '作者', dataIndex: 'author', key: 'author' },
                    { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
                    {
                        title: '操作', dataIndex: '', key: 'x', render: () => <a href="javascript:;">删除</a>,
                    },
                ];
                let data = [
                    {
                        key: 1, name: '经典玄幻小说', author: '马后炮',  createTime: '2019-01-11',description: [{name:"天下第一",author:"天下第一作者",chapter:"第三百二十章 决战牛魔王"},{name:"死亡飞车",author:"欢乐谷",chapter:"第四百三十章 恐怖云霄"},{name:"谷木游龙",author:"新世界",chapter:"第五百二十章 决战牛魔王"}],
                    },
                    {
                        key: 2, name: '热血武侠小说', author: '周玄机',  createTime: '2019-02-11',description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
                    },
                    {
                        key: 3, name: '恐怖灵异小说', author: '阿萨德',  createTime: '2019-01-31',description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
                    },
                ];
                this.setState({columns:columns,data:data});
                break;
            default:

        }
    }
    render(){
        return(
            <div className="wrap">
                <div className="userInfo">
                    <img className="userImg" src="http://static.zongheng.com/userimage/default/image_120_120.gif"/>
                    <div className="userInfoMsg">
                        <p><span className="userName"><strong>麦香馅饼和肉夹馍</strong></span><span className="modifyInfo"><i className="iconfont icon-xiugai"/> 个人资料修改</span></p>
                        <p className="description">我是个阿斯蒂芬阿斯蒂芬啊啊士大夫阿斯蒂芬</p>

                        <span className="userTags"><Tag color="magenta">magenta</Tag>
                                <Tag color="red">red</Tag>
                                <Tag color="volcano">volcano</Tag>
                                <Tag color="orange">orange</Tag>
                            </span>

                    </div>
                </div>
                <div className="content">
                    <div className="menu">
                        <Menu
                            onClick={this.handleClick}
                            defaultSelectedKeys={['1']}
                            mode="inline"
                        >
                            <Menu.Item key="1"><i className="iconfont icon-shujia"/> 我的书架</Menu.Item>
                            <Menu.Item key="2"><i className="iconfont icon-shudan"/> 我的书单</Menu.Item>
                            <Menu.Item key="3"><i className="iconfont icon-pinglun"/> 我的书评</Menu.Item>
                            <Menu.Item key="4"><i className="iconfont icon-xiaoxi"/> 消息通知</Menu.Item>
                            <Menu.Item key="5"><i className="iconfont icon-yuedujilu"/> 阅读记录</Menu.Item>
                            <Menu.Item key="6"><i className="iconfont icon-shujushangchuanjilu"/> 上传记录</Menu.Item>
                            <Menu.Item key="7"><i className="iconfont icon-gerenziliao"/> 个人资料</Menu.Item>
                        </Menu>
                    </div>
                    <div className="main">
                        <Table
                            columns={this.state.columns}
                            expandedRowRender={record => {
                                let items;
                                for(let item of record.description){
                                    items += <p>item.name</p>
                                }
                                return <p style={{ margin: 0 }}>{items}</p>}}
                 /*               record.description.map((book,index) => {
                                    return <p style={{ margin: 0 }}>{record.description}</p>
                                })*/

                            dataSource={this.state.data}
                        />
                    </div>
                </div>
            </div>
        );
    }
}