import React,{Component} from 'react';
import '../static/iconfont.css';

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