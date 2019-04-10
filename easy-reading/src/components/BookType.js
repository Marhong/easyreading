import React,{Component} from 'react';

// 展示书籍类型图标和书籍类型名字的组件
export default class BookType extends Component{
    static defaultProps = {
        item:{},
    }
    render(){
        return(
            <div className="typeComponent">
                <div className="typeIcon">
                <i className={`iconfont ${this.props.item.iconName}`}/>
                </div>
                <div className="typeName">
                <b>{this.props.item.name}</b>
                <b>{this.props.item.number}</b>
                </div>
            </div>
        );
    }
}