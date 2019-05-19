import React,{Component} from 'react';
import '../css/MyPostComponent.css';
import { Comment, Tooltip, List,Icon,Button ,Modal} from 'antd';
import {crtTimeFtt,timestampFormat} from '../static/commonFun';
import {WrappedPostForm} from './PostForm';
import ReportItem from "./ReportItem";
import reqwest from "reqwest";
import {message} from "antd/lib/index";
import moment from 'moment';
const postUrl = "http://localhost:5000/easyreading/post";
const replyUrl = "http://localhost:5000/easyreading/reply";
export default class MyPostComponent extends Component{

    constructor(props){
        super(props);
        let user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
        let userId = user ? user.id : null;
        this.state = {
            isReplying:false,  // 回复框是否显示
            replys:[], // 某个帖子的所有回复
            posts:[], // 所有帖子数据
            replyMsg:"", // 回复内容
            postId: "", // 回复的帖子ID
            replyToAnother: "", // 要回复的帖子或者回复的id
            currentId: 2015303094, // 当前用户ID
            isSendingMsg : false,
            visible: false,
            userId:userId,
            bookId:props.id,

        };
        this.handleReplyMsgChange = this.handleReplyMsgChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    // 异步获取所有的帖子数据
    componentDidMount(){
        // 从数据库获取所有的帖子
       reqwest({
            url:`${postUrl}/${this.state.bookId}/all`,
            type:'json',
            method:'get',
            error:(err)=>console.log("获取失败"),
            success:(res)=>{
                this.setState({...this.state,posts:res});
            }
        });
/*        let data = [
            {
                postId: 2015242225,
                novelId: 541204,
                postTitle: "图书馆比自习室环境好",
                postContent:"星礼卡大师傅爱上了对方卡萨丁阿萨德雷锋咖啡拉水电费拉水电费拉考试得分撒撒旦法.",
                userId:1,
                likeNum:10,
                hasClickedLike:false,
                postReply:[
                    {
                        replyId: 562323,
                        postId:2015242225,
                        userId:2,
                        replyDate:1555989328,
                        replyContent:"图书馆可以接凉水",
                        replyToAnother:1,
                    },
                    {
                        replyId: 5623231,
                        postId:2015242225,
                        userId:3,
                        replyDate:1555989428,
                        replyContent:"我赞同楼主",
                        replyToAnother:1,
                    },
                    {
                        replyId: 5623232,
                        postId:2015242225,
                        userId:4,
                        replyDate:1555989528,
                        replyContent:"确实，图书馆可以接凉水，这就很舒服了",
                        replyToAnother:2,
                    },
                ],
                publishedDate:1555989228,
            },
            {
                postId: 20152422250,
                novelId: 541204,
                postTitle: "实验室比自习室还要差",
                postContent:"星礼卡大师傅爱上了对方卡萨丁阿萨德雷锋咖啡拉水电费拉水电费拉考试得分撒撒旦法.",
                userId:5,
                likeNum:15,
                hasClickedLike:false,
                postReply:[
                    {
                        replyId: 5623234,
                        postId:20152422250,
                        userId:6,
                        replyDate:1555989598,
                        replyContent:"对啊，实验室练水都没得接",
                        replyToAnother:5,
                    },
                ],
                publishedDate:1555989228,
            },
        ];
        this.setState({posts:this.formatPostData(data)});*/
    }
    componentDidUpdate(){
        if(this.input){
            this.input.focus();
        }
    }
    showModal = () => {
        this.setState({
            ...this.state,
            visible: true,
        });
    }
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            ...this.state,
            visible: false,
        });
    }
    // 切换查看帖子类型
    handleTypeChange(e){
        let event = e.event ? e.event : window.event;
        let target = event.target ? event.target : event.srcElement;
        let lis = target.parentNode.parentNode.children;

        for(let li of lis){
            li.classList.toggle("selected");
        }
    }
    // 显示或者关闭回复框
    handleReplyPost(id,e){
        let isReplying = this.state.isReplying;
        this.setState({...this.state,isReplying:!isReplying,postId:id,replyToAnother:arguments[1]});

    }
    // 给帖子点赞
    clickLike(postId,e){
        let posts = this.state.posts;
        for(let post of posts){
            if(post.postId === postId){
                if(!post.hasClickedLike){
                    console.log(postId);
                    post.hasClickedLike = true;
                    post.likeNum += 1;
                    this.setState({...this.state,posts:posts});
                }
                break;
            }
        }
    }
    // 显示某个帖子的所有回复
    handleView(postId,e){
        let replys = [];
        // 从数据库获取所有的帖子
        reqwest({
            url:`${replyUrl}/${postId}/all`,
            type:'json',
            method:'get',
            error:(err)=>console.log("获取失败"),
            success:(res)=>{
                replys = res;
                if(this.state.replys.length <1 || (this.state.replys.length>0 && postId !== this.state.replys[0].postId ) || this.state.isSendingMsg){

                    this.setState({...this.state,replys:replys})
                }else{
                    this.setState({...this.state,replys:[]})
                }
            }
        });


    }
    handleReplyMsgChange(e){
        let input = e.target.value;
        input = input.length>50?input.slice(0,100) : input;
        this.setState({...this.state,replyMsg:input})
    }
    // 提交回复
    handleSubmit(e){
       // alert(`我回复了${this.state.replyToAnother}:${this.state.replyMsg}`);
        if(this.state.replyMsg.trim() === "" || this.state.replyMsg.trim() === null){
            alert("回复消息不能为空!");
            return;
        }
        let newReply = {
            userId:this.state.userId,
            bookId:this.state.bookId,
            postId:this.state.postId,
            time:Date.now(),
            content:this.state.replyMsg,
            anotherUserId:this.state.replyToAnother,
        };
        // 将评论内容插入数据库中,同时更新评论数据
        reqwest({
            url:`${replyUrl}/add`,
            type:'json',
            method:'post',
            data: newReply,
            error:(err)=>{
                message.error("发布评论失败！");
                console.log(err)},
            success:(res)=>{
                if(res){
                    message.success("发布评论成功！");
                    newReply.id = res.id;
                    this.setState((preState) => {
                        let oldReplys = preState.replys;
                        oldReplys.push(newReply);
                        return { ...preState, visible: false, replys:oldReplys,replyMsg:"",isSendingMsg:true,isReplying:"true"};
                    });

                }
            }
        });
 /*       // 为什么设置isSending值为true没有用啊
        this.setState({ ...this.state, posts:newposts, isSendingMsg:true});

        this.handleView(this.state.postId);
        this.setState({ ...this.state, replyMsg:"", isReplying:true})*/

    }
    // 发布帖子
    handleSubmitPost(values){

        let newPost = {userId:this.state.userId,bookId:this.state.bookId,title:values.title,content:values.content,time:Date.now()};
        // 将帖子内容插入数据库中,同时更新帖子数据
        reqwest({
            url:`${postUrl}/add`,
            type:'json',
            method:'post',
            data: newPost,
            error:(err)=>{
                message.error("发布帖子失败！");
                console.log(err)},
            success:(res)=>{
                if(res){
                    message.success("发布帖子成功！");
                    newPost.id = res.id;
                    this.setState((preState) => {
                        let oldPosts = preState.posts;
                        oldPosts.push(newPost);
                        return { ...preState, visible: false, posts:oldPosts,};
                    });

                }
            }
        });

    }
    // 提交举报信息
    handleReportSubmit(values){
        console.log("举报帖子",values);
    }

    // 格式化数据
    formatPostData(data){

        for(let post of data){
            let viewAll = `查看所有评论`;
            post.actions = [<span onClick={this.handleView.bind(this,post.id)} className="view">{viewAll}</span>,
                <span onClick={this.handleReplyPost.bind(this,post.id,post.userId)} className="reply">回复</span>,
                // 点赞功能先去掉
                <span onClick={this.clickLike.bind(this,post.id)}>
                    <i className="iconfont icon-dianzan11"> {post.likeNum}</i>
                </span>];
            // 将每个帖子的发布日期转换为“刚刚、N分钟前、今天几时几分”的形式
            let date = post.time;
            post.formatPublishedDate = ( <Tooltip title={moment(date).format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment(date).format('YYYY-MM-DD HH:mm:ss')}</span>
            </Tooltip>);
        }
        return data;
    }
    // 格式化评论数据
    formatReplyData(postUserId,data){
        let replys = data;
        if(replys){
            if(replys.length>0){
                for(let reply of replys){
                    reply.actions = [<span onClick={this.handleReplyPost.bind(this,reply.postId,reply.userId)} className="reply">回复</span>];
                    // 将每条回复的发布日期转换为“刚刚、N分钟前、今天几时几分”的形式
                    let date = moment(reply.time).format('YYYY-MM-DD HH:mm:ss');
                    reply.formatReplyDate = ( <Tooltip title={date}>
                        <span className="reply">{date} 回复 {reply.anotherUserId === postUserId ? "楼主" : reply.anotherUserId}</span>
                    </Tooltip>);
                }
            }
        }
    }
    render(){
        const isReplying = this.state.isReplying;
        const postId = this.state.postId;
        console.log(isReplying+" 当前回复的postId: "+postId);
        const replyToAnother = this.state.replyToAnother;
        const posts = this.formatPostData(this.state.posts);

        return(
            <div className="postModule">
                <div className="header">
                    <ul onClick={this.handleTypeChange.bind(this)}>
                        <li className="selected"><a>全部(368)</a></li>
                        <li className="hotposts"><a>热帖</a></li>
                        <li onClick={this.showModal}><a><i className="iconfont icon-fatie"/> 我要发帖</a></li>
                    </ul>
                </div>
                <Modal
                    title="发布帖子"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <WrappedPostForm onCancel={this.handleCancel} isCancel={this.state.visible} onSubmitPost={this.handleSubmitPost.bind(this)}/>
                </Modal>
                <div>
                  <List
                            className="comment-list"
                            itemLayout="horizontal"
                            dataSource={posts}
                            renderItem={item => (
                                <Comment
                                    actions={item.actions}
                                    author={item.userId}
                                    avatar='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                                    content={((item) => {return <span><span className="postTitle"><strong> {item.title} </strong></span><ReportItem item={item} onSubmit={this.handleReportSubmit.bind(this)}/> <br/>{item.content}</span>})(item)}
                                    datetime={item.formatPublishedDate}>
                                    {/* 根据state的replys内容来渲染回复*/}
                                    {this.state.replys
                                        ?
                                        this.state.replys.map((reply,index) => {
                                        if(item.id === reply.postId){
                                            return <Comment key={index}
                                                            actions={reply.actions}
                                                            author={reply.userId}
                                                            avatar='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                                                            content={((item) => {return <span>{item.content} <ReportItem item={item} onSubmit={this.handleReportSubmit.bind(this)}/></span>})(reply)}
                                                            datetime={reply.formatReplyDate}
                                            >
                                            </Comment>
                                        }

                                    }) : ""}
                                    {isReplying&&postId===item.id ?
                                        <div className="replyContainer">
                                        <input className="replyToPost"
                                               value={this.state.replyMsg}
                                               onChange={this.handleReplyMsgChange}
                                               placeholder={`回复${replyToAnother}: `}
                                                ref={(input) => this.input = input}/>
                                        <br/>
                                        <button className="submit" onClick={this.handleSubmit}>提交</button>
                                    </div>
                                        : ""}
                                </Comment>
                            )}/>

                    </div>

            </div>
        );
    }
}