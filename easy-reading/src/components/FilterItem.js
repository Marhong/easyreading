import React,{Component} from 'react';
import {Tag} from 'antd';
require('../css/FilterPanel.css');


export default class FilterItem extends Component{
    static defaultProps = {
        data : ["全部","秦代","汉代","元代","明代","汉代","元代","明代"],
        type:"分类",
    };

    // 让每个tag组的第一个tag也就是值为"全部"的那个变为选择状态
    componentDidMount(){
        let firsts = document.getElementsByClassName("first");
        if(!firsts[0].classList.contains("ant-tag-checkable-checked")){
            for(let i=0,len=firsts.length;i<len;i++){
                firsts[i].classList.add("ant-tag-checkable-checked");
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
            <div className="filterItem"  >
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
