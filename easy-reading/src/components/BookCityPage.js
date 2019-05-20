import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Link ,Switch} from "react-router-dom";
import BookDetailPageRouter from "./BookDetailPage";
import BookCity from "./BookCity";
import IndexPageRouter from "./IndexPage";
import AppPageRouter from "../App";

class BookCityPage extends  Component{

    render() {
        console.log(this.props.match.params.id);
        return (
            <div>
                <Switch >

                    <Route exact path="/bookCity" component={BookCity} />
                    <Route exact path="/bookCity/:type" component={BookCity} />
                    <Route  exact path="/bookCity/books/:id" component={BookDetailPageRouter} />
                    <Route  path="/" component={AppPageRouter} />
                </Switch>
            </div>
        );
    }
}

function BookCityPageRouter() {
    return (
        <Router >
            <Route component={BookCityPage} />
        </Router>
    );
}

export default BookCityPageRouter;