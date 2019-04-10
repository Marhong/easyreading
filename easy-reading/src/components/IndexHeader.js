import React,{Component,Fragment} from 'react';
import IndexHeaderSearch from './IndexHeaderSearch';
import IndexHeaderLeft from './IndexHeaderLeft';
import IndexHeaderCenter from './IndexHeaderCenter';
import IndexHeaderRight from './IndexHeaderRight';
import IndexHeaderMain from './IndexHeaderMain';
import '../css/IndexHeader.css';
import '../static/iconfont.css';
import PersonalizedModule from "./PersonalizedModule";
import FinishedModule from "./FinishedModule";
import MyNormalCard from "./MyNormalCard";
export default class IndexHeader extends Component{
    render(){
        return(
            <div className="header">
                <IndexHeaderSearch/>
                <IndexHeaderMain/>
                <PersonalizedModule/>
                <FinishedModule/>
                <hr/>
                <MyNormalCard book={{id:"sm122",imgSrc:"https://bookcover.yuewen.com/qdbimg/349573/1013451202/180",name:"11征服荒野",bookHref:"",desc:"我是简介所为和司我是",author:"天蚕土豆"}}/>
                <hr/>
            </div>
        )
    }
}