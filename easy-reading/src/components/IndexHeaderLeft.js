import React,{Component} from 'react';
import '../static/iconfont.css';
import BookType from "./BookType";

export default class IndexHeaderLeft extends Component{
    render(){
        const data = [{id:"111","name":"玄幻","number":"200","iconName":"icon-wuxia"},
            /*{id:"111","name":"玄幻","number":"200","iconName":"icon-xianxia"},
            {id:"111","name":"玄幻","number":"200",iconName:"icon-dushi"},
            {id:"111","name":"玄幻","number":"200",iconName:"icon-junshi"}*/]
        return(
            <div>
                <dl>
                    <dt>作品分类</dt>
                   {/* {data.map((item,index,array) => {
                        let dl = null;
                        if(array.length%2 !== 0)return;
                        if(index<array.length-1){

                            dl = <dl key={index}><dd><span><i className={`iconfont ${item.iconName}`}/> {item.name}</span>
                                <span><i className={`iconfont ${array[index+1].iconName}`}/>{array[index+1].name}</span></dd></dl>;
                        }
                        return dl;
                    })}*/}
                    {data.map((item,index,array) => {
                        return <BookType item={item} key={index}/>
                    })}


                </dl>
            </div>
        );
    }
}