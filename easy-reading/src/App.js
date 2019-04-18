import React, { Component } from 'react';
import logo from './logo.svg';
import './css/IndexHeader.css';
import './static/iconfont.css';
import IndexHeaderSearch from "./components/IndexHeaderSearch";
import IndexHeaderMain from "./components/IndexHeaderMain";
import BookList from "./components/BookList";
import ChapterList from "./components/ChapterList";

class App extends Component {
  render() {
    return (
      <div className="header">
          <IndexHeaderSearch/>
         {/* <IndexHeaderMain/>*/}
          {/*<BookList/>*/}
          <ChapterList/>
      </div>
    );
  }
}

export default App;
