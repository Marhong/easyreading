import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Link ,Switch} from "react-router-dom";
import BookCity from "./BookCity";
import BookList from "./BookList";
import MainContent from "./MainContent";
import BulletinList from "./BulletinList";
import BulletinListPageRouter from "./BulletinListPage";
import BookListPageRouter from "./BookListPage";
import BookCityPageRouter from "./BookCityPage";

class IndexPage extends  Component{

    render() {
        console.log(this.props.match.params.id);
        return (
            <div>
                <Switch >
                    <Route exact path="/" component={MainContent} />
                    <Route  path="/index" component={MainContent} />
                    <Route path="/bookList" component={BookListPageRouter} />
                    <Route path="/bookCity/:type" component={BookCityPageRouter} />
                    <Route path="/bookCity" component={BookCityPageRouter} />
                    <Route path="/bulletinList" component={BulletinListPageRouter} />
                    <Route path="/bulletinList/:id" component={BookListPageRouter} />
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