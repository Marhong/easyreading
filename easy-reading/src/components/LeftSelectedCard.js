import React,{Component} from 'react';
import MySelectedCard from "./MySelectedCard";
import { Carousel } from 'antd';


// 展示“完本精选模块”书籍的组件
export default class LeftSelectedCard extends Component{
    static defaultProps = {
        data : [],
        moduleType:'',
    }
    render(){
        const data = this.props.data;

        return(
           <div >
               <div><h5> {this.props.moduleType}</h5></div>
               <hr style={{width:(this.props.moduleType ==='热门作品') ? 250 : 1200}} />
                <Carousel autoplay dots={false} >
                    {data.map((book) => {
                    return <MySelectedCard key={book.id} book={book}/>
                    })}
                </Carousel>
            </div>
        )
    }
}