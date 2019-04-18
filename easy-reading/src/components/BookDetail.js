import React,{Component} from 'react';
import {Breadcrumb} from 'antd';
import BookDetailCard from "./BookDetailCard";
export default class BookDetail extends Component{
    render(){
       return(
           <div className="bookDetail">
               <div className="header">
                   <Breadcrumb separator=">" >
                       <Breadcrumb.Item href="">首页</Breadcrumb.Item>
                       <Breadcrumb.Item href="">武侠仙侠</Breadcrumb.Item>
                       <Breadcrumb.Item href="">剑来</Breadcrumb.Item>
                   </Breadcrumb>
               </div>
               <div className="content">
                    <BookDetailCard/>
               </div>
               <div className="footer">

               </div>
           </div>
       );
    }
}

