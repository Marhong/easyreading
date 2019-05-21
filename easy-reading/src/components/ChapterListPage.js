import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Link ,Switch} from "react-router-dom";
import BulletinList from "./BulletinList";
import BulletinItem from "./BulletinItem";
import IndexPageRouter from "./IndexPage";
import BookListDetail from "./BookListDetail";
import BookList from "./BookList";
import BookDetail from "./BookDetail";
import BookCity from "./BookCity";
import ChapterList from "./ChapterList";
import ChapterReaderPageRouter from "./ChapterReaderPage";
import BookDetailPageRouter from "./BookDetailPage";
import BookCityPageRouter from "./BookCityPage";
import AppPageRouter from "../App";
import Administrator from "./Administrator";
import PersonalCenter from "./PersonalCenter";

class ChapterListPage extends  Component{

    render() {
        console.log("ListPage书籍id:"+this.props.match.params.bookId,"章节id："+this.props.match.params.id);

        return (
            <div>
                <Switch >

                    <Route exact path="/" component={AppPageRouter} />
                    <Route exact path="/bookCity" component={BookCityPageRouter} />
                    <Route  exact path="/bookCity/books/:id" component={BookDetailPageRouter} />
                    <Route exact path="/bookCity/books/:id/chapterList" component={ChapterList} />
                    <Route exact path="/bookCity/books/:bookId/chapterList/:id" component={ChapterReaderPageRouter} />
                    <Route exact path="/personalCenter" component={PersonalCenter} />
                    <Route exact path="/administrator" component={Administrator} />
                </Switch>
            </div>
        );
    }
}

function ChapterListPageRouter() {
    return (
        <Router >
            <Route component={ChapterListPage} />
        </Router>
    );
}

export default ChapterListPageRouter;