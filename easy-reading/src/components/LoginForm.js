import {
    Form, Icon, Input, Button, Checkbox,Select,Cascader
} from 'antd';
import React,{Component} from 'react';
import '../css/LoginForm.css';
const { Option } = Select;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
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
const residences = [{
    value: 'zhejiang',
    label: '浙江',
    children: [{
        value: 'hangzhou',
        label: '杭州',
        children: [{
            value: 'xihu',
            label: '西湖区',
        }],
    }],
},{
    value: 'shanxi',
    label: '陕西',
    children: [{
        value: 'xian',
        label: '西安',
        children: [{
            value: 'lianhu',
            label: '莲湖区',
        }],
    }],
}];
class NormalLoginForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLogin : props.isLogin,
            confirmDirty: false,
        }
    }
    // 当Modal关闭时，重置表单里全部信息;将Modal内容重置为登录界面
    componentWillReceiveProps(isCancel){
        if(this.props.isCancel){
            this.props.form.resetFields();
            this.setState({isLogin:true});
        }

    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    // 将Modal内容在登录界面和注册界面进行切换
    handleToggleModal(e){
        e.preventDefault();
        this.setState({isLogin:!this.state.isLogin});
        if(this.props.onToggleModal){
            this.props.onToggleModal(!this.state.isLogin);
        }
    }
    // 验证两次输入密码是否一致
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入密码不一致!');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const defaultGender = "male";
        return (
            <div>
                {this.state.isLogin ?
            <Form onSubmit={this.handleSubmit} className="login-form" >
                <Form.Item
                    hasFeedback>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: '请输入用户名!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                    )}
                </Form.Item>
                <Form.Item
                    hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                    )}
                </Form.Item>
                <Form.Item
                    >
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>记住账号</Checkbox>
                    )}
                    <a className="login-form-forgot" href="">找回密码</a>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                    <span className="register">尚无账号? <a href="" onClick={this.handleToggleModal.bind(this)}>注册!</a></span>
                </Form.Item>
            </Form>
                    :
                <Form {...formItemLayout} onSubmit={this.handleSubmit} className="register-form" >
                    <Form.Item
                        label="用户名"
                        hasFeedback
                    >
                        {getFieldDecorator('userName', {
                            rules: [{
                                required: true, message: '请输入用户名!',
                            }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        hasFeedback
                    >
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true, message: '请输入密码!',
                            }, {
                                validator: this.validateToNextPassword,
                            }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="确认密码"
                        hasFeedback
                    >
                        {getFieldDecorator('confirm', {
                            rules: [{
                                required: true, message: '请确认密码!',
                            }, {
                                validator: this.compareToFirstPassword,
                            }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="确认密码" onBlur={this.handleConfirmBlur}/>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="性别"
                        hasFeedback
                    >
                            <Select defaultValue={defaultGender}>
                                <Option value="male">男</Option>
                                <Option value="female">女</Option>
                            </Select>
                    </Form.Item>
                    <Form.Item
                        label="现居地"
                        hasFeedback
                    >
                        {getFieldDecorator('residence', {
                            initialValue: ["shanxi","xian","lianhu"],
                            rules: [{ type: 'array',  message: '请选择现居地!' }],
                        })(
                            <Cascader options={residences} />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="E-mail"
                        hasFeedback
                    >
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: '邮箱格式错误!',
                            }, {
                                message: '请输入邮箱!',
                            }],
                        })(
                            <Input placeholder="邮箱"/>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="手机号码"
                        hasFeedback
                    >
                        {getFieldDecorator('phone', {
                            rules: [{  message: '请输入手机号码!' ,type:'number'}],
                        })(
                            <Input  placeholder="联系电话"/>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="个人简介"
                        hasFeedback

                    >
                        {getFieldDecorator('description', {
                            rules: [{  message: '请输入个人简介!', whitespace: true }],
                        })(
                            <Input placeholder="个人简介"/>
                        )}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            注册
                        </Button>
                        <span className="register">已有账号? <a href="" onClick={this.handleToggleModal.bind(this)}>登录!</a></span>
                    </Form.Item>
                </Form>
                }
            </div>

        );
    }
}

export const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);