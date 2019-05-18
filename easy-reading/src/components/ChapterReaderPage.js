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
import ChapterReader from "./ChapterReader";
import ChapterListPageRouter from "./ChapterListPage";
import BookCityPageRouter from "./BookCityPage";
import BookDetailPageRouter from "./BookDetailPage";

class ChapterReaderPage extends  Component{

    render() {
        console.log("ReaderPage书籍id:"+this.props.match.params.bookId,"章节id："+this.props.match.params.id);
        return (
            <div>
                <Switch >

                    <Route exact path="/index" component={IndexPageRouter} />
                    <Route exact path="/bookCity" component={BookCityPageRouter} />
                    <Route  exact path="/bookCity/books/:id" component={BookDetailPageRouter} />
                    <Route exact path="/bookCity/books/:id/chapterList" component={ChapterListPageRouter} />
                    <Route exact path="/bookCity/books/:bookId/chapterList/:id" component={ChapterReader} />

                </Switch>
            </div>
        );
    }
}

function ChapterReaderPageRouter() {
    return (
        <Router >
            <Route component={ChapterReaderPage} />
        </Router>
    );
}

export default ChapterReaderPageRouter;