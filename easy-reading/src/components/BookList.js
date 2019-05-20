import React,{Component} from 'react';
import {Tabs,Breadcrumb} from 'antd';
import {Link} from 'react-router-dom';
import '../css/BookList.css';
import BookListItem from "./BookListItem";
import {WrappedDynamicFieldSet} from './CreateBookList';
import IndexHeaderSearch from "./IndexHeaderSearch";
const TabPane = Tabs.TabPane;
const data = [
    {
        id:"754242",
        imgs:[{id:"75424211",src:"https://bookcover.yuewen.com/qdbimg/349573/1013470066/180",name:"沙发书单"},{id:"75424212",name:"考虑领料",src:"https://bookcover.yuewen.com/qdbimg/349573/1013862069/180"},{id:"75424213",name:"我的师傅",src:"https://bookcover.yuewen.com/qdbimg/349573/1010754871/180"},{id:"75424214",name:"三国志",src:"https://bookcover.yuewen.com/qdbimg/349573/1014127256/180"}],
        bookList:{id:"75424215",name:"点击量破亿的十大网文小说，你看过哪些",description:"神奇的世界，诞生了无数的种类与神话。有我们熟知的斗气大陆，斗罗大陆。也有充满灵性的天元大陆，元气大陆。   人生的旅途，不在于目的地，在于的是沿途的风景，神奇的大陆，诞生了太多让人缅怀，深陷记忆的风景。   我推荐了一条风景线给大家，一起踏上旅途吧！\n" +
            "                       ",authorImg:"https://facepic.qidian.com/qd_face/349573/262/100",author:"小南",num:10,createTime:"1553011200",likeNum:9},
    },
    {
        id:"754243",
        imgs:[{id:"75424216",src:"https://bookcover.yuewen.com/qdbimg/349573/1013470066/180",name:"沙发书单"},{id:"75424217",name:"考虑领料",src:"https://bookcover.yuewen.com/qdbimg/349573/1013862069/180"},{id:"75424218",name:"我的师傅",src:"https://bookcover.yuewen.com/qdbimg/349573/1010754871/180"},{id:"75424219",name:"三国志",src:"https://bookcover.yuewen.com/qdbimg/349573/1014127256/180"}],
        bookList:{id:"75424220",name:"点击量破亿的十大网文小说，你看过哪些",description:"神奇的世界，诞生了无数的种类与神话。有我们熟知的斗气大陆，斗罗大陆。也有充满灵性的天元大陆，元气大陆。   人生的旅途，不在于目的地，在于的是沿途的风景，神奇的大陆，诞生了太多让人缅怀，深陷记忆的风景。   我推荐了一条风景线给大家，一起踏上旅途吧！\n" +
            "                       ",authorImg:"https://facepic.qidian.com/qd_face/349573/262/100",author:"小南",num:10,createTime:"1553011200",likeNum:9},
    },
    {
        id:"754245",
        imgs:[{id:"75424221",src:"https://bookcover.yuewen.com/qdbimg/349573/1013470066/180",name:"沙发书单"},{id:"75424222",name:"考虑领料",src:"https://bookcover.yuewen.com/qdbimg/349573/1013862069/180"},{id:"75424223",name:"我的师傅",src:"https://bookcover.yuewen.com/qdbimg/349573/1010754871/180"},{id:"75424224",name:"三国志",src:"https://bookcover.yuewen.com/qdbimg/349573/1014127256/180"}],
        bookList:{id:"75424225",name:"点击量破亿的十大网文小说，你看过哪些",description:"神奇的世界，诞生了无数的种类与神话。有我们熟知的斗气大陆，斗罗大陆。也有充满灵性的天元大陆，元气大陆。   人生的旅途，不在于目的地，在于的是沿途的风景，神奇的大陆，诞生了太多让人缅怀，深陷记忆的风景。   我推荐了一条风景线给大家，一起踏上旅途吧！\n" +
            "                       ",authorImg:"https://facepic.qidian.com/qd_face/349573/262/100",author:"小南",num:10,createTime:"1553011200",likeNum:9},
    }
];
const options = [{icon:"iconfont icon-benzhouzuihuo",name:"推荐书单"},{icon:"iconfont icon-zuixin",name:"最新书单"},]
export default class BookList extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: data,
        }
    }
    handleOnChange = (key) =>{


    }
    render(){
        return(
            <div>
                <IndexHeaderSearch/>
            <div className="bookList">
                <Breadcrumb separator=">" >
                    <Breadcrumb.Item > <Link to={`/`} >首页</Link></Breadcrumb.Item>
                    <Breadcrumb.Item > <Link to={`/bookList`} style={{color:"#40a9ff"}}>书单列表</Link></Breadcrumb.Item>
                </Breadcrumb>
                <Tabs  animated={false} onChange={this.handleOnChange}>
                    {options.map((option,index) => {
                        return <TabPane tab={<span><i className={option.icon} />{option.name}</span>} key={index+1}>
                            {this.state.data.map((item,index) => {
                                return  <BookListItem item={item} key={index} />
                            })}

                        </TabPane>
                    })}
                    <TabPane tab={<span><i className="iconfont icon-add" />创建书单</span>} key={3}>
                        <WrappedDynamicFieldSet ref={(createList) => this.createList = createList} style={{display:"none"}}/>
                    </TabPane>
                </Tabs>
            </div>
            </div>
        );
    }
}