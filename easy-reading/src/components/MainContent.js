import React, { Component } from 'react';


import IndexHeaderMain from "./IndexHeaderMain";
import FinishedModule from "./FinishedModule";
import PopularModule from "./PopularModule";
import HeavyRecommend from "./HeavyRecommend";

export default class MainContent extends Component {
    render() {
        return (
            <div >
                <IndexHeaderMain/>
                <HeavyRecommend/>
                <FinishedModule moduleType="完本精选"/>
                <FinishedModule moduleType="火热新书"/>
                <PopularModule moduleType="热门作品"/>
            </div>
        );
    }
}
