import React,{Component} from 'react';

import BookType from "./BookType";
import { Link } from "react-router-dom";
// 展示书籍类型
export default class IndexHeaderLeft extends Component{
    render(){
        
        // 从服务器获取data的url为 ：localhost:3000/easyreading/bookTypes
        const data = [{id:"1","name":"玄幻","number":"200","iconName":"icon-wuxia",nickname:"xuanhuan"},
            {id:"2","name":"仙侠","number":"200","iconName":"icon-xianxia",nickname:"xianxia"},
            {id:"3","name":"都市","number":"200",iconName:"icon-dushi",nickname:"dushi"},
            {id:"4","name":"军事","number":"200",iconName:"icon-junshi",nickname:"junshi"},
            {id:"5","name":"奇幻","number":"200","iconName":"icon-qihuan",nickname:"qihuan"},
            {id:"6","name":"历史","number":"200",iconName:"icon-lishi",nickname:"lishi"},
            {id:"7","name":"科幻","number":"200",iconName:"icon-kehuan",nickname:"kehuan"},
            {id:"8","name":"灵异","number":"200","iconName":"icon-lingyi",nickname:"lingyi"},
            ];
        const data1 = data.slice(0,data.length/2);
        const data2 = data.slice(data.length/2);
        return(
            <div className="typeList">
                <p>作品分类</p>
                <dl>
                    {data1.map((item,index,array) => {
                        return <Link to={`/bookCity/${item.nickname}`} key={item.id}><BookType item={item} /></Link>
                    })}
                </dl>
                <dl>
                    {data2.map((item,index,array) => {
                        return <Link to={`/bookCity/${item.nickname}`} key={item.id}><BookType item={item} /></Link>
                    })}
                </dl>
            </div>
        );
    }
}