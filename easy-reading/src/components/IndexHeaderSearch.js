import React,{Component} from 'react';
import {Input} from 'antd';


const Search = Input.Search;
// 展示首页头部搜索模块
export default class IndexHeaderSearch extends Component{
    render(){
        return(
            <div className="search">

                <img src="https://qidian.gtimg.com/qd/images/logo.beebc.png"  alt="易读中文网" />

                <input type="text" id="searchComponent"/>

                <span >
                    个人中心
                </span>

            </div>
        )
    }
}