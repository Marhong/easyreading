import React,{Component} from 'react';
import {Divider} from 'antd';
import { Link } from "react-router-dom";
import '../css/MyBookCard.css';
import {booktypes,distribute,dynasty,keywords} from '../static/commonFun';

// 自定义的Card，用于展示“静态”书籍信息
export default class MyBookCard extends Component{
/*    static defaultProps = {
        book: {id:"sm122",author:"天蚕土豆",imgSrc:"https://bookcover.yuewen.com/qdbimg/349573/1013451202/180",name:"11征服荒野",bookHref:"",desc:"我是简介所为和司我是我是简介所为和司我是我是简介所为和司我是我是简介所为和司我是我是简介所为和司我是简介所为和司我是",type:"玄幻",isOver:false},
    }*/
    render(){
        let pbook =this.props.book;
        const book = {...pbook,type:booktypes[pbook.type],distribute:distribute[pbook.distribute],dynasty:dynasty[pbook.dynasty]};
        if(book.keywords.split(",").length>0){
            let showKeyWords=[];
            for(let item of book.keywords.split(",")){
                showKeyWords.push(keywords[item]);
            }
            book.keywords = showKeyWords;
        }

        return(
            <div className="myBookCard" >
                    <div className="bookImg">
                        <Link to={`/bookCity/books/${book.id}`}> <img src={book.imgUrl} alt={book.name} /></Link>
                    </div>
                    <div className="bookInfo">
                        <p className="bookName"><Link to={`/bookCity/books/${book.id}`} >{book.name}</Link></p>
                        <div className="author"><i className="iconfont icon-yonghudianji" />{book.author}
                        <Divider type="vertical"/>  {book.type}
                        <Divider type="vertical"/> {book.isFinished ? "完结" : "连载中"}
                        <Divider type="vertical"/> {book.distribute ? book.distribute : ""}
                        <Divider type="vertical"/> {book.dynasty ? book.dynasty : ""}
                            {book.keywords.length>0 ?
                                book.keywords.map((item,index)=>{
                                    return  <span key={index}><Divider type="vertical"/> {item}</span>;
                                })

                            :""}</div>
                        <p className="bookDesc">{book.description ? book.description : ""}</p>
                        <p className="statistics"><span className="fans">{book.clickNumbers}人气</span><span className="secondTag">{Math.ceil(book.numbers/10000)}万字</span></p>
                    </div>
            </div>
        );
    }
}