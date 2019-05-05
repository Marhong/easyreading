import React, { Component } from 'react';
import logo from './logo.svg';
import './css/IndexHeader.css';
import './static/iconfont.css';
import IndexHeaderSearch from "./components/IndexHeaderSearch";


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
      </div>
    );
  }
}

export default App;
