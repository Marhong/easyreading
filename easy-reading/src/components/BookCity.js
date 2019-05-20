import React,{Component} from 'react';
import MyBookCard from './MyBookCard';
import {Pagination,Breadcrumb} from 'antd';
import {Link} from 'react-router-dom';
import '../css/BookCity.css';
import NavComponent from "./NavComponent";
import FilterPanel from "./FilterPanel";
import reqwest from "reqwest";
import {conditionTransform,isOk,booktypes_reverse2} from '../static/commonFun';
import IndexHeaderSearch from "./IndexHeaderSearch";
const bookUrl = "http://localhost:5000/easyreading/book";
const searchRecord = "http://localhost:5000/easyreading/search";
export default class BookCity extends Component{
    constructor(props){
        super(props);
        let user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
        if(user == null){
            user = {id:Date.now()};
        }
        let selectType = [{"type":"分类",value:booktypes_reverse2(props.match.params.type)}];
        this.state = {
            data:[], // 获取的所有书籍数据
            result:[], // 根据用户搜索展示的数据
            keywords:"",
            selectType:selectType,
            user:user,
        };

    }
    handleSearch(value){

            let search = conditionTransform({keywords: value.trim(), type: this.state.selectType});
                let books = this.state.data;
                let result = [];
                for (let book of books) {
                    if (isOk(book, search)) {
                        result.push(book);
                    }
                }
                this.setState({...this.state, result: result});
        // 向服务器发送请求，插入一条该用户的搜索记录
        reqwest({
            url:`${searchRecord}/add`,
            type:'json',
            method:'post',
            data:{...search,userId:this.state.user.id},
            err:(err)=>console.log(err),
            success:(res)=>{
                if(res){

                }
            }
        });


    }
    componentDidMount(){
        document.documentElement.style.backgroundColor = "white";
        document.body.style.backgroundColor = "white";
        // 从服务器获取所有书籍
        reqwest({
            url:`${bookUrl}/all`,
            type:'json',
            method:'get',
            error:(err)=>console.log(err),
            success:(res)=>{
                console.log(res);

                this.setState({...this.state,data:res,result:res});
                setTimeout(()=>{
                    this.handleSearch("",this.state.selectType);
                },2)
            }
        });
    }
    handleSelectType(types){
        this.setState({...this.state,selectType:types});
    }

    // 最开始只传递该类型数据的长度，以及第一个page页面展示的数据。
    // 如pagesize为5，总共有22条数据。初始化时只传递25和前5条数据
    // 切换page,根据page值向服务器请求新page页面的数据
    // 需要判断table展示的什么类型的数据(书籍、公告、帖子、评论等)
    onChange(page,pageSize,e){
        console.log(page,pageSize,this.state.currentDataName);
    }
    render(){
        console.log("当前默认类型为: ",this.props.match.params.type)
/*
                let data = [{id:"sm12s2",clickedNumbers:10212205,numbers:2051222,author:"爱潜水的乌贼",imgSrc:"https://bookcover.yuewen.com/qdbimg/349573/1010868264/150",name:"诡秘之主",bookHref:"",desc:"蒸汽与机械的浪潮中，谁能触及非凡？历史和黑暗的迷雾里，又是谁在耳语？我从诡秘中醒来，睁眼看见这个世界：\n" +
                    "　　枪械，大炮，巨舰，飞空艇，差分机；魔药，占卜，诅咒，倒吊人，封印物……光明依旧照耀，神秘从未远离，这是一段“愚者”的传说。",type:"玄幻",isOver:false},
                    {id:"sm1d22",clickedNumbers:52122055,numbers:202251,author:"宅猪",imgSrc:"https://bookcover.yuewen.com/qdbimg/349573/1009704712/150",name:"牧神记",bookHref:"",desc:"大墟的祖训说，天黑，别出门。大墟残老村的老弱病残们从江边捡到了一个婴儿，取名秦牧，含辛茹苦将他养大。",type:"玄幻",isOver:false},
                    {id:"sm12xc2",clickedNumbers:882205,numbers:500152,author:"净无痕",imgSrc:"https://bookcover.yuewen.com/qdbimg/349573/1011058239/150",name:"伏天氏",bookHref:"",desc:"东方神州，有人皇立道统，有圣贤宗门传道，有诸侯雄踞一方王国，诸强林立，神州动乱千万载，值此之时，一代天骄叶青帝及东凰大帝横空出世，东方神州一统！",type:"玄幻",isOver:false},
                    {id:"sm12sddf2",clickedNumbers:231220,numbers:620152,author:"辰东",imgSrc:"https://bookcover.yuewen.com/qdbimg/349573/1004608738/150",name:"圣墟",bookHref:"",desc:"在破败中崛起，在寂灭中复苏。\n" +
                        "　　沧海成尘，雷电枯竭，那一缕幽雾又一次临近大地，世间的枷锁被打开了，一个全新的世界就此揭开神秘的一角……",type:"玄幻",isOver:false},];
        */
        const data = this.state.result;
        return(
            <div>
                <IndexHeaderSearch onSearch={this.handleSearch.bind(this)}/>
            <div className="main">
                <Breadcrumb separator=">" style={{marginBottom:20}}>
                    <Breadcrumb.Item > <Link to={`/`} >首页</Link></Breadcrumb.Item>
                    <Breadcrumb.Item > <Link to={`/bookCity`} style={{color:"#40a9ff"}}>书城</Link></Breadcrumb.Item>
                </Breadcrumb>
                <div className="left">
                    <FilterPanel defaultType={this.props.match.params.type} onSelectType={this.handleSelectType.bind(this)}/>
                </div>
                <div className="right">
                   {/* <NavComponent/>*/}
                    <div className="content">
                        <ul>
                            {
                                data ?
                                    data.map((book,index) => {
                                if(index>=data.length-2){
                                    return <li key={book.id}><MyBookCard book={book}/></li>
                                }else{
                                    return <li key={book.id}><MyBookCard book={book}/><hr/></li>
                                }
                            })
                            :
                            ""}
                        </ul>
                    </div>
                    <div className="pagination">
                        <Pagination showQuickJumper defaultCurrent={1} total={this.state.data.length}  onChange={this.onChange.bind(this)} />
                    </div>
                </div>

            </div>
            </div>
        );
    }
}