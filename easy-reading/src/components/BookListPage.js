import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Link ,Switch} from "react-router-dom";
import BookListDetail from "./BookListDetail";
import BookList from "./BookList";
import BookDetailPageRouter from "./BookDetailPage";
import IndexPageRouter from "./IndexPage";
import AppPageRouter from "../App";

class BookListPage extends  Component{

    render() {
        console.log(this.props.match.params.id);
        return (
            <div>
                <Switch >
                    <Route exact path="/bookList" component={BookList} />
                    <Route exact path="/bookList/:id" component={BookListDetail} />
                    <Route  exact path="/bookCity/books/:id" component={BookDetailPageRouter} />
                    <Route  path="/" component={AppPageRouter} />
                </Switch>
            </div>
        );
    }
}

function BookListPageRouter() {
    return (
        <Router >
            <Route component={BookListPage} />
        </Router>
    );
}

export default BookListPageRouter;