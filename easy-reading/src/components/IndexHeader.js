import React,{Component,Fragment} from 'react';
import IndexHeaderSearch from './IndexHeaderSearch';
import IndexHeaderMain from './IndexHeaderMain';

import PersonalizedModule from "./PersonalizedModule";
import FinishedModule from "./FinishedModule";
import PopularModule from "./PopularModule";
import MyBookCard from "./MyBookCard";
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
                <hr/>

            </div>
        )
    }
}