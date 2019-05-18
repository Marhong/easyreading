import React,{Component} from 'react';
import {Breadcrumb} from 'antd';
import '../css/ChapterList.css';
import VolumeComponent from "./VolumeComponent";
import {Link} from 'react-router-dom';
import {timestampFormat} from "../static/commonFun";
import reqwest from "reqwest";
import moment from 'moment';
const bookUrl = "http://localhost:5000/easyreading/book";
const chapterUrl = "http://localhost:5000/easyreading/chapter";
const volumeUrl = "http://localhost:5000/easyreading/volume";
export default class ChapterList extends Component{

    constructor(props){
        super(props);
        this.state = {
            sort : "icon-shengxu",
            book:{},
            volumes:[],
            latestChapter:{},
        }
    }
    componentDidMount(){
        document.documentElement.style.backgroundColor = "white";
        document.body.style.backgroundColor = "white";
        let bookId = this.props.match.params.id;
        console.log("书籍id:"+this.props.match.params.id);
        // 通过bookId从服务器获取书籍
        reqwest({
            url:`${bookUrl}/${bookId}`,
            type:'json',
            method:'get',
            error:(err)=>console.log("获取失败"),
            success:(res)=>{
                this.setState({...this.state,book:res,latestChapter:res.latestChapter});
            }
        });
        reqwest({
            url:`${volumeUrl}/${bookId}/all`,
            type:'json',
            method:'get',
            error:(err)=>console.log("获取失败"),
            success:(res)=>{
                this.setState({...this.state,volumes:res});
            }
        });
    }

    handleChaptersSort(){
        this.setState({sort:this.state.sort==="icon-shengxu" ? "icon-jiangxu" : "icon-shengxu"});
    }
    render(){
        const book = this.state.book;
        const volumes = this.state.volumes;
        const latestChapter = this.state.latestChapter;

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
                </div>
                <div className="title">
                    <h1>{book.name}</h1>
                    <p>
                        <span>作者: {book.author}</span>

                        <span>更新时间: {latestChapter ? moment(latestChapter.time).format('YYYY-MM-DD HH:mm:ss') : ""}</span>
                        <span>最新章节: {latestChapter.name}</span>
    {/*       这个正序、倒序暂时先不实现             <span onClick={this.handleChaptersSort.bind(this)}><a className="sort">{this.state.sort === 'icon-shengxu' ? '正序' : '倒序'}<i className={`iconfont ${this.state.sort}`}/></a></span>*/}
                    </p>
                </div>
                <div className="content">
                    {volumes.map((item,index) => {
                        return <VolumeComponent key={index} volume={item} bookId={item.bookId}/>
                    })}
                </div>
            </div>
        );
    }
}