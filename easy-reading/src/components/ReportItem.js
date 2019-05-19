import React,{Component} from 'react';
import {Modal} from 'antd';
import {WrappedBulletinForm} from './BulletinForm';
export default class ReportItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            confirmModalVisible:false,
            reportReasonVisible:false,
        }
    }
    handleReportFocus(e){
        e.target.style.color = "red";
        e.target.style.cursor="pointer";
    }
    handleReportBlur(e){
        e.target.style.color = "white";
    }
    hideReportModal = () => {
        this.setState({...this.state,reportReasonVisible:false});
    }

    handleReallyReport(){
        this.setState({...this.state,confirmModalVisible:false,reportReasonVisible:true});
    }
    showDiffReport(item){
        if(item.name){
            return `您确认要举报书籍：《${item.name}》 吗？`;
        }else if(item.title){
            return `您确认要举报帖子：“${item.title}” 吗？`;
        }else{
            return `您确认要举报评论：“${item.content}” 吗？`;
        }
    }
    handleReport(e){
        Modal.confirm({
            visible:this.state.confirmModalVisible,
            title: '举报信息',
            content: this.showDiffReport(this.props.item),
            okText: '确认',
            cancelText: '取消',
            onOk:this.handleReallyReport.bind(this),
        });
    }
    handleSubmit(values){
        this.hideReportModal();
        if(this.props.onSubmit){
            this.props.onSubmit(values);
        }
    }
    render(){
        return(
            <span>
                <i className="report iconfont icon-jubao"  onMouseOut={this.handleReportBlur.bind(this)} onMouseEnter={this.handleReportFocus.bind(this)} onClick={this.handleReport.bind(this)}>举报</i>
                <Modal
                    visible={this.state.reportReasonVisible}
                    title= '举报信息'
                    content={`您确认要举报书籍：《${this.props.item.name || this.props.item.postTitle}》吗？`}
                    footer={null}
                    onCancel={this.hideReportModal}
                    onOk={this.handleReallyReport.bind(this)}>
                    <WrappedBulletinForm onCancel={this.hideReportModal} onSubmitBulletin={this.handleSubmit.bind(this)} reportedItem={this.props.item}/>
                </Modal>
            </span>
        );
    }
}