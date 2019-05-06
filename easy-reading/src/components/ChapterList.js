import React,{Component} from 'react';
import {Breadcrumb} from 'antd';
import '../css/ChapterList.css';
import VolumeComponent from "./VolumeComponent";
import {Link} from 'react-router-dom';
import {timestampFormat} from "../static/commonFun";
export default class ChapterList extends Component{

    constructor(){
        super();
        this.state = {
            sort : "icon-shengxu",
        }
    }
    componentDidMount(){
        document.documentElement.style.backgroundColor = "white";
        document.body.style.backgroundColor = "white";
    }
    handleChaptersSort(){
        this.setState({sort:this.state.sort==="icon-shengxu" ? "icon-jiangxu" : "icon-shengxu"});
    }
    render(){
        console.log("传递的bookId:",this.props.match.params.id);
        // 通过bookId获取该书籍的所有卷。从服务器获取书籍卷的url: localhost:3000/easyreading/books/:id/volumes
        const volumes = [{name:"卷一 大城小事",count:24,numbers:524561245,chapterList:
                [{id:45112,name:"第一章 有朋字远方来，尚能饭否",href:""},
                ]},
            {name:"卷二 小城大事",count:24,numbers:524561245,chapterList:
                    [{id:45112,name:"第一章 学而不思则，思而不学则殆",href:""},
                    ]},
            {name:"卷三 城里无事",count:24,numbers:524561245,chapterList:
                    [{id:45112,name:"第一章 三人行必有我师焉",href:""},
                    ]},];
        const book = JSON.parse(sessionStorage.getItem("book"));
        // 这里还要展示最新章节的信息，所以还要通过该book获取到他的最新章节
        // 先看book有无latestChapter属性，没有的话就从服务器获取最新章节的url: localhost:3000/easyreading/books/:id/latestChapter
        const latestChapter = book.latestChapter || {id:"86523",volumeId:"8566",bookId:book.id,name:"第八百九十章 露出笑脸",time:1494562220,numbers:3000,isFree:true,link:""};

        return(
            <div className="chapterList">
                <div className="header">
                    <div className="left" style={{width:300}}>
                        <Breadcrumb separator=">" >
                            <Breadcrumb.Item > <Link to={`/index`} >首页</Link></Breadcrumb.Item>
                            <Breadcrumb.Item ><Link to={`/bookCity`} >书城</Link></Breadcrumb.Item>
                            <Breadcrumb.Item ><Link to={`/bookCity/books/${book.id}`} >{book.name}</Link></Breadcrumb.Item>
                            <Breadcrumb.Item ><Link to={`/bookCity/books/${book.id}/chapterList`} style={{color:"#40a9ff"}}>章节列表</Link></Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
{/*                    <div className="right">
                        <p>倒序</p>
                    </div>*/}
                </div>
                <div className="title">
                    <h1>{book.name}</h1>
                    <p>
                        <span>作者: {book.author}</span>

                        <span>更新时间: {timestampFormat(latestChapter.time)}</span>
                        <span>最新章节: {latestChapter.name}</span>
                        <span onClick={this.handleChaptersSort.bind(this)}><a className="sort">{this.state.sort === 'icon-shengxu' ? '正序' : '倒序'}<i className={`iconfont ${this.state.sort}`}/></a></span>
                    </p>
                </div>
                <div className="content">
                    {volumes.map((item,index) => {
                        return <VolumeComponent key={index} volume={item} bookId={book.id}/>
                    })}
                </div>
            </div>
        );
    }
}