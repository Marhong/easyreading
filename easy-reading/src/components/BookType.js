import React,{Component} from 'react';
import '../static/iconfont.css';

export default class BookType extends Component{
    render(){
        return(
            <div>

                <i className={`iconfont ${this.props.item.iconName}`}/>
                <i>{this.props.item.name}</i>
                <b>{this.props.item.number}</b>

            </div>
        );
    }
}