import React,{Component} from 'react';
import {Input,Badge,Icon, Modal,Divider} from 'antd';
import {WrappedNormalLoginForm} from './LoginForm';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import IndexPageRouter from "./IndexPage";
import PersonalCenter from "./PersonalCenter";
import {WrappedUploadBookForm} from "./UploadBookForm";
import Administrator from "./Administrator";
const Search = Input.Search;
// 展示首页头部搜索模块
export default class IndexHeaderSearch extends Component{
    static defaultProps={
        user:{username:"书友201904111630",isAdministrator:true,},
    };
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            uploadVisible:false,
            confirmLoading: false,
            isLogin:true,
        }
    }

    // 关闭登录/注册Modal
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({isLogin:true});
        setTimeout(() => {
            this.setState({
                visible: false,
            });
        }, 1);
    };

    // 关闭上传文件Modal
    handleUploadFileCancel = () => {
        this.setState({...this.state,uploadVisible: false,});
    };
    // 根据子组件的isLogin状态来切换父组件相应的isLogin状态
    handleToggleModal(isLogin){
        this.setState({isLogin:isLogin});
    }
    // 展示登录/注册Modal
    showModal = () => {
        this.setState({
            ...this.state,
            visible: true,
        });
    };
    // 展示上传文件Modal
    showUploadModal = () => {
        this.setState({
            ...this.state,
            uploadVisible: true,
        })
    }
    // 提交上传书籍
    handleSubmitBook(values){
        console.log(values);
    }
    render(){
        return(
            <Router>
                <div>
            <div className="search">
                <div className="left">
                   {/*   实际上应该无论在哪个页面只要点击了网站图标都能返回首页，但是这样写实现不了，干脆就去掉点击返回首页功能
                   <Link to="/index"> <img src="https://qidian.gtimg.com/qd/images/logo.beebc.png"  alt="易读中文网" /></Link>*/}
                    <Link to="/index"> <img src="https://qidian.gtimg.com/qd/images/logo.beebc.png"  alt="易读中文网" /></Link>
               </div>
               <div className="center">
                   <Search
                       placeholder="input search text"
                       enterButton="Search"
                       size="large"
                       onSearch={value => console.log(value)}
                       className="inputSearch"
                   />
               </div>
               <div className="right">
                   <span className="userInfo">
                      {/* // 这里如果已经登录就显示“你好 麦香馅饼”
                       // 如果未登录就显示“登录”，然后点击就弹出Modal进行登录或者注册*/}
                        <span className="username">你好,</span>
                        {this.props.user ?
                           <Link to="/personalCenter"><b >{this.props.user.username}</b></Link>
                            :
                            <b onClick={this.showModal} style={{cursor:"pointer"}}>请登录</b>
                        }

                         <Modal
                                            title={this.state.isLogin ? "登录" : "注册"}
                                            visible={this.state.visible}
                                            onOk={this.handleOk}
                                            confirmLoading={this.state.confirmLoading}
                                            onCancel={this.handleCancel}
                                            width={this.state.isLogin ? 300 : 400}
                                            footer={null}
                                        >
                    <WrappedNormalLoginForm  isCancel={!this.state.visible} onToggleModal={this.handleToggleModal.bind(this)} isLogin={this.state.isLogin}/>
                </Modal>
                        <span className="username"> | </span>
                         {/*<span>
                             <Link to="/personalCenter">
                                <Badge count={2} dot>
                                    <Icon type="notification" />
                                </Badge>
                             </Link>
                         </span>
                         <span className="username"> | </span>

                         <span>
                             <i className="iconfont icon-shujia" id="shujia"/>
                         </span>
                        <span className="username"> | </span>*/}
                         <span>
                                <i className="iconfont icon-shangchuan" onClick={this.showUploadModal} style={{cursor:"pointer"}}/>
                         </span>
                       <Modal
                           title={"上传书籍"}
                           visible={this.state.uploadVisible}
                           onCancel={this.handleUploadFileCancel}
                           footer={null}
                       >
                    <WrappedUploadBookForm   onUploadCancel={this.handleUploadFileCancel.bind(this)} onSummitBook={this.handleSubmitBook.bind(this)}/>
                </Modal>
                       {/* // 如果账号为管理员就显示“管理员”按钮
                       // 如果为普通用户就不显示*/}
                       <span className="username"> | </span>
                       {this.props.user.isAdministrator ?
                           <Link to="/administrator"><i className="iconfont icon-admin" /></Link>
                           :
                           ""
                       }
                     </span>
                </div>
            </div>
                <Route exact path="/" component={IndexPageRouter} />
                <Route exact path="/index" component={IndexPageRouter} />
                <Route exact path="/personalCenter" component={PersonalCenter} />
                <Route exact path="/administrator" component={Administrator} />
            </div>

            </Router>
        )
    }
}