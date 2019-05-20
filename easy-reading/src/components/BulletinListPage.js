import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Link ,Switch} from "react-router-dom";
import BulletinList from "./BulletinList";
import BulletinItem from "./BulletinItem";
import IndexPageRouter from "./IndexPage";
import AppPageRouter from "../App";
import BookCityPageRouter from "./BookCityPage";

class BulletinListPage extends  Component{

    render() {

        return (
            <div>
                <Switch >
                    <Route exact path="/" component={AppPageRouter} />
                    <Route exact path="/bulletinList" component={BulletinList} />
                    <Route path="/bulletinList/:id/" component={BulletinItem} />
                    <Route exact path="/bookCity" component={BookCityPageRouter} />
                </Switch>
            </div>
        );
    }
}

function BulletinListPageRouter() {
    return (
        <Router >
            <Route component={BulletinListPage} />
        </Router>
    );
}

export default BulletinListPageRouter;