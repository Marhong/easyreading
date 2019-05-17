import React,{Component} from 'react';
import {Link} from 'react-router-dom';
export default class VolumeComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            bookId:"",
            volume:{},

        }
    }
    componentWillReceiveProps(props){
        this.setState({volume:props.volume,bookId:props.bookId});
    }
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