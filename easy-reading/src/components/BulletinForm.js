import {
    Form, Icon, Input, Button, Checkbox,
} from 'antd';
import {message} from "antd/lib/index";
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import reqwest from "reqwest";
const bulletinUrl = "http://localhost:5000/easyreading/bulletin";
class BulletinForm extends React.Component {
    constructor(props){
        super(props);
    }

    // 居然无效？？
    componentDidMount(){
        this.props.form.resetFields();
        ReactDOM.findDOMNode(this.content).value = "";
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
               /* console.log('Received values of form: ', values);
                if(this.props.onSubmitBulletin){
                    this.props.onSubmitBulletin(values);
                }*/
               if(this.props.onSubmitBulletin && this.props.reportedItem){
                   this.props.onSubmitBulletin(values);
               }else{
                   let user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
                   reqwest({
                       url: `${bulletinUrl}/add`,
                       type:'json',
                       method:'post',
                       data:{userId:user.id,title:values.title,content:values.content,time:Date.now()},
                       error:function(err){
                           message.error("发布公告失败!");
                           console.log(err);
                       },
                       success: (res) => {
                           if(res){
                               message.success("发布公告成功!");
                               this.props.form.resetFields();
                               ReactDOM.findDOMNode(this.content).value = "";

                           }
                       },
                   })
               }
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
        const reportedItem = this.props.reportedItem;
        return (
            <div>
                <Form onSubmit={this.handleSubmit} className="bulletin_form">
                    {reportedItem ?
                        <Form.Item
                            label="举报项"
                            hasFeedback>
                            {reportedItem.name || reportedItem.title || reportedItem.content}
                        </Form.Item>
                        :
                        <Form.Item
                            label="标题"
                            hasFeedback>
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: '请填写标题!' },
                                    {max:20,message:"标题长度最大为20"}],
                            })(
                                <Input  placeholder="填写标题" style={{  width:450}}/>
                            )}
                        </Form.Item>
                    }

                    <Form.Item
                        label={reportedItem ? "举报原因" : "内容"}
                        hasFeedback>
                        {getFieldDecorator('content', {
                            rules: [{ required: true, message: '内容不能为空!' },
                                {max:300,message:"内容长度最大为300"}],
                        })(
                            <textarea  placeholder="填写内容" style={{ width:450}} ref={(content) => this.content = content}/>
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