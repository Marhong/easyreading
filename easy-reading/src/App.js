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
import PersonalizedModule from "./components/PersonalizedModule";
import ChapterReader from "./components/ChapterReader";
import Upload from "./components/Upload";
import PersonalCenter from "./components/PersonalCenter";
import BookList from "./components/BookList";
import BookListDetail from "./components/BookListDetail";
import {WrappedDynamicFieldSet} from './components/CreateBookList';


class App extends Component {
  render() {
    return (
      <div className="header">

        <IndexHeaderSearch/>
        {/*<IndexHeaderMain/>
          <PersonalizedModule/>
          <FinishedModule moduleType="完本精选"/>
          <FinishedModule moduleType="火热新书"/>
          <PopularModule moduleType="热门作品"/>*/}
         {/*<BookCity/>*/}
        <BookList/>
  {/*<WrappedDynamicFieldSet/>*/}
       {/*<BookListDetail/>*/}
      {/*    <ChapterList/>*/}
    {/*   <BookDetail/>*/}
  {/* <ChapterReader/>*/}
{/*  <PersonalCenter/>*/}
{/*  <Upload/>*/}
      </div>
    );
  }
}

export default App;
