import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Link ,Switch} from "react-router-dom";
import BookCity from "./BookCity";
import BookList from "./BookList";
import MainContent from "./MainContent";
import BulletinList from "./BulletinList";
import BulletinListPageRouter from "./BulletinListPage";
import BookListPageRouter from "./BookListPage";
import BookCityPageRouter from "./BookCityPage";
import BookDetailPageRouter from "./BookDetailPage";

class IndexPage extends  Component{

    render() {
        console.log(this.props.match.params.id);
        return (
            <div>
                <Switch >
                    <Route exact path="/" component={MainContent} />
                    <Route  exact path="/index" component={MainContent} />
                    <Route exact path="/bookList" component={BookListPageRouter} />
                    <Route exact path="/bookCity/:type" component={BookCityPageRouter} />
                    <Route exact path="/bookCity" component={BookCityPageRouter} />
                    <Route  exact path="/bookCity/books/:id" component={BookDetailPageRouter} />
                    <Route exact path="/bulletinList" component={BulletinListPageRouter} />
                    <Route exact path="/bulletinList/:id" component={BulletinListPageRouter} />
                </Switch>
            </div>
        );
    }
}

function IndexPageRouter() {
    return (
        <Router >
            <Route component={IndexPage} />
        </Router>
    );
}

export default IndexPageRouter;