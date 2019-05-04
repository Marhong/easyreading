import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Link ,Switch} from "react-router-dom";
import BulletinList from "./BulletinList";
import BulletinItem from "./BulletinItem";
import IndexPageRouter from "./IndexPage";

class BulletinListPage extends  Component{

    render() {
        console.log(this.props.match.params.id);
        return (
            <div>
                <Switch >
                    <Route exact path="/index" component={IndexPageRouter} />
                    <Route exact path="/bulletinList" component={BulletinList} />
                    <Route path="/bulletinList/:id" component={BulletinItem} />

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