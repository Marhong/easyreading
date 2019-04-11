import React,{Component} from 'react';
import {Input,Badge,Icon} from 'antd';


const Search = Input.Search;
// 展示首页头部搜索模块
export default class IndexHeaderSearch extends Component{
    static defaultProps={
        user:{username:"书友201904111630",},
    }
    render(){
        return(
            <div className="search">
                <div className="left">
                    <img src="https://qidian.gtimg.com/qd/images/logo.beebc.png"  alt="易读中文网" />
                </div>
                <div className="center">
                    <Search
                        placeholder="input search text"
                        enterButton="Search"
                        size="large"
                        onSearch={value => console.log(value)}
                        className="inputSearch"
                    />
                </div>
                <div className="right">
                    <span className="userInfo">
                        <span className="username">你好,</span><b>{this.props.user.username}</b>
                        <span className="username"> | </span>
                         <span>
                            <Badge count={2} dot>
                                <Icon type="notification" />
                            </Badge>
                         </span>
                         <span className="username"> | </span>
                         <span>
                             <i className="iconfont icon-shujia" id="shujia"/>
                         </span>
                     </span>
                </div>
            </div>
        )
    }
}