import {Form,  Input, Button, Select,Upload,Icon} from 'antd';
import React,{Component} from 'react';
import reqwest from "reqwest";
import {message} from "antd/lib/index";

const Option = Select.Option;



class UploadBookForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            fileList: [],
            uploading: false,
        }
    }

    // 点击提交
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.form.resetFields();
                this.handleUpload();
                console.log('Received values of form: ', values);
                if(this.props.onSummitBook){
                    this.props.onSummitBook(values);
                }
            }
        });

    }
    // 点击取消按钮
    handleCancel(e){
        this.props.form.resetFields();
        if(this.props.onUploadCancel){
            this.props.onUploadCancel();
        }
    }
    // 选择关键字发生变化
    handleKeyWordsChange(value) {
        console.log(`selected ${value}`);
    }
    // 上传文件状态发生变化
    handleChange = (info) => {
        let fileList = [...info.fileList];

        // 1. Limit the number of uploaded files
        // Only to show two recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-1);

        // 2. Read from response and show file link
        fileList = fileList.map((file) => {
            if (file.response) {
                // Component will show file.url as link
                file.url = file.response.url;
            }
            return file;
        });

        this.setState({ fileList });
    }
    // 点击上传按钮
    handleUpload = () => {
        const { fileList } = this.state;
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('files[]', file);
        });

        this.setState({
            uploading: true,
        });

        // You can use any AJAX library you like
        reqwest({
            url: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            method: 'post',
            processData: false,
            data: formData,
            success: () => {
                this.setState({
                    fileList: [],
                    uploading: false,
                });
                message.success('上传成功!');
            },
            error: () => {
                this.setState({
                    uploading: false,
                });
                message.error('上传失败!');
            },
        });
    };
    // 限制上传文件类型和上传文件个数
    normFile = (e) => {
        // 检查文件类型
        // 只能上传txt或者pdf文件
        const isTXT = e.file.type === 'text/plain';
       // const isPDF = e.file.type === 'application/pdf';
       // const isTxtOrPdf = isTXT || isPDF ;
        const isTxtOrPdf = isTXT; // 先只实现上传txt文件，然后将txt文件转为一个个html文件
        if (!isTxtOrPdf) {
            message.error('只能上传txt或者pdf文件');
            console.log(e.fileList);
            this.setState({fileList:[]});
            return;
        } else {
            // 限制只能上传一个文件
            e.fileList = e.fileList.slice(-1);
            if (Array.isArray(e)) {
                return e;
            }

            return e && e.fileList;
        }
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const { uploading, fileList } = this.state;
        const keywords=["热血","重生","豪门","孤儿","盗贼","特种兵","特工","黑客","明星"];
        const children = [];
        for (let i = 0; i < keywords.length; i++) {
            children.push(<Option key={i.toString(36) + i}>{keywords[i]}</Option>);
        }
        const props = {
            onRemove: (file) => {
                this.setState((state) => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: (file) => {
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                return false;
            },
            onChange: this.handleChange,
        };
        const formItemLayout = {
            labelCol: {
                xs: { span: 10 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 10 },
                sm: { span: 6 },
            },
        };
        return (
            <div>
                <Form onSubmit={this.handleSubmit} className="upload_book_form">
                    <Form.Item
                        label="书名"
                        hasFeedback
                        {...formItemLayout}
                        style={{marginBottom:5,}}>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请填写书籍名称!' }],
                        })(
                            <Input  placeholder="填写书名" style={{width:200}}/>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="作者"
                        hasFeedback
                        {...formItemLayout}
                        style={{marginBottom:5,}}>

                        {getFieldDecorator('author', {
                            rules: [{ required: true, message: '请填写书籍作者!' }],
                        })(
                            <Input  placeholder="填写书籍作者" style={{width:200}} />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="书籍类型"
                        hasFeedback
                        {...formItemLayout}
                        style={{marginBottom:5,}}
                    >
                        {getFieldDecorator('type', {
                            rules: [
                                { required: true, message: '请选择书籍类型!' },
                            ],
                        })(
                            <Select placeholder="请选择合适的书籍类型" style={{width:200}}>
                                <Option value="xuanhuan">玄幻</Option>
                                <Option value="qihuan">奇幻</Option>
                                <Option value="xianxia">仙侠</Option>
                                <Option value="lishi">历史</Option>
                                <Option value="dushi">都市</Option>
                                <Option value="kehuan">科幻</Option>
                                <Option value="junshi">军事</Option>
                                <Option value="lingyi">灵异</Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="地域"
                        hasFeedback
                        {...formItemLayout}
                        style={{marginBottom:5,}}
                    >
                        {getFieldDecorator('distribute', {
                            rules: [
                                {  message: '请选择书籍类型!' },
                            ],
                        })(
                            <Select placeholder="请选择合适的地域" style={{width:200}}>
                                <Option value="xuanhuan">中国</Option>
                                <Option value="qihuan">美国</Option>
                                <Option value="xianxia">俄罗斯</Option>
                                <Option value="lishi">英国</Option>
                                <Option value="dushi">法国</Option>
                                <Option value="kehuan">德国</Option>
                                <Option value="junshi">日本</Option>
                                <Option value="lingyi">加拿大</Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="朝代"
                        hasFeedback
                        {...formItemLayout}
                        style={{marginBottom:5,}}
                    >
                        {getFieldDecorator('dynasty', {
                            rules: [
                                {  message: '请选择书籍对应朝代!' },
                            ],
                        })(
                            <Select placeholder="请选择合适的朝代" style={{width:200}}>
                                <Option value="xuanhuan">夏朝</Option>
                                <Option value="qihuan">商朝</Option>
                                <Option value="xianxia">周朝</Option>
                                <Option value="lishi">秦朝</Option>
                                <Option value="dushi">汉朝</Option>
                                <Option value="kehuan">晋朝</Option>
                                <Option value="junshi">隋朝</Option>
                                <Option value="lingyi">唐朝</Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="关键字"
                        hasFeedback
                        {...formItemLayout}
                        style={{marginBottom:5,}}
                    >
                        {getFieldDecorator('keywords', {
                            rules: [
                                {  required:true,message: '请选择书籍关键字!' },
                            ],
                        })(
                            <Select
                                mode="multiple"
                                placeholder="请选择书籍关键字，可多选"
                                defaultValue={['a10', 'c12']}
                                onChange={this.handleKeyWordsChange}
                                style={{width:200}}
                            >
                                {children}
                            </Select>
                        )}
                    </Form.Item>

                    <Form.Item
                        label="上传文件"
                        {...formItemLayout}
                        style={{marginBottom:5,}}
                    >
                        {getFieldDecorator('upload', {
                            rules: [
                                { required: true, message: '请选择上传书籍文件!' },
                            ],
                            valuePropName: 'fileList',
                            getValueFromEvent: this.normFile,
                        })(
                            <Upload {...props} setFieldValue={this.state.fileList} accept=".txt">
                                <Button style={{width:200}}>
                                    <Icon type="upload" /> 选择文件
                                </Button>
                            </Upload>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="书籍简介"
                        hasFeedback
                        {...formItemLayout}
                        style={{marginBottom:5,}}>

                        {getFieldDecorator('description', {
                            rules: [{ required: true, message: '请填写书籍简介!' }],
                        })(
                            <Input  placeholder="填写书籍简介" style={{width:200}} />
                        )}
                    </Form.Item>

                    <Form.Item style={{float:"right",marginTop:-15,marginBottom:10}} >
                        <Button   onClick={this.handleCancel.bind(this)}>取消</Button>
                        <Button
                        htmlType="submit"
                        disabled={fileList.length === 0}
                        loading={uploading}
                        style={{ marginLeft:5}}
                    >
                        {uploading ? '正在上传' : '开始上传' }
                    </Button>
                    </Form.Item>
                </Form>
            </div>

        );
    }
}

export const WrappedUploadBookForm = Form.create({ name: 'upload_book_form' })(UploadBookForm);