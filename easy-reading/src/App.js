import React, { Component } from 'react';
import logo from './logo.svg';
import './css/IndexHeader.css';
import './static/iconfont.css';
import './css/BookList.css';
import IndexHeaderSearch from "./components/IndexHeaderSearch";
import IndexHeaderMain from "./components/IndexHeaderMain";
import BookList from "./components/BookList";

class App extends Component {
  render() {
    return (
      <div className="header">
          <IndexHeaderSearch/>
         {/* <IndexHeaderMain/>*/}
          <BookList/>
      </div>
    );
  }
}

export default App;
