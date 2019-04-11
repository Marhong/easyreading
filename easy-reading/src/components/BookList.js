import React,{Component} from 'react';
import MyBookCard from './MyBookCard';
import {Pagination} from 'antd';
import '../css/BookList.css';
export default class BookList extends Component{
    render(){
        const data = [{id:"sm122",author:"天蚕土豆",imgSrc:"https://bookcover.yuewen.com/qdbimg/349573/1013451202/180",name:"11征服荒野",bookHref:"",desc:"我是简介所为和司我是我是简介所为和司我是我是简介所为和司我是我是简介所为和司我是我是简介所为和司我是简介所为和司我是",type:"玄幻",isOver:false},
            {id:"sm122",author:"天蚕土豆",imgSrc:"https://bookcover.yuewen.com/qdbimg/349573/1013451202/180",name:"11征服荒野",bookHref:"",desc:"我是简介所为和司我是我是简介所为和司我是我是简介所为和司我是我是简介所为和司我是我是简介所为和司我是简介所为和司我是",type:"玄幻",isOver:false},
            {id:"sm122",author:"天蚕土豆",imgSrc:"https://bookcover.yuewen.com/qdbimg/349573/1013451202/180",name:"11征服荒野",bookHref:"",desc:"我是简介所为和司我是我是简介所为和司我是我是简介所为和司我是我是简介所为和司我是我是简介所为和司我是简介所为和司我是",type:"玄幻",isOver:false},
            {id:"sm122",author:"天蚕土豆",imgSrc:"https://bookcover.yuewen.com/qdbimg/349573/1013451202/180",name:"11征服荒野",bookHref:"",desc:"我是简介所为和司我是我是简介所为和司我是我是简介所为和司我是我是简介所为和司我是我是简介所为和司我是简介所为和司我是",type:"玄幻",isOver:false},];
        return(
            <div className="main">
                <div className="left">
                </div>
                <div className="right">
                    <div className="select">
                    </div>
                    <div className="content">
                        <ul>
                            {data.map((book,index) => {
                                if(index>=data.length-2){
                                    return <li key={book.id}><MyBookCard book={book}/></li>
                                }else{
                                    return <li key={book.id}><MyBookCard book={book}/><hr/></li>
                                }
                            })}
                        </ul>
                    </div>
                    <div className="pagination">
                        <Pagination showQuickJumper defaultCurrent={2} total={500}  />
                    </div>
                </div>

            </div>

        );
    }
}