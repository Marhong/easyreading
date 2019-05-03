import {
    Form, Icon, Input, Button, Checkbox,
} from 'antd';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import '../css/LoginForm.css';

class PostForm extends React.Component {
    constructor(props){
        super(props);
    }
    // 当Modal关闭时，重置表单里全部信息;将Modal内容重置为登录界面
    componentWillReceiveProps(isCancel){
        if(!this.props.isCancel){
            this.props.form.resetFields();
            ReactDOM.findDOMNode(this.postContent).value = "";
        }

    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                if(this.props.onSubmitPost){
                    this.props.onSubmitPost(values);
                }
            }
        });

    }
    handleCancel(e){
        this.props.form.resetFields();
        ReactDOM.findDOMNode(this.postContent).value = "";
        if(this.props.onCancel){
            this.props.onCancel();
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form onSubmit={this.handleSubmit} className="post_form">
                    <Form.Item
                               label="标题">
                        {getFieldDecorator('postTitle', {
                            rules: [{ required: true, message: '请填写标题!' }],
                        })(
                            <Input  placeholder="填写标题" style={{  width:450}}/>
                        )}
                    </Form.Item>
                    <Form.Item
                               label="内容">
                        {getFieldDecorator('postContent', {
                            rules: [{ required: true, message: '内容不能为空!' }],
                        })(
                            <textarea  placeholder="填写帖子内容" style={{ width:450}} ref={(postContent) => this.postContent = postContent}/>
                        )}
                    </Form.Item>
                    <Form.Item style={{float:"right",marginTop:-25,marginRight:20}}>
                        <Button   onClick={this.handleCancel.bind(this)}>取消</Button> <Button type="primary" htmlType="submit">提交</Button>
                    </Form.Item>
                    </Form>
            </div>

        );
    }
}

export const WrappedPostForm = Form.create({ name: 'post_form' })(PostForm);