import {Form,  Input, Button, Select,Upload,Icon} from 'antd';
import React,{Component} from 'react';
import reqwest from "reqwest";
import {message} from "antd/lib/index";
import $ from 'jquery';
const Option = Select.Option;
const bookUrl = "http://localhost:5000/easyreading/book";
const keywords=["热血","重生","豪门","孤儿","盗贼","特种兵","特工","黑客","明星"];

class UploadBookForm extends Component {
    constructor(props) {
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

                let data = new FormData($('#addForm')[0]);  //获取表单内容
                data.append("name",values.name);
                data.append("author",values.author);
                data.append("type",values.type);
                data.append("distribute",values.distribute);
                data.append("preface",values.preface);
                data.append("dynasty",values.dynasty);
                data.append("keywords",values.keywords.join(","));
                data.append("description",values.description);
                let user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
                data.append("userId",user.id);
                let uploadClass = this;
                this.ajaxFormPost(`${bookUrl}/add`, data, function (data) {  //ajax提交表单
                    if(data){
                        uploadClass.handleCancel();
                    }

                });
            }
        });

    }

    // 点击取消按钮
     handleCancel(e) {
        this.props.form.resetFields();
        if (this.props.onUploadCancel) {
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

        this.setState({fileList});
    }

    //ajax Post方法封装
    ajaxFormPost(url, formData, callBack) {
        $.ajax({
            type: 'POST',
            dataType: 'text',
            processData: false,  // 告诉JSLite不要去处理发送的数据
            contentType: false,   // 告诉JSLite不要去设置Content-Type请求头
            data: formData,
            url: url,
            encoding:'utf-8',
            scriptCharset: 'utf-8',
            success: function (data) {
                message.success('上传书籍成功!');
                callBack(data);
            },
            error: function (data) {
                message.error('上传书籍成功!');
                console.log('error:', data)
                callBack(data);
            }
        });
    }

    // 点击上传按钮
    handleUpload = () => {
        const {fileList} = this.state;
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('files[]', file);
        });

        this.setState({
            uploading: true,
        });

        // You can use any AJAX library you like
        reqwest({
            url: `${bookUrl}/receiveBookFile`,
            method: 'post',
            processData: false,
            data: formData,
            header: {
                'content-type': 'multipart/form-data'
            },
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
            this.setState({fileList: []});
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
        const {getFieldDecorator} = this.props.form;
        const {uploading, fileList} = this.state;

        const children = [];
        for (let i = 9; i < keywords.length+9; i++) {
            children.push(<Option key={i}>{keywords[i-9]}</Option>);
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
                xs: {span: 10},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 10},
                sm: {span: 6},
            },
        };
                        return (

                            <div>
                                 <Form onSubmit={this.handleSubmit} className="upload_book_form" id="addForm" encType="multipart/form-data">
                                     <Form.Item
                                         label="书名"
                                         hasFeedback
                                         {...formItemLayout}
                                         style={{marginBottom:5,}}>
                                         {getFieldDecorator('name', {
                                             rules: [{ required: true, message: '请填写书籍名称!' },
                                                 {max:15,message:"书籍名长度不能超过15"}],
                                         })(
                                             <Input  placeholder="填写书名" style={{width:200}} />
                                         )}
                                     </Form.Item>
                                     <Form.Item
                                         label="作者"
                                         hasFeedback
                                         {...formItemLayout}
                                         style={{marginBottom:5,}}>

                                         {getFieldDecorator('author', {
                                             rules: [{ required: true, message: '请填写书籍作者!' },
                                                 {max:15,message:"作者名长度不能超过15"}],
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
                                             <Select placeholder="请选择合适的书籍类型" style={{width:200}} >
                                                 <Option value="1">玄幻</Option>
                                                 <Option value="2">奇幻</Option>
                                                 <Option value="3">仙侠</Option>
                                                 <Option value="4">历史</Option>
                                                 <Option value="5">都市</Option>
                                                 <Option value="6">科幻</Option>
                                                 <Option value="7">军事</Option>
                                                 <Option value="8">灵异</Option>
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
                                                 {max:15,message:"地域名长度不能超过15"}
                                             ],
                                         })(
                                             <Select placeholder="请选择合适的地域" style={{width:200}} >
                                                 <Option value="zhongguo">中国</Option>
                                                 <Option value="meiguo">美国</Option>
                                                 <Option value="eluosi">俄罗斯</Option>
                                                 <Option value="yingguo">英国</Option>
                                                 <Option value="faguo">法国</Option>
                                                 <Option value="deguo">德国</Option>
                                                 <Option value="riben">日本</Option>
                                                 <Option value="jianada">加拿大</Option>
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
                                                 {max:15,message:"朝代名长度不能超过15"}
                                             ],
                                         })(
                                             <Select placeholder="请选择合适的朝代" style={{width:200}} >
                                                 <Option value="xiachao">夏朝</Option>
                                                 <Option value="shangchao">商朝</Option>
                                                 <Option value="zhouchao">周朝</Option>
                                                 <Option value="qinchao">秦朝</Option>
                                                 <Option value="hanchao">汉朝</Option>
                                                 <Option value="jinchao">晋朝</Option>
                                                 <Option value="suichao">隋朝</Option>
                                                 <Option value="tangchao">唐朝</Option>
                                                 <Option value="songchoa">宋朝</Option>
                                                 <Option value="yuanchao">元朝</Option>
                                                 <Option value="mingchao">明朝</Option>
                                                 <Option value="qingchao">清朝</Option>
                                                 <Option value="mingguo">民国</Option>
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
                                                 onChange={this.handleKeyWordsChange}
                                                 style={{width:200}}

                                             >
                                                 {children}
                                             </Select>
                                         )}
                                     </Form.Item>
{/*
                                    <Form.Item
                                         label="上传文件"
                                         {...formItemLayout}
                                         style={{marginBottom:5,}}
                                     >
                                         {getFieldDecorator('txt', {
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
                                     </Form.Item>*/}

                                     <Form.Item
                                         label="书籍简介"
                                         hasFeedback
                                         {...formItemLayout}
                                         style={{marginBottom:5,}}>

                                         {getFieldDecorator('description', {
                                             rules: [{ required: true, message: '请填写书籍简介!' },
                                                 {max:50,message:"书籍简介长度不能超过50"}],
                                         })(
                                             <Input  placeholder="填写书籍简介" style={{width:200}} />
                                         )}
                                     </Form.Item>
                                     <Form.Item
                                         label="书籍序言"
                                         hasFeedback
                                         {...formItemLayout}
                                         style={{marginBottom:5,}}>

                                         {getFieldDecorator('preface', {
                                             rules: [{ required: false, message: '请填写书籍序言!' }],
                                         })(
                                             <Input  placeholder="填写书籍序言" style={{width:200}} />
                                         )}
                                     </Form.Item>
                                     <Form.Item
                                         label="上传文件"
                                         {...formItemLayout}
                                         style={{marginBottom:5,}}
                                     >
                                         {getFieldDecorator('file', {
                                             rules: [
                                                 { required: true, message: '请选择上传书籍文件!' },
                                             ],

                                         })(
                                         <Input type="file" name='file' accept=".txt" style={{width:200}}/>
                                         )}
                                         </Form.Item>
                                     <Form.Item
                                         label="上传照片"
                                         {...formItemLayout}
                                         style={{marginBottom:5,}}
                                     >
                                         {getFieldDecorator('picture', {
                                             rules: [
                                                 { required: true, message: '请选择上传书籍文件!' },
                                             ],

                                         })(
                                             <Input type="file" name='picture' accept="image/png,image/jpg,image/jpeg"  style={{width:200}}/>
                                         )}
                                     </Form.Item>
                                     <Form.Item style={{float:"right",marginTop:-15,marginBottom:10}} >
                                         <Button   onClick={this.handleCancel.bind(this)}>取消</Button>
                                         <Button
                                         htmlType="submit"
                                         //disabled={fileList.length === 0}
                                         loading={uploading}
                                         style={{ marginLeft:5}}
                                     >
                                        {/* {uploading ? '正在上传' : '开始上传' }*/}
                                        开始上传
                                     </Button>
                                     </Form.Item>

                                 </Form>
                             </div>)

}


}
export const WrappedUploadBookForm = Form.create({ name: 'upload_book_form' })(UploadBookForm);

