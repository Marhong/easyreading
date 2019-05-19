import { Form, Input, Tooltip, Icon, Cascader, Select,  Button, } from  'antd';
import React,{Component} from 'react';
import reqwest from "reqwest";
import {message} from "antd/lib/index";
const userUrl = "http://localhost:5000/easyreading/user";
const { Option } = Select;

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

class RegistrationForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            confirmDirty: false,
            user:props.user,
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let newUser = this.state.user;
                newUser.gender = values.gender ? values.gender : newUser.gender;
                newUser.address = values.residence.join(",");
                newUser.email = values.email ? values.email : newUser.email;
                newUser.phone = values.phone ? values.phone : newUser.phone;
                newUser.description = values.description ? values.description : newUser.description;
                console.log(newUser);
                reqwest({
                    url: `${userUrl}/update`,
                    type:'json',
                    method:'post',
                    data:{...newUser},
                    error:function(err){
                        console.log(err);
                    },
                    success: (res) => {
                        if(res){
                            localStorage.setItem("user",JSON.stringify(newUser));
                            message.success("修改账号信息成功！");
                            this.setState({...this.state,user:newUser});
                        }
                    },
                })
            }
        });
    };
    handleEditPassword = (e) =>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let newUser = this.state.user;
                newUser.password = values.password;
                console.log(newUser);
                reqwest({
                    url: `${userUrl}/update/password`,
                    type:'json',
                    method:'post',
                    data:{...newUser},
                    error:function(err){
                        console.log(err);
                    },
                    success: (res) => {
                        if(res){
                            this.props.form.resetFields();
                            localStorage.setItem("user",JSON.stringify(newUser));
                            message.success("修改密码成功！");
                            this.setState({...this.state,user:newUser});
                        }
                    },
                })
            }
        });
};
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入密码不一致!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };
    confirmPassword = (rule,value,callback) => {

        if (value && value !== this.state.user.password) {
            callback('旧密码错误!');
        } else {
            callback();
        }
    };
    render() {
        const user = this.state.user;
        const type = this.props.type;
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 15 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 15 },
                sm: { span: 10 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 15,
                    offset: 0,
                },
                sm: {
                    span: 10,
                    offset: 8,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        );
        if(type === "基本信息"){
            return (
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>

                    <Form.Item
                        label="昵称"
                    >
                        {user.name}
                    </Form.Item>
                    <Form.Item
                        label="性别"
                        hasFeedback>
                        {getFieldDecorator('gender', {
                            initialValue: user.gender,
                        })(
                            <Select  >
                                <Option value="male">男</Option>
                                <Option value="female">女</Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="现居地"
                        hasFeedback
                    >
                        {getFieldDecorator('residence', {
                            initialValue: [user.address.split(",")[0],user.address.split(",")[1],user.address.split(",")[2]],
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
                            <Input placeholder={user.email} />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="手机号码"
                        hasFeedback
                    >
                        {getFieldDecorator('phone', {
                            rules: [{  message: '请输入手机号码!'  ,pattern:/[0-9]{11}/}],
                        })(
                            <Input addonBefore={prefixSelector} placeholder={user.phone} />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="个人简介"
                        hasFeedback

                    >
                        {getFieldDecorator('description', {
                            rules: [{  message: '请输入个人简介!', whitespace: true }],
                        })(
                            <Input placeholder={user.description} />
                        )}
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">保存</Button>
                    </Form.Item>
                </Form>
            );
        }else{
            return (
                <Form {...formItemLayout} onSubmit={this.handleEditPassword}>
                    <Form.Item
                        label="昵称"
                    >
                        <p>{user.name}</p>
                    </Form.Item>
                    <Form.Item
                        label="旧密码"
                    >
                        {getFieldDecorator('oldPassword', {
                            rules: [{
                                required: true, message: '请输入旧密码!',
                            },, {
                                validator: this.confirmPassword,
                            }],
                        })(
                            <Input type="password" />
                        )}
                    </Form.Item>
                <Form.Item
                    label="新密码"
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: '请输入新密码!',
                        },
                        {min:6,message:"密码长度至少为6"},
                        {max:20,message:"密码长度不能超过20"},{
                            validator: this.validateToNextPassword,
                        }],
                    })(
                        <Input type="password" />
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
                <Input type="password" onBlur={this.handleConfirmBlur} />
            )}
        </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="danger" htmlType="submit">修改</Button>
                    </Form.Item>
                </Form>
            );
        }

    }
}

export const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

