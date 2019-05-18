import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import reqwest from "reqwest";
const chapterUrl = "http://localhost:5000/easyreading/chapter";
export default class VolumeComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            bookId:props.bookId,
            volume:props.volume,

        }
    }
    componentDidMount(){
        reqwest({
            url:`${chapterUrl}/${this.state.volume.id}/all`,
            type:'json',
            method:'get',
            error:(err)=>console.log(err),
            success:(res)=>{
                this.setState({...this.state,volume:{...this.state.volume,count:res.length,chapterList:res}});
            }
        });
    }
/*    componentWillReceiveProps(props){
        this.setState({volume:props.volume,bookId:props.bookId});
    }*/
    render(){
        const volume = this.state.volume;
        const bookId = this.state.bookId;
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
                        {
                            volume.chapterList ?
                                volume.chapterList.map((item,index) => {
                                    return <li key={index}> <Link to={`/bookCity/books/${bookId}/chapterList/${item.id}`}>{item.name}</Link></li>
                                })
                                :
                                ""
                        }


                    </ul>

                </div>

            </div>
        );
    }
}