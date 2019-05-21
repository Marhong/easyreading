import React,{Component} from 'react';
import LeftSelectedCard from "./LeftSelectedCard";
import MyNormalCard from "./MyNormalCard";
import reqwest from "reqwest";
const finishedRecommendUrl = "http://localhost:5000/easyreading/finished_recommend";
const hotNewRecommendUrl = "http://localhost:5000/easyreading/hot_new_recommend";
const num = 10; // 完本精选推荐书籍数目
export default class FinishedModule extends Component{
    static defaultProps = {
        moduleType : "",
    };
    constructor(props){
        super(props);
        this.state = {
            hrStyle :{marginTop:110,marginBottom:10,marginLeft:50,},
            hrStyle2 : {marginTop:125,marginBottom:10,marginLeft:50},
            data:[],

        }
    }
    componentDidMount(){
        let url;
        let type = this.props.moduleType;
        if(type === "完本精选"){
             url = finishedRecommendUrl;
        }else if(type === "火热新书"){
             url =hotNewRecommendUrl;
        }
        // 从服务器获取所有书籍
        reqwest({
            url:`${url}/${num}`,
            type:'json',
            method:'get',
            error:(err)=>console.log(err),
            success:(res)=>{
                this.setState({...this.state,data:res});
            }
        });
    }
    render(){
        const data = this.state.data;
        const leftData = data.slice(0,4);
        const rightData = data.slice(4,10);

      return(
            <div className="finishedModule">
                {leftData ?
                <div className="leftSelectedCards">
                    <LeftSelectedCard data={leftData} moduleType={this.props.moduleType}/>
                </div>
                    : ""
                }
               <div className="rightNormalCards">
                    {rightData ?
                    <ul>
                        {rightData.slice(0,2).map((book) => {
                            return <li key={book.id}><MyNormalCard  book={book} /></li>
                        })}
                    </ul>
                        : ""
                    }
                    <hr style={this.state.hrStyle}/>
                    {rightData ?
                    <ul>
                        {rightData.slice(2,4).map((book) => {
                            return <li key={book.id}><MyNormalCard  book={book} /></li>
                        })}
                    </ul>
                        : ""
                    }
                    <hr style={this.state.hrStyle2} />
                    {rightData ?
                    <ul>
                        {rightData.slice(4,6).map((book) => {
                            return <li key={book.id}><MyNormalCard  book={book} /></li>
                        })}
                    </ul>
                    : ""
                    }
                </div>
            </div>
        );
    }
}