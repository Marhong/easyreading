import React,{Component} from 'react';
import {Input,Badge,Icon, Modal} from 'antd';
import {WrappedNormalLoginForm} from './LoginForm';
const Search = Input.Search;
// 展示首页头部搜索模块
export default class IndexHeaderSearch extends Component{
    static defaultProps={
        user:{username:"书友201904111630",},
    };
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            confirmLoading: false,
            isLogin:true,
        }
    }

    // 关闭Modal
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({isLogin:true});
        setTimeout(() => {
            this.setState({
                visible: false,
            });
        }, 1);
    };
    // 根据子组件的isLogin状态来切换父组件相应的isLogin状态
    handleToggleModal(isLogin){
        this.setState({isLogin:isLogin});
    }
    // 展示Modal
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    render(){
        return(
            <div className="search">
                <div className="left">
                    <img src="https://qidian.gtimg.com/qd/images/logo.beebc.png"  alt="易读中文网" />
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
                        <span className="username">你好,</span><b onClick={this.showModal}>{this.props.user.username}
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
                        </b>
                        <span className="username"> | </span>
                         <span>
                            <Badge count={2} dot>
                                <Icon type="notification" />
                            </Badge>
                         </span>
                         <span className="username"> | </span>

                         <span>
                             <i className="iconfont icon-shujia" id="shujia"/>
                         </span>
                        <span className="username"> | </span>
                         <span>
                             <i className="iconfont icon-shangchuan" id="upload"/>
                         </span>
                     </span>
                </div>
            </div>
        )
    }
}