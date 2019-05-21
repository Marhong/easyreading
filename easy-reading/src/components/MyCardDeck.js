import React,{Component} from 'react';
import {CardDeck,Card} from 'react-bootstrap';
import { Link } from "react-router-dom";


// 自定义的CardDeck
export default class MyCardDeck extends Component{

    render(){
        const data = this.props.data;

        return(

            <CardDeck>
                {data.map((book,index) => {
                    let id = book.id;
                    return(
                        <Card key={index}>
                            { id ? <Link to={`/bookCity/books/${id}`}><Card.Img variant="top" src={book.imgUrl} /></Link> : ""}
                            <Card.Body>
                                 <Card.Title> <Link to={`/bookCity/books/${id}`}>{book.name}</Link></Card.Title>
                            </Card.Body>
                        </Card>)
                })}
            </CardDeck>
        );
    }
}