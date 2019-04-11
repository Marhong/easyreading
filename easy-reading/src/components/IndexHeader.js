import React,{Component,Fragment} from 'react';
import IndexHeaderSearch from './IndexHeaderSearch';
import IndexHeaderMain from './IndexHeaderMain';
import '../css/IndexHeader.css';
import '../static/iconfont.css';
import PersonalizedModule from "./PersonalizedModule";
import LeftSelectedCard from "./LeftSelectedCard";
import MyNormalCard from "./MyNormalCard";
import FinishedModule from "./FinishedModule";
import MyListCard from "./MyListCard";
export default class IndexHeader extends Component{
    render(){
        return(
            <div className="header">
                <IndexHeaderSearch/>
                <IndexHeaderMain/>
                <PersonalizedModule/>
                <FinishedModule moduleType="完本精选"/>
                <FinishedModule moduleType="火热新书"/>
                <MyListCard data={{bookType:"玄幻",books:[{id:"sm122",type:"玄幻",imgSrc:"https://bookcover.yuewen.com/qdbimg/349573/1013451202/180",name:"11征服荒野",bookHref:"",desc:"我是简介所为和司我是"},]}}/>
            </div>
        )
    }
}