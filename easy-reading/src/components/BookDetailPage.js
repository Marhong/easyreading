import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Link ,Switch} from "react-router-dom";
import BulletinList from "./BulletinList";
import BulletinItem from "./BulletinItem";
import IndexPageRouter from "./IndexPage";
import BookListDetail from "./BookListDetail";
import BookList from "./BookList";
import BookDetail from "./BookDetail";
import BookCity from "./BookCity";
import ChapterListPageRouter from "./ChapterListPage";
import ChapterReaderPageRouter from "./ChapterReaderPage";
import BookCityPageRouter from "./BookCityPage";
import AppPageRouter from "../App";
import Administrator from "./Administrator";
import PersonalCenter from "./PersonalCenter";

class BookDetailPage extends  Component{

    render() {

        return (
            <div>
                <Switch >
                    <Route exact path="/" component={AppPageRouter} />
                    <Route exact path="/bookCity" component={BookCityPageRouter} />
                    <Route  exact path="/bookCity/books/:id" component={BookDetail} />
                    <Route exact path="/bookCity/books/:id/chapterList" component={ChapterListPageRouter} />
                    <Route exact path="/bookCity/books/:id/chapterList/:id" component={ChapterReaderPageRouter} />
                    <Route exact path="/personalCenter" component={PersonalCenter} />
                    <Route exact path="/administrator" component={Administrator} />
                </Switch>
            </div>
        );
    }
}

function BookDetailPageRouter() {
    return (
        <Router >
            <Route component={BookDetailPage} />
        </Router>
    );
}

export default BookDetailPageRouter;