import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { Menu ,Divider,Tabs,Table,Select,Form,DatePicker,Input,Button,Tag} from 'antd';
import moment from 'moment';
import {WrappedRegistrationForm} from './RegistrationForm';
require('../css/PersonalCenter.css');
const { Option } = Select;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
// 菜单项为"我的书架"的表头
const columns = [
    { title: '书名', dataIndex: 'name', key: 'name' },
    { title: '作者', dataIndex: 'author', key: 'author' },
    { title: '最新章节', dataIndex: 'chapter', key: 'chapter' },
    { title: '更新时间', dataIndex: 'updateTime', key: 'updateTime' },
    {
        title: '操作',  key: 'operation', render:() => (
            <span>
                                        <a href="javascript:;">继续阅读</a>
                                        <Divider type="vertical" />
                                        <a href="javascript:;">删除</a>
                                    </span>
        )},];
// 菜单项为“我的书单”的表头
const columns2 = [
    { title: '书单名', dataIndex: 'name', key: 'name' },
    { title: '作者', dataIndex: 'author', key: 'author' },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
    {
        title: '操作',  key: 'operation', render:() => (
            <span>
                                        <a href="javascript:;">继续阅读</a>
                                        <Divider type="vertical" />
                                        <a href="javascript:;">删除</a>
                                    </span>
        )},];
// 菜单项为“我的书评” > “发表的书评” 时的表头
const postColumns = [
    { title: '书评', dataIndex: 'post', key: 'post' },
    { title: '是否精华', dataIndex: 'isEssence', key: 'isEssence' },
    { title: '回复数量', dataIndex: 'replyNum', key: 'replyNum' },
    { title: '最后回复时间', dataIndex: 'latReplyTime', key: 'latReplyTime' },
    { title: '所在书评区', dataIndex: 'bookName', key: 'bookName' },];
// 菜单项为“我的书评” > “回复的书评” 时的表头
const replyColumns = [
    { title: '书评', dataIndex: 'post', key: 'post' },
    { title: '回复内容', dataIndex: 'replyContent', key: 'replyContent' },
    { title: '回复时间', dataIndex: 'latReplyTime', key: 'latReplyTime' },
    { title: '所在书评区', dataIndex: 'bookName', key: 'bookName' },];
// 菜单项为“我的书评” > “点赞的书评” 时的表头
const likeColumns = [
    { title: '书评', dataIndex: 'post', key: 'post' },
    { title: '点赞时间', dataIndex: 'latReplyTime', key: 'latReplyTime' },
    { title: '所在书评区', dataIndex: 'bookName', key: 'bookName' },];
// 菜单项为“上传记录”的表头
const columns6 = [
    { title: '书名', dataIndex: 'name', key: 'name' },
    { title: '作者', dataIndex: 'author', key: 'author' },
    { title: '类型', dataIndex: 'bookType', key: 'bookType' },
    { title: '上传时间', dataIndex: 'uploadTime', key: 'uploadTime' },];
