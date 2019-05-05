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

class ChapterListPage extends  Component{

    render() {
        console.log(this.props.match.params.id);
        return (
            <div>
                <Switch >

                    <Route exact path="/index" component={IndexPageRouter} />
                    <Route exact path="/bookCity" component={BookCity} />
                    <Route  exact path="/bookCity/books/:id" component={BookDetail} />
                    <Route exact path="/bookCity/books/:id/chapterList/id" component={ChapterReaderPageRouter} />
                    <Route exact path="/bookCity/books/:id/chapterList" component={ChapterList} />
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