import React,{Component} from 'react';

import BookType from "./BookType";

// 展示书籍类型
export default class IndexHeaderLeft extends Component{
    render(){
        const data = [{id:"111","name":"玄幻","number":"200","iconName":"icon-wuxia"},
            {id:"111","name":"玄幻","number":"200","iconName":"icon-xianxia"},
            {id:"111","name":"玄幻","number":"200",iconName:"icon-dushi"},
            {id:"111","name":"玄幻","number":"200",iconName:"icon-junshi"},
            {id:"111","name":"玄幻","number":"200","iconName":"icon-xianxia"},
            {id:"111","name":"玄幻","number":"200",iconName:"icon-dushi"},
            {id:"111","name":"玄幻","number":"200",iconName:"icon-junshi"},
            {id:"111","name":"玄幻","number":"200","iconName":"icon-xianxia"},
            ];
        const data1 = data.slice(0,data.length/2);
        const data2 = data.slice(data.length/2);
        return(
            <div>
                <p>作品分类</p>
                <dl>
                    {data1.map((item,index,array) => {
                        return <BookType item={item} key={index}/>
                    })}
                </dl>
                <dl>
                    {data2.map((item,index,array) => {
                        return <BookType item={item} key={index}/>
                    })}
                </dl>
            </div>
        );
    }
}