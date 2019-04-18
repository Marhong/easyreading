import React,{Component} from 'react';
import {Tag} from 'antd';
import FilterItem from "./FilterItem";

export default class FilterPanel extends Component{
    static defaultProps = {
        data :[{type:"分类",value:["全部","玄幻","修正"]},
            {type:"状态",value:["全部","状态1","状态2"]},
            {type:"属性",value:["全部","属性1","属性2"]},
            {type:"字数",value:["全部","字数1","字数2"]},
            {type:"更新时间",value:["全部","更新时间1","更新时间2"]},
            {type:"品质",value:["全部","品质1","品质2"]},
            {type:"标签",value:["全部","标签1","标签2"]},]
    }
    constructor(){
        super();
        this.state = {
            selected : [],
        }
    }

    handleCLick(selected){
        // 之所以要判断值类型是否为string，是因为不知道为什么点击一个tag会发生两次click事件，
        // 一次将tag值传过来，第二次传了一个object对象
        if(typeof selected.value === "string"){
            // 将this.state.selected值设为选中的tag值
            // 数组里存的是对象，一个属性是tag类别，一个属性值tag值
            this.setState((prevState) => {
                let items = prevState.selected;
                // 判断这种类型的tag之前是否已经选取过
                if(JSON.stringify(items).indexOf(selected.type) !== -1){
                    // 选过的话，看这一次tag是否为"全部"
                    if(selected.value === "全部"){
                        // 是“全部”的话就将这个tag对象删除
                        items.splice(items.findIndex((item) => item.type === selected.type),1);
                    }else{
                        // 不是“全部”的话就替换原来这个类型的tag值
                        items.splice(items.findIndex((item) => item.type === selected.type),1,selected);

                    }
                }else{
                    // 之前没选过的话直接添加到数组中
                    items.splice(items.length,0,(selected));
                }
                return {selected: items}
            });
        }

    console.log(this.state.selected);
    }
    render(){
        const result = this.state.selected;
        const data = this.props.data;
        return(
            <div onClick={this.handleCLick.bind(this)}>
                <p className="type"><strong>已选择</strong></p>
                <div className="selectedTags">
                    {function(result){
                        // 判断选中的tag对象数组是否为空
                        if(result.length>0){
                            // 不为空的话就展示所有选中的
                            let final = [];
                            for(let i=0,len=result.length;i<len;i++){
                                final[i] = <Tag key={i} color="#f50">{result[i].value}</Tag>
                            }
                            return final;
                        }else{
                            // 为空的话就默认展示“全部”
                            return <Tag color="#f50">全部</Tag>
                        }
                    }(result)}
                </div>
                {data.map((item,index) => {
                    return <FilterItem key={index} onSelect={this.handleCLick.bind(this)} type={item.type} data={item.value}/>
                })}
            </div>
        );
    }
}