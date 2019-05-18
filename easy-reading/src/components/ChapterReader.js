import React,{Component} from 'react';
import {findDOMNode} from 'react-dom';
import {Breadcrumb,Button,Menu,} from 'antd';
import PageSetting from "./PageSetting";
import {Link} from 'react-router-dom';
import reqwest from "reqwest";
import moment from 'moment';
import {message} from "antd/lib/index";
const bookUrl = "http://localhost:5000/easyreading/book";
const chapterUrl = "http://localhost:5000/easyreading/chapter";
const readingSettingUrl = "http://localhost:5000/easyreading/reading_setting";
require('../css/ChapterReader.css');

export default class ChapterReader extends Component{
    constructor(props) {
        super(props);
        this.state = {
            // 通过chapterId从服务器去获取chapter
            chapter: {},
            style: {},
            bookId: props.match.params.bookId,
            chapterId: props.match.params.id,
            userId: JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user")).id,
            book: {},
        }

    }
    // 默认的阅读界面设置
    componentDidMount(){
        // 通过bookId从服务器获取书籍
        reqwest({
            url:`${bookUrl}/${this.props.match.params.bookId}`,
            type:'json',
            method:'get',
            error:(err)=>console.log("获取失败"),
            success:(res)=>{
                this.setState({...this.state,book:res});
            }
        });
        reqwest({
            url:`${readingSettingUrl}/${this.state.userId}`,
            type:'json',
            method:'get',
            error:(err)=>console.log("获取失败"),
            success:(res)=>{
                let style = res;
                document.documentElement.style.backgroundColor = style.pageBgColor;
                document.body.style.backgroundColor = style.pageBgColor;
                this.readBox.style.background = style.bgColor;
                this.readBox.style.fontSize = style.fontSize+"px";
                this.content.style.width = style.pageWidth-200+"px";
                this.setState({...this.state,style:style});
            }
        });
        reqwest({
            url:`${chapterUrl}/${this.props.match.params.id}`,
            type:'json',
            method:'get',
            error:(err)=>console.log("获取失败"),
            success:(res)=>{
                this.setState({...this.state,chapter:res});
            }
        });

    }
    // 根据用户选择设置阅读界面
    handleSetting(personalStyle){

        let style;
        if(personalStyle == null){
            style = this.state.style;
        }else{
            style = personalStyle;
        }
        this.readBox.style.background = style.bgColor;
        if(style.bgColor.toLowerCase() === "rgb(52, 52, 52)"){
            this.readBox.style.color = "#999999";
        }else{
            this.readBox.style.color = "black";
        }
        document.documentElement.style.backgroundColor = style.pageBgColor;
        document.body.style.backgroundColor = style.pageBgColor;
        this.content.style.fontSize = style.fontSize+"px";
        this.readBox.style.width = style.pageWidth+"px";
        this.content.style.width = style.pageWidth-200+"px";
        this.content.style.fontFamily = style.fontFamily;

        // 将新的readingSetting上传到服务器更新。url: localhost:3000/easyreading/readingSetting/:id/update
        reqwest({
            url:`${readingSettingUrl}/${this.state.userId}/save`,
            type:'json',
            method:'post',
            data:style,
            error:(err)=>console.log("获取失败"),
            success:(res)=>{
                this.setState({...this.state,style:style});
            }
        });
    }
    handleControl(e){
        let pageSetting =findDOMNode(this.setting);
        let clickSpan = e.target;
        if(clickSpan.classList.contains("viewChapList")){

        }else{
            pageSetting.style.display = "block";
        }
    }
    // 切换到上一章节
    handlePreChapter(e){
        // 从服务器获取当前章节的上一章。

        let curId = Number(this.state.chapterId);
        let firstId = Number(this.state.book.firstChapter);
        if(curId>firstId){
            reqwest({
                url:`${chapterUrl}/${curId-1}`,
                type:'json',
                method:'get',
                error:(err)=>console.log("获取失败"),
                success:(res)=>{

                    this.setState({...this.state,chapter:res,chapterId:curId-1});
                }
            });
        }else{
            message.warn("已经到第一章");
        }
    }
    // 切换到下一章节
    handleNextChapter(e){
        // 从服务器获取当前章节的下一章。
            let curId = Number(this.state.chapterId);
            let lastId = Number(this.state.book.latestChapter.id);
            if(curId<lastId){
                reqwest({
                    url:`${chapterUrl}/${curId+1}`,
                    type:'json',
                    method:'get',
                    error:(err)=>console.log("获取失败"),
                    success:(res)=>{

                        this.setState({...this.state,chapter:res,chapterId:curId+1});
                    }
                });
            }else{
                message.warn("已经到最后一章");
            }
    }

    render(){
        const chapter = this.state.chapter;
        const book = this.state.book;
        //console.log(this.props.match.params.bookId,this.props.match.params.id);
        return(
                <div className="readerPage">
                    <div className="readerCrumb" style={{width:300}}>
                        <Breadcrumb separator=">" >
                            <Breadcrumb.Item > <Link to={`/index`} >首页</Link></Breadcrumb.Item>
                            <Breadcrumb.Item ><Link to={`/bookCity`} >书城</Link></Breadcrumb.Item>
                            <Breadcrumb.Item ><Link to={`/bookCity/books/${this.state.bookId}`} >{book ? book.name : ""}</Link></Breadcrumb.Item>
                            <Breadcrumb.Item ><Link to={`/bookCity/books/${this.state.bookId}/chapterList`} >章节列表</Link></Breadcrumb.Item>
                            <Breadcrumb.Item ><Link to={`/bookCity/books/${this.state.bookId}/chapterList/${chapter ? chapter.id : ""}`} style={{color:"#40a9ff"}}>{chapter ? chapter.name : ""}</Link></Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className="readerBox" ref={(readBox) => this.readBox = readBox}>
                         <PageSetting onSetting={this.handleSetting.bind(this)} ref={(setting) => this.setting =setting} style={this.state.style}/>
                         <div className="chapInfo">
                             <h3 ref={(name) => this.name=name}>{chapter.name}</h3>
                             <p>
                                <span>作者: {book ? book.author : ""}</span>
                                <span>字数: {chapter ? chapter.numbers : ""}</span>
                                <span>更新时间: {moment(chapter.time).format('YYYY-MM-DD HH:mm:ss')}</span>
                                 <span className="control" onClick={this.handleControl.bind(this)}><Link to={`/bookCity/books/${this.state.bookId}/chapterList`} > <span className="viewChapList"><i className="iconfont icon-mulu"/> 章节目录</span></Link><span ><i className="iconfont icon-shezhi"/> 设置</span></span>
                             </p>
                         </div>

                            <div className="content" ref={(content) => this.content = content}
                                 dangerouslySetInnerHTML={{__html: chapter.content}}/>
                        <div className="readerFooter">
                            <a href="javascript:scrollTo(0,0);"><span className="control"> <Button onClick={this.handlePreChapter.bind(this)}>上一章</Button><Link to={`/bookCity/books/${this.state.bookId}/chapterList`} ><Button>章节目录</Button></Link><Button onClick={this.handleNextChapter.bind(this)}>下一章</Button></span></a>
                        </div>
                    </div>
                </div>

        );
    }
}