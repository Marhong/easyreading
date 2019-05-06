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

class ChapterListPage extends  Component{

    render() {
        console.log(this.props.match.params.id);
        let chapter = this.props.location.chapter;
        console.log("BulletinListPage",chapter);
        if(chapter){
            sessionStorage.setItem("chapter",JSON.stringify(chapter));
        }
        return (
            <div>
                <Switch >

                    <Route exact path="/index" component={IndexPageRouter} />
                    <Route exact path="/bookCity" component={BookCityPageRouter} />
                    <Route  exact path="/bookCity/books/:id" component={BookDetailPageRouter} />
                    <Route exact path="/bookCity/books/:id/chapterList" component={ChapterList} />
                    <Route exact path="/bookCity/books/:id/chapterList/:id" component={ChapterReaderPageRouter} />
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