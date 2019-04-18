import React,{Component} from 'react';

export default class NavComponent extends Component{
    
    handleItemClick(e){
        let event = e ? e : window.event;
        let target = event.target ? event.target : event.srcElement;

        if(target.classList.contains("act")){
            let classlist = target.children[0].classList;
            if(classlist.contains("icon-jiangxu")){
                classlist.replace("icon-jiangxu","icon-shengxu");
            }else if(classlist.contains("icon-shengxu")){
                classlist.replace("icon-shengxu","icon-jiangxu");
            }
        }else{
            target.classList.add("act");
        }
    }
    handleItemBlur(e){
        let event = e ? e : window.event;
        let target = event.target ? event.target : event.srcElement;
        target.classList.remove("act");
        target.children[0].classList.replace("icon-shengxu","icon-jiangxu");
    }
    render(){
        return(
            <div className="select" onClick={this.handleItemClick.bind(this)} onBlur={this.handleItemBlur.bind(this)}>
                <a href="#">人气排序<i className="iconfont icon-jiangxu"/> </a>
                <a href="#">更新时间<i className="iconfont icon-jiangxu"/> </a>
                <a href="#">总收藏<i className="iconfont icon-jiangxu"/> </a>
                <a href="#">总字数<i className="iconfont icon-jiangxu"/> </a>
                <a href="#">点击次数<i className="iconfont icon-jiangxu"/> </a>
                <a href="#">推荐次数<i className="iconfont icon-jiangxu"/> </a>
                <a>共11564本相关</a>
            </div>
        );
    }
}