import React,{Component} from 'react';
import {Breadcrumb} from 'antd';
import '../css/ChapterList.css';
import VolumeComponent from "./VolumeComponent";

export default class ChapterList extends Component{
    static defaultProps = {
        data :[{name:"卷一 大城小事",count:24,wordNumbers:524561245,data:
                [{id:45112,name:"第一章 有朋字远方来，尚能饭否",href:""},
                ]},
                {name:"卷二 小城大事",count:24,wordNumbers:524561245,data:
                [{id:45112,name:"第一章 学而不思则，思而不学则殆",href:""},
                ]},
                {name:"卷三 城里无事",count:24,wordNumbers:524561245,data:
                    [{id:45112,name:"第一章 三人行必有我师焉",href:""},
                    ]},],
    }
    constructor(){
        super();
        this.state = {
            sort : "icon-shengxu",
        }
    }
    handleChaptersSort(){
        this.setState({sort:this.state.sort==="icon-shengxu" ? "icon-jiangxu" : "icon-shengxu"});
    }
    render(){

        return(
            <div className="chapterList">
                <div className="header">
                    <div className="left">
                        <Breadcrumb separator=">" >
                            <Breadcrumb.Item href="">首页</Breadcrumb.Item>
                            <Breadcrumb.Item href="">书籍列表</Breadcrumb.Item>
                            <Breadcrumb.Item href="">剑来</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
{/*                    <div className="right">
                        <p>倒序</p>
                    </div>*/}
                </div>
                <div className="title">
                    <h1>剑来</h1>
                    <p>
                        <span>作者: 烽火戏诸侯</span>
                        <span>更新时间: 14小时前</span>
                        <span>最新章节: 第120章 友谊第一，比赛第二</span>
                        <span onClick={this.handleChaptersSort.bind(this)}><a className="sort">{this.state.sort === 'icon-shengxu' ? '正序' : '倒序'}<i className={`iconfont ${this.state.sort}`}/></a></span>
                    </p>
                </div>
                <div className="content">
                    {this.props.data.map((item,index) => {
                        return <VolumeComponent key={index} volume={item}/>
                    })}
                </div>
            </div>
        );
    }
}