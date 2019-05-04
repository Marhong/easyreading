import React, { Component } from 'react';
import logo from './logo.svg';
import './css/IndexHeader.css';
import './static/iconfont.css';
import './css/Upload.css';
import IndexHeaderSearch from "./components/IndexHeaderSearch";

import IndexPageRouter from './components/IndexPage'
import PersonalCenter from "./components/PersonalCenter";

class App extends Component {
  render() {
    return (
      <div className="header">

        <IndexHeaderSearch/>
        {/*<IndexPageRouter/>*/}
{/*        <IndexHeaderMain/>
          <HeavyRecommend/>
          <FinishedModule moduleType="完本精选"/>
          <FinishedModule moduleType="火热新书"/>
          <PopularModule moduleType="热门作品"/>*/}
        {/*  <BulletinList/>*/}
         {/* <BulletinItem/>*/}
      {/*   <BookCity/>*/}
        {/*<BookList/>*/}
       {/*<BookListDetail/>*/}
      {/*    <ChapterList/>*/}
     {/*  <BookDetail/>*/}
  {/* <ChapterReader/>*/}
  {/*<PersonalCenter/>*/}
{/*    <Administrator/>*/}
{/*  <Upload/>*/}
      </div>
    );
  }
}

export default App;
