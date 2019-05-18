import React,{Component} from 'react';
import { Link } from "react-router-dom";
import '../css/MyBookCard.css';

// 自定义的Card，用于展示“静态”书籍信息
export default class MyBookCard extends Component{
/*    static defaultProps = {
        book: {id:"sm122",author:"天蚕土豆",imgSrc:"https://bookcover.yuewen.com/qdbimg/349573/1013451202/180",name:"11征服荒野",bookHref:"",desc:"我是简介所为和司我是我是简介所为和司我是我是简介所为和司我是我是简介所为和司我是我是简介所为和司我是简介所为和司我是",type:"玄幻",isOver:false},
    }*/
    transformType(id){
        switch(id){
            case 1:
                return "玄幻";
            case 2:
                return "奇幻";
            case 3:
                return "仙侠";
            case 4:
                return "历史";
            case 5:
                return "都市";
            case 6:
                return "军事";
            case 7:
                return "灵异";
            default:
                return "热血";
        }
    }
    render(){
        let pbook =this.props.book;
        const book = {...pbook,type:this.transformType(pbook.type)};
        return(
            <div className="myBookCard" >
                    <div className="bookImg">
                        <Link to={`/bookCity/books/${book.id}`}> <img src={book.imgUrl} alt={book.name} /></Link>
                    </div>
                    <div className="bookInfo">
                        <p className="bookName"><Link to={`/bookCity/books/${book.id}`} >{book.name}</Link></p>
                        <p className="author"><i className="iconfont icon-yonghudianji" />{book.author} |  {book.type} | {book.isFinished ? "完结" : "连载中"}</p>
                        <p className="bookDesc">{book.description ? book.description : ""}</p>
                        <p className="statistics"><span className="fans">{book.clickNumbers}人气</span><span className="secondTag">{Math.ceil(book.numbers/10000)}万字</span></p>
                    </div>
            </div>
        );
    }
}