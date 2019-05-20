import React,{Component} from 'react';
import {findDOMNode} from 'react-dom';
import {Breadcrumb,Button,Menu,} from 'antd';
import PageSetting from "./PageSetting";
import {Link} from 'react-router-dom';
import reqwest from "reqwest";
import moment from 'moment';
import {message} from "antd/lib/index";
import IndexHeaderSearch from "./IndexHeaderSearch";
const bookUrl = "http://localhost:5000/easyreading/book";
const chapterUrl = "http://localhost:5000/easyreading/chapter";
const readingSettingUrl = "http://localhost:5000/easyreading/reading_setting";
const chapterReadingRecordUrl = "http://localhost:5000/easyreading/chapterreadingrecord";
require('../css/ChapterReader.css');

export default class ChapterReader extends Component{
    constructor(props) {
        super(props);
        console.log("该对象创建一次");
        let userId = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user")).id;
        this.state = {
            // 通过chapterId从服务器去获取chapter
            chapter: {},
            style: {},
            bookId: props.match.params.bookId,
            chapterId: props.match.params.id,
            userId: userId,
            book: {},
            curReadingRecord:0,
        };
        // 用户第一次进入章节阅读界面时，插入一条该章节的阅读记录
        reqwest({
            url:`${chapterReadingRecordUrl}/add`,
            type:'json',
            method:'post',
            data:{chapterId:props.match.params.id,bookId:props.match.params.bookId,userId:userId,startTime:Date.now(),endTime:0},
            error:(err)=>console.log("获取失败"),
            success:(res)=>{
               this.setState({...this.state,curReadingRecord:res.id});
            }
        });
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
    // 阅读界面组件卸载时，认为当前章节阅读完成
    componentWillUnmount(){
        reqwest({
            url:`${chapterReadingRecordUrl}/update`,
            type:'json',
            method:'post',
            data:{id:this.state.curReadingRecord,endTime:Date.now()},
            error:(err)=>console.log("获取失败"),
            success:(res)=>{

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
            // 当用户请求上一章节时，认为当前章节已经阅读完毕，更新当前章节阅读记录的endTime,
            reqwest({
                url:`${chapterReadingRecordUrl}/update`,
                type:'json',
                method:'post',
                data:{id:this.state.curReadingRecord,endTime:Date.now()},
                error:(err)=>console.log("获取失败"),
                success:(res)=>{

                }
            });
            // 同时插入一条上一章节的阅读记录（如果用户一个章节阅读了两次，还是分别插入两条记录）
            reqwest({
                url:`${chapterReadingRecordUrl}/add`,
                type:'json',
                method:'post',
                data:{chapterId:curId-1,bookId:this.state.bookId,userId:this.state.userId,startTime:Date.now(),endTime:0},
                error:(err)=>console.log("获取失败"),
                success:(res)=>{
                    this.setState({...this.state,curReadingRecord:res.id});
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
                // 当用户请求下一章节时，认为当前章节已经阅读完毕，更新当前章节阅读记录的endTime,
                reqwest({
                    url:`${chapterReadingRecordUrl}/update`,
                    type:'json',
                    method:'post',
                    data:{id:this.state.curReadingRecord,endTime:Date.now()},
                    error:(err)=>console.log("获取失败"),
                    success:(res)=>{

                    }
                });
                // 同时插入一条下一章节的阅读记录
                reqwest({
                    url:`${chapterReadingRecordUrl}/add`,
                    type:'json',
                    method:'post',
                    data:{chapterId:curId+1,bookId:this.state.bookId,userId:this.state.userId,startTime:Date.now(),endTime:0},
                    error:(err)=>console.log("获取失败"),
                    success:(res)=>{
                        this.setState({...this.state,curReadingRecord:res.id});
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
            <div>
                <IndexHeaderSearch/>
                <div className="readerPage">
                    <div className="readerCrumb" style={{width:300}}>
                        <Breadcrumb separator=">" >
                            <Breadcrumb.Item > <Link to={`/`} >首页</Link></Breadcrumb.Item>
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
                            <span className="control">   <a href="javascript:scrollTo(0,0);"><Button onClick={this.handlePreChapter.bind(this)}>上一章</Button></a><Link to={`/bookCity/books/${this.state.bookId}/chapterList`} ><Button>章节目录</Button></Link>  <a href="javascript:scrollTo(0,0);"><Button onClick={this.handleNextChapter.bind(this)}>下一章</Button></a></span>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}