import React,{Component,Fragment} from 'react';
import IndexHeaderSearch from './IndexHeaderSearch';
import IndexHeaderMain from './IndexHeaderMain';

import HeavyRecommend from "./HeavyRecommend";
import FinishedModule from "./FinishedModule";
import PopularModule from "./PopularModule";
import MyBookCard from "./MyBookCard";
export default class IndexHeader extends Component{
    render(){
        return(
            <div className="header">
                <IndexHeaderSearch/>
                <IndexHeaderMain/>
                <HeavyRecommend/>
                <FinishedModule moduleType="完本精选"/>
                <FinishedModule moduleType="火热新书"/>
                <PopularModule moduleType="热门作品"/>
                <hr/>

            </div>
        )
    }
}