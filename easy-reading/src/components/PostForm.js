import {
    Form, Icon, Input, Button, Checkbox,
} from 'antd';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
const { TextArea } = Input;
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
                if(this.props.onSubmitPost){
                    console.log("这是在PostForm" + Date.now())
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
                               label="标题"
                               hasFeedback>
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: '请填写标题!' },
                                {max:20,message:"标题长度不能超过20!"}],
                        })(
                            <Input  placeholder="填写标题" style={{  width:450}}/>
                        )}
                    </Form.Item>
                    <Form.Item
                               label="内容"
                               hasFeedback>
                        {getFieldDecorator('content', {
                            rules: [{ required: true, message: '内容不能为空!' },
                                {max:100,message:"内容长度不能超过100!"}],
                        })(
                            <TextArea rows={3} placeholder="填写帖子内容" style={{ width:450}} ref={(postContent) => this.postContent = postContent}/>
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