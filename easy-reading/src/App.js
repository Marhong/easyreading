import React, { Component } from 'react';
import logo from './logo.svg';
import './css/IndexHeader.css';
import './static/iconfont.css';
import './css/Upload.css';
import IndexHeaderSearch from "./components/IndexHeaderSearch";
import IndexHeaderMain from "./components/IndexHeaderMain";
import BookCity from "./components/BookCity";
import ChapterList from "./components/ChapterList";
import BookDetail from "./components/BookDetail";
import FinishedModule from "./components/FinishedModule";
import PopularModule from "./components/PopularModule";
import HeavyRecommend from "./components/HeavyRecommend";
import ChapterReader from "./components/ChapterReader";
import Upload from "./components/Upload";
import PersonalCenter from "./components/PersonalCenter";
import BookList from "./components/BookList";
import BookListDetail from "./components/BookListDetail";
import {WrappedDynamicFieldSet} from './components/CreateBookList';
import BulletinList from "./components/BulletinList";
import BulletinItem from "./components/BulletinItem";
import Administrator from "./components/Administrator";


class App extends Component {
  render() {
    return (
      <div className="header">

        <IndexHeaderSearch/>
{/*        <IndexHeaderMain/>
          <HeavyRecommend/>
          <FinishedModule moduleType="完本精选"/>
          <FinishedModule moduleType="火热新书"/>
          <PopularModule moduleType="热门作品"/>*/}
        {/*  <BulletinList/>*/}
         {/* <BulletinItem/>*/}
      {/*   <BookCity/>*/}
     {/*   <BookList/>*/}
       {/*<BookListDetail/>*/}
      {/*    <ChapterList/>*/}
     {/*  <BookDetail/>*/}
  {/* <ChapterReader/>*/}
  <PersonalCenter/>
    {/*<Administrator/>*/}
{/*  <Upload/>*/}
      </div>
    );
  }
}

export default App;
