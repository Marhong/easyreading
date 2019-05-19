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
const hotPostStandard = 5;
export default class MyPostComponent extends Component{

    constructor(props){
        super(props);
        let user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
        let userId = user ? user.id : null;
        this.state = {
            isReplying:false,  // 回复框是否显示
            replys:[], // 某个帖子的所有回复
            posts:[], // 所有帖子数据
            rawPosts : [], // 帖子原始数据,
            replyMsg:"", // 回复内容
            postId: "", // 回复的帖子ID
            replyToAnother: "", // 要回复的帖子或者回复的id
            replyToAnotherName:"",// 要回复的帖子或回复的用户名
            currentId: 2015303094, // 当前用户ID
            isSendingMsg : false,
            visible: false,
            userId:userId,
            bookId:props.id,
            user:user,

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
                console.log(res);
                let formatedData = this.formatPostData(res);
                this.setState({...this.state,posts:formatedData,rawPosts:formatedData});
            }
        });
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

        let posts = this.state.rawPosts;
        let itemInnerHTML = target.innerHTML;
        if(itemInnerHTML.indexOf("热帖") !== -1){
            let hotPosts = [];
            for(let item of posts){
                if(item.postReply.length > hotPostStandard){
                    hotPosts.push(item);
                }
            }
            this.hot.classList.add("selected");
            this.all.classList.remove('selected');
            this.setState({...this.state,posts:this.formatPostData(hotPosts)});
        }else if(itemInnerHTML.indexOf("全部") !== -1){
            this.hot.classList.remove("selected");
            this.all.classList.add('selected');
            this.setState({...this.state,posts:this.formatPostData(this.state.rawPosts)});
        }else{
            this.hot.classList.remove("selected");
            this.all.classList.add('selected');
            this.setState({...this.state,posts:this.formatPostData(this.state.rawPosts)});
            this.showModal();
        }
    }
    // 显示或者关闭回复框
    handleReplyPost(id,e){
        let isReplying = this.state.isReplying;
        this.setState({...this.state,isReplying:!isReplying,postId:id,replyToAnother:arguments[1],replyToAnotherName:arguments[2]});

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
        for(let post of this.state.posts){
            if(post.id === postId){
                replys = post.postReply;
                break;
            }
        }
        if(this.state.replys.length <1 || (this.state.replys.length>0 && postId !== this.state.replys[0].postId ) ){
            this.setState({...this.state,replys:replys})
        }else{
            this.setState({...this.state,replys:[]})
        }
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
            userName:this.state.user.name,
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
                        let newposts = this.state.rawPosts;
                        for(let post of newposts){
                            if(post.id === newReply.postId){
                                post.postReply.unshift(newReply);
                                break;
                            }
                        }
                        // 为什么设置isSending值为true没有用啊
                        let formatedData = this.formatPostData(newposts);
                        this.setState({ ...this.state, posts:formatedData,rawPosts:formatedData});

                        this.handleView(this.state.postId);
                        this.setState({ ...this.state, replyMsg:"", isReplying:true})


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

        let newPost = {userId:this.state.userId,bookId:this.state.bookId,title:values.title,content:values.content,time:Date.now(),userName:this.state.user.name};
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
                    newPost.postReply = [];
                    this.setState((preState) => {
                        let oldRawPosts = preState.rawPosts;
                        oldRawPosts.unshift(newPost);
                        let formatedData = this.formatPostData(oldRawPosts);
                        return { ...preState, visible: false, posts:formatedData,rawPosts:formatedData};
                    });

                }
            }
        });

}
    // 提交帖子举报信息
    handlePostReportSubmit(values){
        let report = {postId:arguments[0],userId:this.state.user.id,content:arguments[4].content,postTitle:arguments[1],
            userName:this.state.user.name,reportedUserName:arguments[3],reportedUserId:arguments[2],time:Date.now()};
        console.log(report);
        // 将帖子内容插入数据库中,同时更新帖子数据
        reqwest({
            url:`${postUrl}/report`,
            type:'json',
            method:'post',
            data: report,
            error:(err)=>{
                message.error("举报帖子失败！");
                console.log(err)},
            success:(res)=>{
                if(res){
                    message.success("举报帖子成功！");
                    console.log(res.id);

                }
            }
        });
    }
    // 提交评论举报信息
    handleReplyReportSubmit(values){
           let report = {replyContent:arguments[1],content:arguments[5].content,userId:this.state.user.id,userName:this.state.user.name,
           reportedUserId:arguments[2],reportedUserName:arguments[3],replyId:arguments[0],time:Date.now(),postId:arguments[4]};
            // 将帖子内容插入数据库中,同时更新帖子数据
            reqwest({
                url:`${replyUrl}/report`,
                type:'json',
                method:'post',
                data: report,
                error:(err)=>{
                    message.error("举报评论失败！");
                    console.log(err)},
                success:(res)=>{
                    if(res){
                        message.success("举报评论成功！");
                        console.log(res.id);
                    }
                }
            });
        }
    // 格式化数据
    formatPostData(data){

        for(let post of data){
            let viewAll = post.postReply.length > 0 ? `查看所有评论(${post.postReply.length})` : "";
            post.actions = [<span onClick={this.handleView.bind(this,post.id)} className="view">{viewAll}</span>,
                <span onClick={this.handleReplyPost.bind(this,post.id,post.userId,post.userName)} className="reply">回复</span>,
                /*// 点赞功能先去掉
                <span onClick={this.clickLike.bind(this,post.id)}>
                    <i className="iconfont icon-dianzan11"> {post.likeNum}</i>
                </span>*/];
            // 将每个帖子的发布日期转换为“刚刚、N分钟前、今天几时几分”的形式
            let date = post.time;
            post.formatPublishedDate = ( <Tooltip title={moment(date).format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment(date).format('YYYY-MM-DD HH:mm:ss')}</span>
            </Tooltip>);
            let replys = post.postReply;
            if(replys){
                if(replys.length>0){


                    for(let reply of replys){
                        reply.actions = [<span onClick={this.handleReplyPost.bind(this,reply.postId,reply.userId,reply.userName)} className="reply">回复</span>];
                        // 将每条回复的发布日期转换为“刚刚、N分钟前、今天几时几分”的形式
                        let date = moment(reply.time).format('YYYY-MM-DD HH:mm:ss');
                        let name = "";
                        for(let item of replys){
                            if(item.userId === reply.anotherUserId){
                                name = item.userName;
                                break;
                            }
                        }
                        reply.formatReplyDate = ( <Tooltip title={date}>
                            <span className="reply">{date} 回复 {reply.anotherUserId === post.userId ? "楼主" : name}</span>
                        </Tooltip>);
                    }
                }
            }
        }
        return data;
    }

    render(){
        const isReplying = this.state.isReplying;
        const postId = this.state.postId;
        console.log(isReplying+" 当前回复的postId: "+postId);
        const replyToAnotherName = this.state.replyToAnotherName;

        return(
            <div className="postModule">
                <div className="header">
                    <ul >
                        <li className="selected" onClick={this.handleTypeChange.bind(this)} ref={(all) => this.all =all}><a>全部(368)</a></li>
                        <li className="hotposts" onClick={this.handleTypeChange.bind(this)} ref={(hot)=>this.hot=hot}><a>热帖</a></li>
                        <li onClick={this.handleTypeChange.bind(this)}><a><i className="iconfont icon-fatie"/> 我要发帖</a></li>
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
                            dataSource={this.state.posts}
                            renderItem={item => (
                                <Comment
                                    actions={item.actions}
                                    author={item.userName}
                                    avatar='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                                    content={((item) => {return <span><span className="postTitle"><strong> {item.title} </strong></span><ReportItem item={item} onSubmit={this.handlePostReportSubmit.bind(this,item.id,item.title,item.userId,item.userName)}/> <br/>{item.content}</span>})(item)}
                                    datetime={item.formatPublishedDate}>
                                    {/* 根据state的replys内容来渲染回复*/}
                                    {this.state.replys
                                        ?
                                        this.state.replys.map((reply,index) => {
                                        if(item.id === reply.postId){
                                            return <Comment key={index}
                                                            actions={reply.actions}
                                                            author={reply.userName}
                                                            avatar='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                                                            content={((item) => {return <span>{item.content} <ReportItem item={item} onSubmit={this.handleReplyReportSubmit.bind(this,item.id,item.content,item.userId,item.userName,item.postId)}/></span>})(reply)}
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
                                               placeholder={`回复${replyToAnotherName}: `}
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