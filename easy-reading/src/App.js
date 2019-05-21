import React, { Component } from 'react';
import logo from './logo.svg';
import './css/IndexHeader.css';
import './static/iconfont.css';
import IndexHeaderSearch from "./components/IndexHeaderSearch";
import MainContent from "./components/MainContent";
import BookCity from "./components/BookCity";
import IndexPageRouter from "./components/IndexPage";
import BookDetailPageRouter from "./components/BookDetailPage";
import { BrowserRouter as Router, Route, Link ,Switch} from "react-router-dom";
import BookCityPageRouter from "./components/BookCityPage";
import BulletinListPageRouter from "./components/BulletinListPage";
import Administrator from "./components/Administrator";
import PersonalCenter from "./components/PersonalCenter";
import BookListPageRouter from "./components/BookListPage";
import BookReadingData from "./components/BookReadingData";
import UserReadingRecordData from "./components/UserReadingRecordData";

class App extends Component {
  render() {
    return (
        <div className="header">
            <Switch >
                <Route exact path="/" component={MainContent} />
                <Route exact path="/bookCity" component={BookCityPageRouter} />
                <Route exact path="/bookList" component={BookListPageRouter} />
                <Route exact path="/bookCity/:type" component={BookCityPageRouter} />
                <Route  exact path="/bookCity/books/:id" component={BookDetailPageRouter} />
                <Route exact path="/bulletinList" component={BulletinListPageRouter} />
                <Route exact path="/personalCenter" component={PersonalCenter} />
                <Route exact path="/administrator" component={Administrator} />
                <Route exact path="/book_reading_data" component={BookReadingData} />
                <Route exact path="user_reading_data" component={UserReadingRecordData} />
            </Switch>
        </div>
    );
  }
}

function AppPageRouter() {
    return (
        <Router >
            <Route component={App} />
        </Router>
    );
}
export default AppPageRouter;


