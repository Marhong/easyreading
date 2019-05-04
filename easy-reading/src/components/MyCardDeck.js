import React,{Component} from 'react';
import {CardDeck,Card} from 'react-bootstrap';
import { Link } from "react-router-dom";


// 自定义的CardDeck
export default class MyCardDeck extends Component{
    static defaultProps = {
        data:{},
    }
    render(){
        const data = this.props.data;
        return(
            <CardDeck>
                {data.map((book) => {
                    return(
                    <Card key={book.id}>
                        <Link to={`/bookCity/books/${book.id}`}><Card.Img variant="top" src={book.imgSrc} /></Link>
                        <Card.Body>
                            <Card.Title> <Link to={`/bookCity/books/${book.id}`}>{book.name}</Link></Card.Title>
                        </Card.Body>
                    </Card>)
                })}
            </CardDeck>
        );
    }
}