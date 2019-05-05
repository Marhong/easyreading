import React,{Component} from 'react';
import {Link} from 'react-router-dom';
export default class VolumeComponent extends Component{
    static defaultProps = {
        volume : {name:"卷一 大城小事",count:24,wordNumber:524561245,data:
                [{id:45112,name:"第一章 有朋字远方来，尚能饭否",href:""},

                ]}
    }
    render(){
        const book ={id:"86523"};
        let volume = this.props.volume;
        for(let i=0,len=50;i<len;i++){
            volume.data.splice(volume.data.length,0,{id:i,name:`第${i}章 好好学习，天天向上`,href:""})
        }
        return(
            <div className="volume">

                <div className="top">
                    <p>
                        <em className="v-line"/>
                        <span className="name">{volume.name}</span>
                        <span className="count">共{volume.count}章 本卷共{volume.wordNumbers}字</span>
                    </p>
                </div>
                <div className="main">
                    <ul>
                        {volume.data.map((item,index) => {
                            return <li key={index}><Link to={`/bookCity/books/${book.id}/chapterList/${item.id}`}>{item.name}</Link></li>
                        })}

                    </ul>

                </div>

            </div>
        );
    }
}