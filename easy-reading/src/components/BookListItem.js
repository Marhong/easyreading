import React,{Component} from 'react';
import '../css/BookListItem.css';
import {timestampFormat} from '../static/commonFun';
import BookItemFooter from "./BookItemFooter";
const imgs = [{src:"https://bookcover.yuewen.com/qdbimg/349573/1013470066/180",name:"沙发书单"},{name:"考虑领料",src:"https://bookcover.yuewen.com/qdbimg/349573/1013862069/180"},{name:"我的师傅",src:"https://bookcover.yuewen.com/qdbimg/349573/1010754871/180"},{name:"三国志",src:"https://bookcover.yuewen.com/qdbimg/349573/1014127256/180"}];
export default class BookListItem extends Component{
    render(){
        const imgs = this.props.imgs;
        const bookList = this.props.bookList;
        return(
            <div className="bookListItem">
                <div className="imgArray">
                    <dl>
                        {imgs.map((img,index) => {
                            return <dd key={index}><a><img src={img.src} alt={img.name}/></a></dd>
                        })}
                    </dl>
                </div>
                <div className="bookListInfo">
                    <p className="title"><strong>{bookList.name}</strong></p>
                    <p className="description">{bookList.description.length > 150 ? `${bookList.description.slice(0,150)}...` : bookList.description}
                        </p>
                    <BookItemFooter bookList={bookList}/>
                </div>
            </div>
        );
    }
}