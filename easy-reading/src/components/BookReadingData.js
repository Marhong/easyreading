import React,{Component} from 'react';
import reqwest from "reqwest";
const bookReadingDataUrl = "http://localhost:5000/easyreading/bookReadingData";
export default class BookReadingData extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
        };
        // 该组件创建的时候发送请求到服务器，判断是否更新book_reading_data的数据
        reqwest({
            url:`${bookReadingDataUrl}/update`,
            type:'json',
            method:'post',
            err:(err)=>console.log(err),
            success:(res)=>{
                if(res){

                }
            }
        });
    }
    componentDidMount(){
        // 从服务器获取book_reading_data数据
       /* reqwest({
            url:`${bookReadingDataUrl}/all`,
            type:'json',
            method:'get',
            err:(err)=>console.log(err),
            success:(res)=>{
                if(res){
                    console.log(JSON.stringify(res));
                    this.setState({...this.state,data:res});
                }
            }
        });*/
    }
    render(){
        return(
            <div>

            </div>
        );
    }
}