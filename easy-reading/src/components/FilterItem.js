import React,{Component} from 'react';
import {Tag} from 'antd';
require('../css/FilterPanel.css');


export default class FilterItem extends Component{
    static defaultProps = {
        data : [],
        type:"分类",
    };

    // 让每个tag组的第一个tag也就是值为"全部"的那个变为选择状态
    componentDidMount(){
        let firsts = document.getElementsByClassName("first");
        if(!firsts[0].classList.contains("ant-tag-checkable-checked")){
            let start = 0;
            // 如果书籍类型参数不为空，就从第而个“全部”Tag开始变为选中状态
            if(this.props.defaultType.value){
                start =1;
            }
            for(let i=start,len=firsts.length;i<len;i++){
                firsts[i].classList.add("ant-tag-checkable-checked");
            }
        }

        // 如果书籍类型参数不为空,就将“分类”这个Tag集合里的对应书籍类型Tag变为选中状态
        if(this.props.defaultType.value !== ""){
        let tags = this.filterItem.getElementsByClassName("ant-tag");
        for(let i=0,len=tags.length;i<len;i++){
            let curTag = tags[i];
            if(curTag.innerHTML === this.props.defaultType.value){
                if(curTag.classList.contains("ant-tag")){
                    curTag.classList.add("ant-tag-checkable-checked");
                }
                break;
            }
        }
        }
    }
    // 让每个tag组只能选择其中的一个,一旦选了一个新的tag，则原来为选中状态的tag变为未选中状态
    handleTagSelected(e){
        let event = e ? e : window.event;
        let target = event.target ? event.target : event.srcElement;
        let tags = target.parentNode.children;
        for(let i=0,len=tags.length;i<len;i++){
            tags[i].classList.remove("ant-tag-checkable-checked");
        }
        if(target.classList.contains("ant-tag")){
            target.classList.add("ant-tag-checkable-checked");
        }

        // 将选择的tag对象传递给父组件
        let selected = target.innerHTML;
        if(this.props.onSelect){
            this.props.onSelect({type:this.props.type,value:selected});
        }
    }

    render(){
        const first = true;
        return(
            <div className="filterItem"  ref={(filterItem) => this.filterItem = filterItem}>
                <p className="type"><strong>{this.props.type}</strong></p>
                {this.props.data.map((item,index) => {
                        if(index == 0){
                            return <Tag key={index} className="first" onClick={this.handleTagSelected.bind(this)}>{item}</Tag>
                        }else{

                        } return <Tag key={index} onClick={this.handleTagSelected.bind(this)}>{item}</Tag>

                })}
            </div>
        );
    }
}
