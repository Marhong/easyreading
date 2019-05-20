import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { Menu ,Divider,Tabs,Table,Modal,Button,Input,Icon,Popconfirm} from 'antd';
import moment from 'moment';
import Highlighter from 'react-highlight-words';
import {WrappedBulletinForm} from './BulletinForm';
import {formatArray,sortBy,deepClone} from '../static/commonFun';
import reqwest from "reqwest";
import {message} from "antd/lib/index";
import IndexHeaderSearch from "./IndexHeaderSearch";
const bookUrl = "http://localhost:5000/easyreading/book";
const postUrl = "http://localhost:5000/easyreading/post";
const replyUrl = "http://localhost:5000/easyreading/reply";
const userUrl = "http://localhost:5000/easyreading/user";
const bulletinUrl = "http://localhost:5000/easyreading/bulletin";
require('../css/PersonalCenter.css');

const TabPane = Tabs.TabPane;

// 菜单项为“书籍管理” > “书籍审核” 时的数据
const uploadedBooksData = [
    {
        key: "uploadedBooksData1", name : '雪中悍刀行', author : '烽火戏诸侯',type:"玄幻", uploader : '王小二', uploadTime : '2019-02-10 14:20:20'
    },
    {
        key: "uploadedBooksData2", name : '桃花', author : '烽火戏诸侯', type:"玄幻",uploader : '王小二', uploadTime : '2019-02-10 14:24:20'
    },
];
// 菜单项为“书籍管理” > “举报信息” 时的数据
const bookReportData = [
    {
        key: "bookReportData1", name : '傲慢与偏见', reportedReason : '侵权',  whistleBlower : '王田田',reportTime : '2019-02-10 14:20:20',
    },
    {
        key: "bookReportData2", name : '战争与和平', reportedReason : '侵权',  whistleBlower : '王田田',reportTime : '2019-02-10 14:22:20',
    },
];
// 菜单项为“书籍管理” > “书籍列表” 时的数据
const bookListData = [
    {
        key: "bookListData1", name : '傲慢与偏见', author  : '王星星',  uploader  : '王田田',uploadTime  : '2019-02-10 14:20:20',
    },
    {
        key: "bookListData2", name : '战争与和平', author  : '王星星',  uploader  : '王田田',uploadTime  : '2019-02-10 14:24:20',
    },
];
// 菜单项为“公告管理” > “公告列表” 时的数据
const bulletinListData = [

];
// 菜单项为“帖子管理” > “举报信息” 时的数据
const postReportData = [
    {
        key: "postReportData1", reportedPost: '关于大量上传侵权书籍情况', reportReason: '由于法律规定，在版权有效期内容不能在未经允许的情况下随意转发他人作品',  whistleBlower : '管理员XX',invalidUser:"万事达",reportTime: '2019-02-10 14:20:20',
    },
    {
        key: "postReportData2", reportedPost: '网站更新的看法', reportReason: '快点更新好',  whistleBlower : '管理员XX',invalidUser:"万事达",reportTime: '2019-02-10 14:20:20',
    },
];
// 菜单项为“帖子管理” > “帖子列表” 时的数据
const postListData = [
    {
        key: "postListData1", title : '关于大量上传侵权书籍情况', content : '由于法律规定，在版权有效期内容不能在未经允许的情况下随意转发他人作品',  publisher: '罪恶的小强',publishTime : '2019-02-10 14:20:20',
    },
    {
        key: "postListData2", title : '关于大量上传侵权书籍情况', content : '由于法律规定，在版权有效期内容不能在未经允许的情况下随意转发他人作品',  publisher: '罪恶的小强',publishTime : '2019-02-10 14:20:20',
    },
];
// 菜单项为“评论管理” > “举报信息” 时的数据
const replyReportData = [
    {
        key: "replyReportData1", reportedReply : '是的，楼主真贱', reportReason :"违法", invalidUser : '贱人流', whistleBlower : '管理员XX',reportTime: '2019-02-10 14:20:20',
    },
    {
        key: "replyReportData2", reportedReply : '楼主是不是傻了', reportReason :"违法", invalidUser : '贱人流',  whistleBlower : '管理员XX',reportTime: '2019-02-10 14:20:20',
    },
];
// 菜单项为“帖子管理” > “评论列表” 时的数据
const replyListData = [
    {
        key: "replyListData1", belongedPost  : '关于大量上传侵权书籍情况', content  : '由于法律规定，在版权有效期内容不能在未经允许的情况下随意转发他人作品',  name : '罪恶的小强',replyTime  : '2019-02-10 14:20:20',
    },
    {
        key: "replyListData2", belongedPost  : '关于大量上传侵权书籍情况', content  : '由于法律规定，在版权有效期内容不能在未经允许的情况下随意转发他人作品',  name : '罪恶的小强',replyTime  : '2019-02-10 14:20:20',
    },
];
// 菜单项为“用户管理” > “用户列表” 时的数据
const userListData = [
    {
        key: "userListData1", name  : '王小二', registerTime  : '2019-02-10 14:20:20',
    },
];
const bookTabs = [/*{name:"书籍审核",dataName:"uploadedBooksData",columnsName:"uploadedBooksColumns",key:"uploadedBooksData"},*/
    {name:"举报信息",dataName:"bookReportData",columnsName:"bookReportColumns",key:"bookReportData"},
    {name:"书籍列表",dataName:"bookListData",columnsName:"bookListColumns",key:"bookListData"}];
