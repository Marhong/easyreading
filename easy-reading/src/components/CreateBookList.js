import {Form, Input, Icon, Button,} from 'antd';
import React,{Component} from 'react';
import '../css/CreateBookList.css';
import ReactDOM from 'react-dom';
let id = 0;

class DynamicFieldSet extends Component {
    remove = (k) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }

    add = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { keys, names } = values;
                console.log('Received values of form: ', values);
                console.log('Merged values:', keys.map(key => names[key]));
                this.props.form.resetFields();
                ReactDOM.findDOMNode(this.listDescription).value = "";
            }
        });

    }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },
            },
        };
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => (
            <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? '选择的书籍' : ''}
                required={true}
                key={k}
            >
                {getFieldDecorator(`names[${k}]`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                        required: true,
                        whitespace: true,
                        message: "请输入书籍名或者书籍作者名",
                    }],
                })(
                    <Input placeholder="请输入书籍名" style={{ width: '60%', marginRight: 8 }} />
                )}
                {keys.length > 1 ? (
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        onClick={() => this.remove(k)}
                    />
                ) : null}
            </Form.Item>
        ));
        return (
            <div className="createBookList">
            <Form onSubmit={this.handleSubmit}>
                <Form.Item {...formItemLayout}
                label="书单名"
                           hasFeedback>
                    {getFieldDecorator('listName', {
                        rules: [{ required: true, message: '请填写书单名!' }],
                    })(
                        <Input  placeholder="填写书单名" style={{ width: '60%', marginRight: 8 }}/>
                    )}
                </Form.Item>
                <Form.Item {...formItemLayout}
                    label="书单介绍"
                           hasFeedback>
                    {getFieldDecorator('listDescription', {
                        rules: [{ required: true, message: '请填写书单介绍!' }],
                    })(
                        <textarea  placeholder="填写书单介绍" style={{ width: '60%', marginRight: 8 }} ref={(listDescription) => this.listDescription = listDescription}/>
                    )}
                </Form.Item>
                {formItems}
                <Form.Item {...formItemLayoutWithOutLabel}

                >
                    <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                        <Icon type="plus" /> 添加书籍
                    </Button>
                </Form.Item>
                <Form.Item {...formItemLayoutWithOutLabel}>
                    <Button type="primary" htmlType="submit">提交</Button>
                </Form.Item>
            </Form>
            </div>
        );
    }
}

export const WrappedDynamicFieldSet = Form.create({ name: 'dynamic_form_item' })(DynamicFieldSet);