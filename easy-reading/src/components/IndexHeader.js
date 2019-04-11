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
import PopularModule from "./PopularModule";
export default class IndexHeader extends Component{
    render(){
        return(
            <div className="header">
                <IndexHeaderSearch/>
                <IndexHeaderMain/>
                <PersonalizedModule/>
                <FinishedModule moduleType="完本精选"/>
                <FinishedModule moduleType="火热新书"/>
                <PopularModule moduleType="热门作品"/>
            </div>
        )
    }
}