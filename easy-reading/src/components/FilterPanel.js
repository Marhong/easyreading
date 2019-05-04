import React,{Component} from 'react';
import {Tag} from 'antd';
import FilterItem from "./FilterItem";
import {getDefaultType} from '../static/commonFun';
export default class FilterPanel extends Component{
    static defaultProps = {
        data :[{type:"分类",value:["全部","玄幻","奇幻","仙侠","历史","都市","科幻","军事","灵异"]},
            {type:"状态",value:["全部","完结","未完结"]},
            {type:"属性",value:["全部","免费","VIP"]},
            {type:"字数",value:["全部","30万字以下","30-50万字","50-100万字","100-200万字","200万字以上"]},
            {type:"更新时间",value:["全部","三日内","七日内","半月内","一月内"]},
            {type:"品质",value:["全部","签约作品","精品小说"]},
            {type:"标签",value:["全部","热血","重生","豪门","孤儿","盗贼","特工","黑客","明星","特种兵","杀手","老师","学生"]},]
    }
    constructor(props){
        super(props);
        // 如果没有传递参数，则默认为“全部”
        let defaultType = getDefaultType(this.props.defaultType);
        let defaultSelected = [];
        if(defaultType.value){
            defaultSelected = [defaultType];
        }
        this.state = {
            selected :defaultSelected,
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
                    return <FilterItem key={index} onSelect={this.handleCLick.bind(this)} type={item.type} data={item.value} defaultType={getDefaultType(this.props.defaultType)}/>
                })}
            </div>
        );
    }
}