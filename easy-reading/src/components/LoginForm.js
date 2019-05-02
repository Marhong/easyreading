import {
    Form, Icon, Input, Button, Checkbox,
} from 'antd';
import React,{Component} from 'react';
import '../css/LoginForm.css';
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
        return (
            <div>
                {this.state.isLogin ?
            <Form onSubmit={this.handleSubmit} className="login-form" >
                <Form.Item>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: '请输入用户名!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                    )}
                </Form.Item>
                <Form.Item>
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