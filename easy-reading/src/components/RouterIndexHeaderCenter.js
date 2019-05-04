import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Link ,Switch} from "react-router-dom";
import BookCity from "./BookCity";
import BookList from "./BookList";
import MainContent from "./MainContent";
import BulletinList from "./BulletinList";

class RouterIndexHeaderCenter extends  Component{

    render() {
        console.log(this.props.match.params.id);
        return (
            <div>
                <Switch >
                    <Route exact path="/" component={MainContent} />
                    <Route path="/bookList" component={BookList} />
                    <Route path="/bookCity/:type" component={BookCity} />
                    <Route path="/bookCity" component={BookCity} />
                    <Route path="/bulletinList/:id" component={BulletinList} />
                </Switch>
            </div>
        );
    }
}

function ModalGallery() {
    return (
        <Router >
            <Route component={RouterIndexHeaderCenter} />
        </Router>
    );
}

export default ModalGallery;