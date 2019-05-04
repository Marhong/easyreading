import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import BookCity from "./BookCity";
import BookList from "./BookList";

class ModalSwitch extends Component {

    render() {
        return (
            <div>
                <Switch >
                    <Route exact path="/" component={Home} />
                    <Route path="/bookList" component={BookList} />
                    <Route path="/bookCity" component={BookCity} />
                </Switch>
            </div>
        );
    }
}

function Home() {
    return (
        <div>
            <Link to="/bookList">书单</Link>
            <Link to="/bookCity">全部</Link>
            <br/>
            我是下面的内筒阿萨德浪费拉水电费卡萨丁法拉水电费
        </div>
    );
}


function ModalGallery() {
    return (
        <Router>
            <Route component={ModalSwitch} />
        </Router>
    );
}

export default ModalGallery;
