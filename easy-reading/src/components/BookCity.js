import React,{Component} from 'react';
import MyBookCard from './MyBookCard';
import {Pagination} from 'antd';
import '../css/BookCity.css';
import NavComponent from "./NavComponent";
import FilterPanel from "./FilterPanel";
export default class BookCity extends Component{
    constructor(props){
        super(props);
    }

    render(){
        console.log("当前默认类型为: ",this.props.match.params.type)
        let data = [{id:"sm12s2",author:"天蚕土豆",imgSrc:"https://bookcover.yuewen.com/qdbimg/349573/1013451202/180",name:"11征服荒野",bookHref:"",desc:"我是简介所为和司我是我是简介所为和司我是我是简介所为和司我是我是简介所为和司我是我是简介所为和司我是简介所为和司我是",type:"玄幻",isOver:false},
            {id:"sm1d22",author:"天蚕土豆",imgSrc:"https://bookcover.yuewen.com/qdbimg/349573/1013451202/180",name:"11征服荒野",bookHref:"",desc:"我是简介所为和司我是我是简介所为和司我是我是简介所为和司我是我是简介所为和司我是我是简介所为和司我是简介所为和司我是",type:"玄幻",isOver:false},
            {id:"sm12xc2",author:"天蚕土豆",imgSrc:"https://bookcover.yuewen.com/qdbimg/349573/1013451202/180",name:"11征服荒野",bookHref:"",desc:"我是简介所为和司我是我是简介所为和司我是我是简介所为和司我是我是简介所为和司我是我是简介所为和司我是简介所为和司我是",type:"玄幻",isOver:false},
            {id:"sm12sddf2",author:"天蚕土豆",imgSrc:"https://bookcover.yuewen.com/qdbimg/349573/1013451202/180",name:"11征服荒野",bookHref:"",desc:"我是简介所为和司我是我是简介所为和司我是我是简介所为和司我是我是简介所为和司我是我是简介所为和司我是简介所为和司我是",type:"玄幻",isOver:false},];

        return(
            <div className="main">
                <div className="left">
                    <FilterPanel defaultType={this.props.match.params.type}/>
                </div>
                <div className="right">
                    <NavComponent/>
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