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
        const book = {id:"book2019010011",name:"仙宫",isFinished:false,isFree:true,author:"大眼怪",score:8.2,type:["武侠","仙侠","幻想"],rankNumber:40,numbers:231454545,clickedNumbers:1514514,membershipClicked:8452852,recommendNumbers:525742,description:"修仙觅长生，热血任逍遥，踏莲曳波涤剑骨，凭虚御风塑圣魂！修仙觅长生，热血任逍遥，踏莲曳波涤剑骨，凭虚御风塑圣魂！修仙觅长生，热血任逍遥，踏莲曳波涤剑骨，凭虚御风塑圣魂！",imgSrc:"https://bookcover.yuewen.com/qdbimg/349573/1013561350/180",preface:`"冤有头，债有主，你我往日无怨，近日无仇，在下职责所在，奉命行事，得罪了。”
                               王腾念了一遍工作语，一刀斩下犯人头颅。
                               然后，一个白色光团从囚犯身体里冒出。
                               他的目光不由看向这个白色光团。
                               基础刀法！
                               在这光团上面，还有着‘拾取’字样。
                               “拾取！”
                               王腾意念一动。`,latestChapter:{id:"86523",volumeId:"8566",bookId:"book2019010011",name:"第八百九十章 露出笑脸",time:1494562220,numbers:3000,isFree:true,link:""}};

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