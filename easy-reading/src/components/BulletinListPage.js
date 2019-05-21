import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Link ,Switch} from "react-router-dom";
import BulletinList from "./BulletinList";
import BulletinItem from "./BulletinItem";
import IndexPageRouter from "./IndexPage";
import AppPageRouter from "../App";
import BookCityPageRouter from "./BookCityPage";
import Administrator from "./Administrator";
import PersonalCenter from "./PersonalCenter";

class BulletinListPage extends  Component{

    render() {

        return (
            <div>
                <Switch >
                    <Route exact path="/" component={AppPageRouter} />
                    <Route exact path="/bulletinList" component={BulletinList} />
                    <Route path="/bulletinList/:id/" component={BulletinItem} />
                    <Route exact path="/bookCity" component={BookCityPageRouter} />
                    <Route exact path="/personalCenter" component={PersonalCenter} />
                    <Route exact path="/administrator" component={Administrator} />
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