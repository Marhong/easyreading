import React,{Component} from 'react';
import {Link} from 'react-router-dom';
export default class VolumeComponent extends Component{
    render(){
        const bookId =this.props.bookId;
        let volume = this.props.volume;
        for(let i=0,len=50;i<len;i++){
            volume.chapterList.splice(volume.chapterList.length,0,{id:i,name:`第${i}章 好好学习，天天向上`,href:""})
        }
        return(
            <div className="volume">

                <div className="top">
                    <p>
                        <em className="v-line"/>
                        <span className="name">{volume.name}</span>
                        <span className="count">共{volume.count}章 本卷共{volume.numbers}字</span>
                    </p>
                </div>
                <div className="main">
                    <ul>
                        {volume.chapterList.map((item,index) => {

                            return <li key={index}> <Link to={{ pathname: `/bookCity/books/${bookId}/chapterList/${item.id}`, chapter:item}}>{item.name}</Link></li>
                        })}

                    </ul>

                </div>

            </div>
        );
    }
}