const bulletinTabs = [{name:"发布公告",key:"publishBulletin"},
    {name:"公告列表",dataName:"bulletinListData",columnsName:"bulletinListColumns",key:"bulletinListData"},];
const postTabs = [{name:"举报信息",dataName:"postReportData",columnsName:"postReportColumns",key:"postReportData"},
    {name:"帖子列表",dataName:"postListData",columnsName:"postListColumns",key:"postListData"},];
const replyTabs = [{name:"举报信息",dataName:"replyReportData",columnsName:"replyReportColumns",key:"replyReportData"},
    {name:"评论列表",dataName:"replyListData",columnsName:"replyListColumns",key:"replyListData"},];
const userTabs = [{name:"用户列表",dataName:"userListData",columnsName:"userListColumns",key:"userListData"},];

export default class Administrator extends Component{
    constructor(props){
        super(props);
        this.state = {
            tabs:bookTabs,
            currentDataName:"bookReportData",
            uploadedBooksData:uploadedBooksData,
            bookReportData:bookReportData,
            bookListData:bookListData,
            bulletinListData:bulletinListData,
            postReportData:postReportData,
            postListData:postListData,
            replyReportData:replyReportData,
            replyListData:replyListData,
            userListData:userListData,
            modalTitle:"",
            modalContent:"",
            modalItem:{},
            visible:false,
            searchText:"",

        }
    }
    componentDidMount(){
        // 从服务器获取所有book
        reqwest({
            url:`${bookUrl}/all`,
            type:'json',
            method:'get',
            error:(err)=>console.log(err),
            success:(res)=>{

                console.log(res);
                this.setState({...this.state,bookListData:res});
            }
        });
        // 从服务器获取所有书籍举报信息
        reqwest({
            url:`${bookUrl}/report/all`,
            type:'json',
            method:'post',
            error:(err)=>console.log(err),
            success:(res)=>{
                console.log(res);
                this.setState({...this.state,bookReportData:res});
            }
        });
        // 从服务器获取所有bulletin
        reqwest({
            url:`${bulletinUrl}/all`,
            type:'json',
            method:'get',
            error:(err)=>console.log(err),
            success:(res)=>{
                this.setState({...this.state,bulletinListData:res.sort(sortBy('key',false))});
            }
        });
        // 从服务器获取所有评论信息
        reqwest({
            url:`${replyUrl}/all`,
            type:'json',
            method:'get',
            error:(err)=>console.log(err),
            success:(res)=>{
                console.log(res);
                this.setState({...this.state,replyListData:res});
            }
        });
        // 从服务器获取所有评论举报信息
        reqwest({
            url:`${replyUrl}/report/all`,
            type:'json',
            method:'post',
            error:(err)=>console.log(err),
            success:(res)=>{
                this.setState({...this.state,replyReportData:res});
            }
        });
        // 从服务器获取所有帖子举报信息
        reqwest({
            url:`${postUrl}/report/all`,
            type:'json',
            method:'post',
            error:(err)=>console.log(err),
            success:(res)=>{
                console.log(res);

                this.setState({...this.state,postReportData:res});
            }
        });
        // 从服务器获取所有帖子信息
        reqwest({
            url:`${postUrl}/all`,
            type:'json',
            method:'get',
            error:(err)=>console.log(err),
            success:(res)=>{
                console.log(res);

                this.setState({...this.state,postListData:res})
            }
        });
        // 从服务器获取所有用户信息
        reqwest({
            url:`${userUrl}/all`,
            type:'json',
            method:'get',
            error:(err)=>console.log(err),
            success:(res)=>{
                console.log(res);
                this.setState({...this.state,userListData:res});
            }
        });
    }
    // 展示搜索框
    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
                             setSelectedKeys, selectedKeys, confirm, clearFilters,
                         }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => { this.searchInput = node; }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    搜索
                </Button>
                <Button
                    onClick={() => this.handleReset(clearFilters)}
                    size="small"
                    style={{ width: 90 }}
                >
                    重置
                </Button>
            </div>
        ),
        filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => this.getItemByKey(record.key,dataIndex)[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: (text) => (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />
        ),
    })

    // 根据搜索框内关键字进行搜索
    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    }

    // 重置搜索框
    handleReset = (clearFilters) => {
        clearFilters();
        this.setState({ searchText: '' });
    }

    // 切换不同的菜单项
    handleClick = (e) =>{
        switch (e.key){
            case "1":
                this.setState({...this.state,tabs:bookTabs,currentDataName:"bookReportData"});
                break;
            case "2":

                this.setState({...this.state,tabs:bulletinTabs,currentDataName:"bulletinListData"});
                break;
            case "3":
                this.setState({...this.state,tabs:postTabs,currentDataName:"postReportData"});
                break;
            case "4":
                this.setState({...this.state,tabs:replyTabs,currentDataName:"replyReportData"});
                break;
            default:
                this.setState({...this.state,tabs:userTabs,currentDataName:"userListData"});
                break;
        }
    }
    // 在一个菜单项内切换不同Tab
    handleTabChange(key,e){
        console.log(key);
        this.setState({...this.state,currentDataName:key});
    }
    // 查看某条记录的详细信息
    handleViewDetail(record,e){
        let curData = this.state[this.state.currentDataName];
        let selectedItem;
        for(let item of curData){
            if(item.key === record.key){
                selectedItem = item;
                break;
            }
        }
        let itemKeys = Object.keys(selectedItem);
        this.setState({
            ...this.state,
            visible: true,
            modalTitle:selectedItem[itemKeys[1]],
            modalContent:selectedItem[itemKeys[2]],
            modalItem:selectedItem,
        });
    }
    // 拒绝某本书籍的举报
    handleRejectDeleteBook(record,e){
        // 向服务器发送请求删除该条举报信息
        let curData = this.state.bookReportData;
        let selectedItem;
        for(let i=0;i<curData.length;i++) {
            let item = curData[i];
            if (item.key === record.key) {
                selectedItem = item;
                curData.splice(i, 1);
                break;
            }
        }
        // 向服务器发送请求删除该book举报信息
        reqwest({
            url:`${bookUrl}/report/delete`,
            type:'json',
            method:'post',
            data:{id:selectedItem.key},
            error:(err)=>{
                message.error("删除失败!");
                console.log(err)
            },
            success:(res)=>{
                if(res){
                    message.success("删除错误举报记录成功！");
                }
            }
        });
        this.setState({...this.state,bookReportData:curData});
    }
    // 删除某条公告数据
    handleDeleteItem(record,e){
        let curData = this.state[this.state.currentDataName];
        let selectedItem;
        for(let i=0;i<curData.length;i++) {
            let item = curData[i];
            if (item.key === record.key) {
                selectedItem = item;
                curData.splice(i, 1);
                break;
            }
        }
        // 向服务器发送请求删除该bulletin

        reqwest({
            url:`${bulletinUrl}/delete`,
            type:'json',
            method:'post',
            data:{id:selectedItem.key},
            error:(err)=>{
                message.error("删除失败!");
                console.log(err)
            },
            success:(res)=>{
                if(res){
                    message.success("删除公告成功！");
                }
            }
        });
        this.setState({...this.state,tabs:bulletinTabs,currentDataName:"bulletinListData",bulletinListData:curData});
    }
  /*  // 删除某条帖子数据
    handleDeletePostItem(record,e){
        let curData = this.state.postListData;
        let selectedItem;
        for(let i=0;i<curData.length;i++) {
            let item = curData[i];
            if (item.key === record.key) {
                selectedItem = item;
                curData.splice(i, 1);
                break;
            }
        }
        // 向服务器发送请求删除该post
        reqwest({
            url:`${postUrl}/delete`,
            type:'json',
            method:'post',
            data:{id:selectedItem.key},
            error:(err)=>{
                message.error("删除失败!");
                console.log(err)
            },
            success:(res)=>{
                if(res){
                    message.success("删除帖子成功！");
                }
            }
        });
        this.setState({...this.state,postListData:curData});
    }*/
    // 同意某条帖子的举报
    handleApproveDeletePost(record,e){
        // 向服务器发送请求删除该条举报信息
        // 向服务器发送请求删除该条举报信息
        let curReportData = this.state.postReportData;
        let curPostList = this.state.postListData;
        let curReplyList = this.state.replyListData;
        let curReplyReortData = this.state.replyReportData;
        let selectedItem;
        let replyItem;
        // 找到要删除的举报信息
        let cloneReportData = deepClone(curReportData);
        let count=0;
        let postId = record.postId ?  record.postId : record.id;
        for(let i=0,len=curReportData.length;i<len;i++) {
            let item = curReportData[i];
            console.log(item.postId,postId);
            if (item.postId === postId) {
                selectedItem = item;
                cloneReportData.splice(i-count, 1);
                count++;
            }
        }
        // 找到该postId对应的所有reply删除
        let cloneReplyListData = deepClone(curReplyList);
         count=0;
        for(let i=0,len=curReplyList.length;i<len;i++) {
            let item = curReplyList[i];
            if (item.postId === postId) {
                cloneReplyListData.splice(i-count, 1);
                count++;
            }
        }
        // 找到该postId对应的所有replyReport删除
        let cloneReplyReportData = deepClone(curReplyReortData);
        count=0;
        for(let i=0,len=curReplyReortData.length;i<len;i++) {
            let item = curReplyReortData[i];
            if (item.postId === postId) {
                cloneReplyReportData.splice(i-count, 1);
                count++;
            }
        }
        // 找到举报信息对应的帖子
        for(let i=0;i<curPostList.length;i++) {
            let item = curPostList[i];
            if (item.id === postId) {
                replyItem = item;
                curPostList.splice(i, 1);
                break;
            }
        }
        // 向服务器发送请求删除被举报的post
        reqwest({
            url:`${postUrl}/delete`,
            type:'json',
            method:'post',
            data:{id:replyItem.id},
            error:(err)=>{
                message.error("删除失败!");
                console.log(err)
            },
            success:(res)=>{
                if(res){
                    message.success("成功删除该不合法帖子!");
                }
            }
        });
        this.setState({...this.state,postReportData:cloneReportData,postListData:curPostList,replyListData:cloneReplyListData,replyReportData:cloneReplyReportData});
    }
    // 拒绝某条帖子的举报
    handleRejectDeletePost(record,e){
        // 向服务器发送请求删除该条举报信息
        let curData = this.state.postReportData;
        let selectedItem;
        for(let i=0;i<curData.length;i++) {
            let item = curData[i];
            if (item.key === record.key) {
                selectedItem = item;
                curData.splice(i, 1);
                break;
            }
        }
        // 向服务器发送请求删除该reply举报信息
        reqwest({
            url:`${postUrl}/report/delete`,
            type:'json',
            method:'post',
            data:{id:selectedItem.key},
            error:(err)=>{
                message.error("删除失败!");
                console.log(err)
            },
            success:(res)=>{
                if(res){
                    message.success("删除错误举报记录成功！");
                }
            }
        });
        this.setState({...this.state,postReportData:curData});
    }

    // 同意某条评论的举报
    handleApproveDeleteReply(record,e){
        // 向服务器发送请求删除该条举报信息
        // 向服务器发送请求删除该条举报信息
        let curReportData = this.state.replyReportData;
        let curReplyList = this.state.replyListData;
        let selectedItem;
        let replyItem;
        // 找到要删除的举报信息
        let cloneReportData = deepClone(curReportData);
        let count=0;
        let replyId = record.replyId ?  record.replyId : record.id;
        for(let i=0,len=curReportData.length;i<len;i++) {
            let item = curReportData[i];
            if (item.replyId === replyId) {
                selectedItem = item;
                cloneReportData.splice(i-count, 1);
                count++;
            }
        }
        // 找到举报信息对应的评论
        for(let i=0;i<curReplyList.length;i++) {
            let item = curReplyList[i];
            if (item.id === replyId) {
                replyItem = item;
                curReplyList.splice(i, 1);
                break;
            }
        }
        // 向服务器发送请求删除该reply的所有举报信息
        reqwest({
            url:`${replyUrl}/report/delete/all`,
            type:'json',
            method:'post',
            data:{id:selectedItem.replyId},
            error:(err)=>{
                message.error("删除失败!");
                console.log(err)
            },
            success:(res)=>{
                if(res){
                }
            }
        });
        // 向服务器发送请求删除被举报的reply
        reqwest({
            url:`${replyUrl}/delete`,
            type:'json',
            method:'post',
            data:{id:replyItem.id},
            error:(err)=>{
                message.error("删除失败!");
                console.log(err)
            },
            success:(res)=>{
                if(res){
                    message.success("成功删除该不合法评论!");
                }
            }
        });
        this.setState({...this.state,replyReportData:cloneReportData,replyListData:curReplyList});

    }
    // 拒绝某条评论的举报
    handleRejectDeleteReply(record,e){
        // 向服务器发送请求删除该条举报信息
        let curData = this.state.replyReportData;
        let selectedItem;
        for(let i=0;i<curData.length;i++) {
            let item = curData[i];
            if (item.key === record.key) {
                selectedItem = item;
                curData.splice(i, 1);
                break;
            }
        }
        // 向服务器发送请求删除该reply举报信息
        reqwest({
            url:`${replyUrl}/report/delete`,
            type:'json',
            method:'post',
            data:{id:selectedItem.key},
            error:(err)=>{
                message.error("删除失败!");
                console.log(err)
            },
            success:(res)=>{
                if(res){
                    message.success("删除错误举报记录成功！");
                }
            }
        });
        this.setState({...this.state,replyReportData:curData});
    }
    // 根据某条记录的key查找整条记录
    getItemByKey(key,dataIndex){
        let curData = this.state[this.state.currentDataName];
        let selectedItem;
        for(let item of curData){
            if(item.key === key){
                selectedItem = item;
                break;
            }
        }
        return selectedItem
    }
    // 发布一条公告
    handleSubmitBulletin(values){
        console.log(values.title,values.content);
    }
    // 隐藏Modal
    hideModal = () => {
        this.setState({
            visible: false,
        });
    }
    // 最开始只传递该类型数据的长度，以及第一个page页面展示的数据。
    // 如pagesize为5，总共有22条数据。初始化时只传递25和前5条数据
    // 切换page,根据page值向服务器请求新page页面的数据
    // 需要判断table展示的什么类型的数据(书籍、公告、帖子、评论等)
    onChange(page,pageSize,e){
        console.log(page,pageSize,this.state.currentDataName);
    }
    render(){
        const columnsCollection ={
            uploadedBooksColumns:[
                { title: '书籍名', dataIndex: 'name', key: 'name' },
                { title: '作者', dataIndex: 'author', key: 'author' },
                { title: '类型', dataIndex: 'type', key: 'type' },
                { title: '上传者', dataIndex: 'uploader', key: 'uploader' },
                { title: '上传时间', dataIndex: 'uploadTime', key: 'uploadTime' },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    key: 'operation',
                    render: () => (
                        <span className="table-operation">
                    <a href="javascript:;">同意</a>
                    <Divider type="vertical" />
                    <a href="javascript:;">拒绝</a>
                    <Divider type="vertical" />
                    <a href="javascript:;">查看上传文件</a>
                </span>
                    ),
                },],
            bookReportColumns:[
                { title: '被举报书籍', dataIndex: 'name', key: 'name' },
                { title: '举报原因', dataIndex: 'reportedReason', key: 'reportReason' },
                { title: '举报者', dataIndex: 'whistleBlower', key: 'whistleBlower' },
                { title: '举报时间', dataIndex: 'reportTime', key: 'reportTime' },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    key: 'operation',
                    render: (text,record) => (
                        <span className="table-operation">
                    <a href="javascript:;">同意</a>
                    <Divider type="vertical" />
                    <a href="javascript:;" onClick={this.handleRejectDeleteBook.bind(this,record)}>拒绝</a>
                    <Divider type="vertical" />
                    <a href="javascript:;" onClick={this.handleViewDetail.bind(this,record)}>详细</a>
                </span>
                    ),
                },],
            bookListColumns:[
                { title: '书籍名', dataIndex: 'name', key: 'name' ,...this.getColumnSearchProps('name')},
                { title: '作者', dataIndex: 'author', key: 'author' ,...this.getColumnSearchProps('author')},
                { title: '上传者', dataIndex: 'uploader', key: 'uploader',...this.getColumnSearchProps('uploader') },
                { title: '上传时间', dataIndex: 'uploadTime', key: 'uploadTime' },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    key: 'operation',
                    render: () => (
                        <span className="table-operation">
                  {/*  <a href="javascript:;">查看书籍</a>
                    <Divider type="vertical" /> 不知道怎么连接到书籍页面，先把查看书籍去掉*/}
                    <a href="javascript:;">删除</a>
                </span>
                    ),
                },],
            bulletinListColumns:[ { title: '标题', dataIndex: 'title', key: 'title' ,...this.getColumnSearchProps('title')},
                { title: '内容', dataIndex: 'content', key: 'content',...this.getColumnSearchProps('content') },
                { title: '发布者', dataIndex: 'publisher', key: 'publisher',...this.getColumnSearchProps('publisher') },
                { title: '发布时间', dataIndex: 'publishTime', key: 'publishTime' },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    key: 'operation',
                    render: (text,record) => (
                        <span className="table-operation">
                    <a href="javascript:;" onClick={this.handleViewDetail.bind(this,record)}>详细</a>
                    <Divider type="vertical" />
                              <Popconfirm
                                  title="确定要删除该条数据吗?"
                                  onConfirm={this.handleDeleteItem.bind(this,record)}
                                  okText="Yes"
                                  cancelText="No"
                              >
                                <a href="javascript:;" >删除</a>
                                </Popconfirm>

                </span>
                    ),
                },],
            postReportColumns:[ { title: '被举报贴', dataIndex: 'reportedPost', key: 'reportedPost' },
                { title: '举报原因', dataIndex: 'reportReason', key: 'reportReason' },
                { title: '举报者', dataIndex: 'whistleBlower', key: 'whistleBlower' },
                { title: '被举报者', dataIndex: 'invalidUser', key: 'invalidUser' },
                { title: '举报时间', dataIndex: 'reportTime', key: 'reportTime' },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    key: 'operation',
                    render: (text,record) => (
                        <span className="table-operation">
                    <Popconfirm
                        title="确定要删除该条数据吗?"
                        onConfirm={this.handleApproveDeletePost.bind(this,record)}
                        okText="Yes"
                        cancelText="No"
                    >  <a href="javascript:;" >同意</a>
                                </Popconfirm>
                    <Divider type="vertical" />
                      <a href="javascript:;" onClick={this.handleRejectDeletePost.bind(this,record)}>拒绝</a>
                     <Divider type="vertical" />
                    <a href="javascript:;" onClick={this.handleViewDetail.bind(this,record)}>详细</a>
                </span>
                    ),
                },],
            postListColumns:[ { title: '标题', dataIndex: 'title', key: 'title' ,...this.getColumnSearchProps('title')},
                { title: '内容', dataIndex: 'content', key: 'content' ,...this.getColumnSearchProps('content')},
                { title: '发布者', dataIndex: 'publisher', key: 'publisher',...this.getColumnSearchProps('publisher') },
                { title: '发布时间', dataIndex: 'publishTime', key: 'publishTime' },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    key: 'operation',
                    render: (text,record) => (
                        <span className="table-operation">
                    <a href="javascript:;" onClick={this.handleViewDetail.bind(this,record)}>详细</a>
                    <Divider type="vertical" />
                            <Popconfirm
                                title="确定要删除该条数据吗?"
                                onConfirm={this.handleApproveDeletePost.bind(this,record)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <a href="javascript:;" >删除</a>
                                </Popconfirm>
                </span>
                    ),
                },],
            replyReportColumns:[ { title: '被举报评论', dataIndex: 'reportedReply', key: 'reportedReply' },
                { title: '被举报者', dataIndex: 'invalidUser', key: 'invalidUser' },
                { title: '举报原因', dataIndex: 'reportReason', key: 'reportReason' },
                { title: '举报者', dataIndex: 'whistleBlower', key: 'whistleBlower' },
                { title: '举报时间', dataIndex: 'reportTime', key: 'reportTime' },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    key: 'operation',
                    render: (text,record) => (
                        <span className="table-operation">
                            <Popconfirm
                                title="确定要删除该条数据吗?"
                                onConfirm={this.handleApproveDeleteReply.bind(this,record)}
                                okText="Yes"
                                cancelText="No"
                            >  <a href="javascript:;" >同意</a>
                                </Popconfirm>

                    <Divider type="vertical" />
                    <a href="javascript:;" onClick={this.handleRejectDeleteReply.bind(this,record)}>拒绝</a>
                    <Divider type="vertical" />
                    <a href="javascript:;" onClick={this.handleViewDetail.bind(this,record)}>详细</a>
                </span>
                    ),
                },],
            replyListColumns:[ { title: '所在帖子', dataIndex: 'belongedPost', key: 'belongedPost',...this.getColumnSearchProps('belongedPost') },
                { title: '回复内容', dataIndex: 'content', key: 'content' ,...this.getColumnSearchProps('content')},
                { title: '发布者', dataIndex: 'name', key: 'name',...this.getColumnSearchProps('name') },
                { title: '发布时间', dataIndex: 'replyTime', key: 'replyTime' },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    key: 'operation',
                    render: (text,record) => (
                        <span className="table-operation">
                    <a href="javascript:;" onClick={this.handleViewDetail.bind(this,record)}>详细</a>
                    <Divider type="vertical" />
                            <Popconfirm
                                title="确定要删除该条数据吗?"
                                onConfirm={this.handleApproveDeleteReply.bind(this,record)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <a href="javascript:;" >删除</a>
                                </Popconfirm>
                </span>
                    ),
                },],
            userListColumns:[
                { title: '用户名', dataIndex: 'name', key: 'name',...this.getColumnSearchProps('name')},
                { title: '注册时间', dataIndex: 'registerTime', key: 'registerTime' },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    key: 'operation',
                    render: (text,record) => (
                        <span className="table-operation">
                            <a href="javascript:;" onClick={this.handleViewDetail.bind(this,record)}>详细</a>
                    <Divider type="vertical" />
                    <a href="javascript:;">删除</a>
                </span>
                    ),
                },],
        }
        return(
            <div>
                <IndexHeaderSearch/>
            <div className="wrap">
                <div className="content">
                    <div className="menu">
                        <Menu
                            onClick={this.handleClick}
                            defaultSelectedKeys={['1']}
                            mode="inline"
                        >
                            <Menu.Item key="1"><i className="iconfont icon-shujia"/> 书籍管理</Menu.Item>
                            <Menu.Item key="2"><i className="iconfont icon-icon87"/> 公告管理</Menu.Item>
                            <Menu.Item key="3"><i className="iconfont icon-tiezi"/> 帖子管理</Menu.Item>
                            <Menu.Item key="4"><i className="iconfont icon-pinglun"/> 评论管理</Menu.Item>
                            <Menu.Item key="5"><i className="iconfont icon-yonghudianji"/> 人员管理</Menu.Item>
                        </Menu>
                    </div>
                    <div className="main">
                        <div className="card-container" >
                            <Tabs type="card" onChange={this.handleTabChange.bind(this)}>
                                {this.state.tabs.map((tab,index) => {
                                    return <TabPane tab={tab.name} key={tab.key || index+1}>
                                        {tab.key === "publishBulletin" ?
                                            <WrappedBulletinForm onSubmitBulletin={this.handleSubmitBulletin.bind(this)}/>
                                        :
                                            <Table columns={columnsCollection[tab.columnsName]}
                                            dataSource={formatArray(this.state[tab.dataName])}
                                            pagination={{total:this.state[tab.dataName].length,pageSize:5,defaultCurrent:1,showQuickJumper:true,onChange:this.onChange.bind(this) }}
                                            />
                                        }

                                    </TabPane>
                                })}
                            </Tabs>

                            <Modal
                                title="详细信息"
                                visible={this.state.visible}
                                onCancel={this.hideModal}
                                footer={[
                                    // 定义右下角 按钮的地方 可根据需要使用 一个或者 2个按钮
                                    <Button type="primary" key="back" onClick={this.hideModal}>确认</Button>,]
                                }
                            >
                                {
                                    Object.keys(this.state.modalItem).map((key)=>{

                                        return <p key={key}><strong>{key}：</strong>{this.state.modalItem[key]}</p>
                                    })

                                }

                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}