// 菜单项为“我的书架”时的数据
const data = [
    {
        key: 1, name: '癞蛤蟆想吃天鹅肉', author: '烽火戏诸侯', chapter: '第二百一十三章 长得美想的还没', updateTime: '一天前',description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 2, name: '斗破苍穹', author: '天蚕土豆', chapter: '第四百一十三章 晋升斗皇', updateTime: '两天前',description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
    },
    {
        key: 3, name: '求魔', author: '耳根', chapter: '第二百三十三章 海神', updateTime: '一个月前',description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
    },
];
// 菜单项为“我的书单”时的数据
const data2 = [
    {
        key: 1, name: '经典玄幻小说', author: '马后炮',  createTime: '2019-01-11'
    },
    {
        key: 2, name: '热血武侠小说', author: '周玄机',  createTime: '2019-02-11'
    },
    {
        key: 3, name: '恐怖灵异小说', author: '阿萨德',  createTime: '2019-01-31'
    },
];
// 菜单项为“我的书评” > “回复的书评” 时的数据
const postData = [
    {
        key: 1, post: '李小二这么做这不地道', isEssence: '是', replyNum: '20', latReplyTime: '2019-02-10 14:20:20',bookName: '癞蛤蟆想吃天鹅肉',
    },
    {
        key: 2, post: '消炎啥时候成斗帝的？', isEssence: '否', replyNum: '25', latReplyTime: '2019-02-12 11:10:20',bookName: '斗破苍穹',
    },
    {
        key: 3, post: '苏铭好惨', isEssence: '是', replyNum: '50', latReplyTime: '2019-02-15 10:15:10',bookName: '求魔',
    },
];
// 菜单项为“我的书评” > “点赞的书评” 时的数据
const replyData = [
    {
        key: 1, post: '李小二这么做这不地道', replyContent: '就是啊',  latReplyTime: '2019-02-10 14:20:20',bookName: '癞蛤蟆想吃天鹅肉',
    },
    {
        key: 2, post: '消炎啥时候成斗帝的？', replyContent: '书快要结束的时候', latReplyTime: '2019-02-12 11:10:20',bookName: '斗破苍穹',
    },
    {
        key: 3, post: '苏铭好惨', replyContent: '我也这样觉得',  latReplyTime: '2019-02-15 10:15:10',bookName: '求魔',
    },
];
// 菜单项为“我的书评” > “点赞的书评” 时的数据
const likeData = [
    {
        key: 1, post: '李小二这么做这不地道', latReplyTime: '2019-02-10 14:20:20',bookName: '癞蛤蟆想吃天鹅肉',
    },
    {
        key: 2, post: '消炎啥时候成斗帝的？',  latReplyTime: '2019-02-12 11:10:20',bookName: '斗破苍穹',
    },
    {
        key: 3, post: '苏铭好惨',  latReplyTime: '2019-02-15 10:15:10',bookName: '求魔',
    },
];
// 菜单项为“消息通知” > “系统消息” 时的数据
const sysData = [
    {
        key: 1, from: '管理员', msgTitle:"新年问候",time: '2019-03-15 14:20:20',content: '大家新年好',
    },
    {
        key: 2, from: '管理员', msgTitle:"五一假期",time: '2019-03-12 10:20:20',content: '五一去打球',
    },
    {
        key: 3, from: '管理员', msgTitle:"科目三考试",time: '2019-03-05 19:20:20',content: '科目二考完十五天才能考科三',
    },
];
// 菜单项为“消息通知” > “私息” 时的数据
const perData = [
    {
        key: 1, from: '小新', msgTitle:"新年问候",time: '2019-03-15 14:20:20',content: '大家新年好',
    },
    {
        key: 2, from: '正南', msgTitle:"五一假期",time: '2019-03-12 10:20:20',content: '五一去打球',
    },
    {
        key: 3, from: '风间', msgTitle:"科目三考试",time: '2019-03-05 19:20:20',content: '科目二考完十五天才能考科三',
    },
];
// 菜单项为“阅读记录” > “周” 时的数据
const weekData = [
    {
        key: 1, num: 3, totalTime: '144小时',period: '2019-03-04 至 2019-03-10',
    },
    {
        key: 2, num: 3,  totalTime: '144小时',period: '2019-03-11 至 2019-03-17',
    },
    {
        key: 3, num: 3,  totalTime: '144小时',period: '2019-03-18 至 2019-03-24',
    },
];
// 菜单项为“阅读记录” > “月” 时的数据
const monthData = [
    {
        key: 1, num: 9, totalTime: '432小时',period: '2019年3月',
    },
    {
        key: 2, num: 9, totalTime: '432小时',period: '2019年4月',
    },
];
// 菜单项为“阅读记录” > “年” 时的数据
const yearData = [
    {
        key: 1, num: 18, totalTime: '864小时',period: '2019年',
    },
    {
        key: 2, num: 30, totalTime: '1000小时',period: '2018年',
    },
];
// 菜单项为“上传记录”时的数据
const data6 = [
    {
        key: 1, name: '癞蛤蟆想吃天鹅肉', author: '烽火戏诸侯', bookType: '都市', uploadTime: '2019-04-21 14:21:20',
    },
    {
        key: 2, name: '斗破苍穹', author: '天蚕土豆', bookType: '仙侠', uploadTime: '2019-02-11 10:11:20',
    },
    {
        key: 3, name: '求魔', author: '耳根', bookType: '玄幻', uploadTime: '2019-02-21 18:51:20',
    },
];
const TabPane = Tabs.TabPane;
// 菜单项为“我的书单”时每一行展开的内容
const expandedRowRender = (e) => {
    const columns = [
        { title: '书名', dataIndex: 'name', key: 'name' },
        { title: '作者', dataIndex: 'author', key: 'author' },
        { title: '最新章节', dataIndex: 'chapter',key: 'chapter'},
        { title: '更新时间', dataIndex: 'updateTime', key: 'updateTime' },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: () => (
                <span className="table-operation">
            <a href="javascript:;">继续阅读</a>
                    <Divider type="vertical"/>
            <a href="javascript:;">删除</a>
          </span>
            ),
        },
    ];
    const data = [{key: e.key+"剑来", name: '剑来'+e.key, author:"烽火戏诸侯",chapter: '第四百九十二章 别有洞天', updateTime: '2019-04-30 00:03:41'},
        {key: e.key+ '秦吏', name: '秦吏'+e.key,author:"七月新番", chapter: '第897章 我来看你了', updateTime: '2019-04-29 18:11:35'},
        {key: e.key+'汉乡', name: '汉乡'+e.key, author:"孑与2",chapter: '第一百六十八章 泰山对', updateTime: '2019-04-29 14:46:20'},];

    return (
        <Table
            columns={columns}
            dataSource={data}
            pagination={false}
        />
    );
};
// 菜单项为“阅读记录”时每一行展开的内容
const recordExpandedRowRender = (e) => {
    const columns = [
        { title: '书名', dataIndex: 'name', key: 'name' },
        { title: '作者', dataIndex: 'author', key: 'author' },
        { title: '类型', dataIndex: 'type',key: 'type'},
        { title: '地区', dataIndex: 'distribute', key: 'distribute' },
        { title: '年代', dataIndex: 'era', key: 'era' },
        { title: '时长', dataIndex: 'totalTime',key: 'totalTime'},
        { title: '开始阅读时间', dataIndex: 'startTime', key: 'startTime' },
        { title: '最后阅读时间', dataIndex: 'lastTime', key: 'lastTime' },
    ];
    const data = [{key: e.key+"剑来", name: '剑来'+e.key, author:"烽火戏诸侯",type: '玄幻',distribute:"中国",era:"春秋战国",totalTime:"54小时", startTime: '2018-04-30 00:03:41', lastTime: '2019-04-30 00:03:41'},
        {key: e.key+ '秦吏', name: '秦吏'+e.key,author:"七月新番",type: '历史',distribute:"中国",era:"秦汉",totalTime:"30小时", startTime: '2018-02-15 00:03:41', lastTime: '2019-04-30 00:03:41'},
        {key: e.key+'汉乡', name: '汉乡'+e.key, author:"孑与2",type: '历史',distribute:"中国",era:"汉朝",totalTime:"60小时", startTime: '2018-09-30 00:03:41', lastTime: '2019-04-30 00:03:41'},];

    return (
        <Table
            columns={columns}
            dataSource={data}
            pagination={false}
        />
    );
};
const postTabs = [{name:"发表的书评",dataName:"postData",columnsName:"postColumns"},
    {name:"回复的书评",dataName:"replyData",columnsName:"replyColumns"},
    {name:"点赞的书评",dataName:"likeData",columnsName:"likeColumns"}];
