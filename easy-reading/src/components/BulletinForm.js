import {
    Form, Icon, Input, Button, Checkbox,
} from 'antd';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';

class BulletinForm extends React.Component {
    constructor(props){
        super(props);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                if(this.props.onSubmitBulletin){
                    this.props.onSubmitBulletin(values);
                }
                this.props.form.resetFields();
                ReactDOM.findDOMNode(this.content).value = "";
            }
        });

    }
    handleCancel(e){
        this.props.form.resetFields();
        ReactDOM.findDOMNode(this.content).value = "";
        if(this.props.onCancel){
            this.props.onCancel();
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form onSubmit={this.handleSubmit} className="bulletin_form">
                    <Form.Item
                        label="标题">
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: '请填写标题!' }],
                        })(
                            <Input  placeholder="填写标题" style={{  width:450}}/>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="内容">
                        {getFieldDecorator('content', {
                            rules: [{ required: true, message: '内容不能为空!' }],
                        })(
                            <textarea  placeholder="填写公告内容" style={{ width:450}} ref={(content) => this.content = content}/>
                        )}
                    </Form.Item>
                    <Form.Item >
                        <Button   onClick={this.handleCancel.bind(this)}>取消</Button> <Button type="primary" htmlType="submit">提交</Button>
                    </Form.Item>
                </Form>
            </div>

        );
    }
}

export const WrappedBulletinForm = Form.create({ name: 'bulletin_form' })(BulletinForm);