import React,{Component} from 'react';
import { Menu, Icon } from 'antd';
import { Carousel } from 'antd';
import {CardDeck,Card} from 'react-bootstrap';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

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
                        <Card.Img variant="top" src={book.imgSrc} />
                        <Card.Body>
                            <Card.Title>{book.name}</Card.Title>
                        </Card.Body>
                    </Card>)
                })}
            </CardDeck>
        );
    }
}