const msgTabs = [{name:"系统消息",dataName:"sysData",columnsName:"sysColumns"},
    {name:"私信",dataName:"perData",columnsName:"perColumns"},];
const readingRecord = [{name:"周",dataName:"weekData",columnsName:"weekColumns",key:"weekdata"},
    {name:"月",dataName:"monthData",columnsName:"monthColumns"},
    {name:"年",dataName:"yearData",columnsName:"yearColumns"},];
const perInfoTabs =  [{name:"基本信息",},
    {name:"修改密码",},];
const columnsCollection ={
    postColumns:[
        { title: '书评', dataIndex: 'post', key: 'post' },
        { title: '是否精华', dataIndex: 'isEssence', key: 'isEssence' },
        { title: '回复数量', dataIndex: 'replyNum', key: 'replyNum' },
        { title: '最后回复时间', dataIndex: 'latReplyTime', key: 'latReplyTime' },
        { title: '所在书评区', dataIndex: 'bookName', key: 'bookName' },],
    replyColumns:[
        { title: '书评', dataIndex: 'post', key: 'post' },
        { title: '回复内容', dataIndex: 'replyContent', key: 'replyContent' },
        { title: '回复时间', dataIndex: 'latReplyTime', key: 'latReplyTime' },
        { title: '所在书评区', dataIndex: 'bookName', key: 'bookName' },],
    likeColumns:[
        { title: '书评', dataIndex: 'post', key: 'post' },
        { title: '点赞时间', dataIndex: 'latReplyTime', key: 'latReplyTime' },
        { title: '所在书评区', dataIndex: 'bookName', key: 'bookName' },],
    sysColumns:[ { title: '来自', dataIndex: 'from', key: 'from' },
        { title: '标题', dataIndex: 'msgTitle', key: 'msgTitle' },
        { title: '内容', dataIndex: 'content', key: 'content' },
        { title: '日期', dataIndex: 'time', key: 'time' },],
    perColumns:[ { title: '来自', dataIndex: 'from', key: 'from' },
        { title: '标题', dataIndex: 'msgTitle', key: 'msgTitle' },
        { title: '内容', dataIndex: 'content', key: 'content' },
        { title: '日期', dataIndex: 'time', key: 'time' },],
    weekColumns:[ { title: '阅读书籍数量', dataIndex: 'num', key: 'num' },
        { title: '阅读总时长', dataIndex: 'totalTime', key: 'totalTime' },
        { title: '起止日期', dataIndex: 'period', key: 'period' },],
    monthColumns:[ { title: '阅读书籍数量', dataIndex: 'num', key: 'num' },
        { title: '阅读总时长', dataIndex: 'totalTime', key: 'totalTime' },
        { title: '起止日期', dataIndex: 'period', key: 'period' },],
    yearColumns:[ { title: '阅读书籍数量', dataIndex: 'num', key: 'num' },
        { title: '阅读总时长', dataIndex: 'totalTime', key: 'totalTime' },
        { title: '起止日期', dataIndex: 'period', key: 'period' },],
}
export default class PersonalCenter extends Component{
    static defaultProps = {
        userInfo :{name:"麦香馅饼和肉夹馍",gender:"male",address:"shanxi,xian,lianhu",birthday:"2019-04-28",phone:"15245256",email:"15245256@qq.com",description:"我爱看小说你呢？"}
    }
    constructor(props){
        super(props);
        this.state = {
            columns : columns,
            data:data,
            expandedRowRender:null,
            recordExpandedRowRender:null,
            tabs:postTabs,
            postData:postData,
            replyData:replyData,
            likeData:likeData,
            sysData:sysData,
            perData:perData,
            weekData:weekData,
            monthData:monthData,
            yearData:yearData,


        }
    }
    handleClick = (e) =>{

        setTimeout(()=>{
            this.setState({...this.state,recordExpandedRowRender:null});
        },1);
        let table = ReactDOM.findDOMNode(this.table);
        let perinfo = ReactDOM.findDOMNode(this.perinfo);
        perinfo.classList.remove("ant-menu-item-selected");
        switch (e.key){
            case "1":
                this.tabs.style.display = "none";

                table.style.display = "block";

                this.setState({...this.state,columns:columns,data:data,expandedRowRender:null});
                break;

            case "2":
                this.tabs.style.display = "none";
                table.style.display = "block";

                this.setState({...this.state,columns:columns2,data:data2,expandedRowRender:expandedRowRender});
                break;
            case "3":
                this.tabs.style.display = "block";
                table.style.display = "none";

                this.setState({...this.state,tabs:postTabs});
                break;
            case "4":
                this.tabs.style.display = "block";
                table.style.display = "none";

                this.setState({...this.state,tabs:msgTabs});
                break;
            case "5":
                 this.tabs.style.display = "block";
                 table.style.display = "none";

                setTimeout(()=>{
                    this.setState({...this.state,tabs:readingRecord,recordExpandedRowRender:recordExpandedRowRender});
                },2);
                 break;

            case "6":
                this.tabs.style.display = "none";
                table.style.display = "block";

                this.setState({columns:columns6,data:data6,expandedRowRender:null});
                break;
            default:
                this.tabs.style.display = "block";
                table.style.display = "none";
                this.setState({...this.state,tabs:perInfoTabs});
                break;
        }
    }
    handleTabChange = (key) => {
        console.log(key);
        if(key === "weekdata"){
            this.setState({...this.state,recordExpandedRowRender:recordExpandedRowRender})
        }else{
            this.setState({...this.state,recordExpandedRowRender:null})
        }
}
    handleEditInfo(e){
        setTimeout(()=>{
            this.setState({...this.state,recordExpandedRowRender:null});
        },1);
        let table = ReactDOM.findDOMNode(this.table);
        this.tabs.style.display = "block";
        table.style.display = "none";
        this.setState({...this.state,tabs:perInfoTabs});
        let perinfo = ReactDOM.findDOMNode(this.perinfo);
        let items = perinfo.parentNode.children;
        for(let item of items){
            item.classList.remove("ant-menu-item-selected");
        }
        perinfo.classList.add("ant-menu-item-selected");
    }
    render(){
        const user = this.props.userInfo;
        return(
            <div className="wrap">
                <div className="userInfo">
                    <img className="userImg" src="http://static.zongheng.com/userimage/default/image_120_120.gif"/>
                    <div className="userInfoMsg">
                        <p><span className="userName"><strong>麦香馅饼和肉夹馍</strong></span><span className="modifyInfo" onClick={this.handleEditInfo.bind(this)}><i className="iconfont icon-xiugai"/> 个人资料修改</span></p>
                        <p className="description">我是个阿斯蒂芬阿斯蒂芬啊啊士大夫阿斯蒂芬</p>

                        <span className="userTags"><Tag color="magenta">magenta</Tag>
                                <Tag color="red">red</Tag>
                                <Tag color="volcano">volcano</Tag>
                                <Tag color="orange">orange</Tag>
                            </span>

                    </div>
                </div>
                <div className="content">
                    <div className="menu">
                        <Menu
                            onClick={this.handleClick}
                            defaultSelectedKeys={['1']}
                            mode="inline"
                        >
                            <Menu.Item key="1"><i className="iconfont icon-shujia"/> 我的书架</Menu.Item>
                            <Menu.Item key="2"><i className="iconfont icon-shudan"/> 我的书单</Menu.Item>
                            <Menu.Item key="3"><i className="iconfont icon-pinglun"/> 我的书评</Menu.Item>
                            <Menu.Item key="4"><i className="iconfont icon-xiaoxi"/> 消息通知</Menu.Item>
                            <Menu.Item key="5"><i className="iconfont icon-yuedujilu"/> 阅读记录</Menu.Item>
                            <Menu.Item key="6"><i className="iconfont icon-shujushangchuanjilu"/> 上传记录</Menu.Item>
                            <Menu.Item key="7" ref={(perinfo) => this.perinfo = perinfo}><i className="iconfont icon-gerenziliao"/> 个人资料</Menu.Item>
                        </Menu>
                    </div>
                    <div className="main">
                        <Table
                            columns={this.state.columns}
                            expandedRowRender={this.state.expandedRowRender}
                            dataSource={this.state.data}
                            ref={(table) => this.table = table}
                        />
                        <div className="card-container" ref={(tabs) => this.tabs =tabs } style={{display:"none"}}>
                            <Tabs type="card" onChange={this.handleTabChange}>
                                {this.state.tabs.map((tab,index) => {
                                    return <TabPane tab={tab.name} key={tab.key || index+1}>
                                        {(tab.name === "基本信息") || (tab.name === "修改密码") ?
                                                <WrappedRegistrationForm user={user} type={tab.name}/>
                                            :
                                                <Table columns={columnsCollection[tab.columnsName]}
                                                       dataSource={this.state[tab.dataName]}
                                                       expandedRowRender={this.state.recordExpandedRowRender}
                                            />}
                                    </TabPane>
                                })}
                            </Tabs>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}