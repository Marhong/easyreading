import React, { PureComponent } from 'react'

export default class UploadFile extends PureComponent {
    state = {
        name: '',
        path: '',
        preview: null,
        data: null,
        progress:0,
    }
    componentWillUnmount() {
        this.xhr.upload.removeEventListener('progress', this.uploadProgress, false)
    }
    changeName = (e) => {
        this.setState({ name: e.target.value })
    }

    changePath = (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }

        let src,preview,type=file.type;
        if (/^image\/\S+$/.test(type)) {

            src = URL.createObjectURL(file)
            preview = <img src={src} alt='' />

        } else if (/^video\/\S+$/.test(type)) {

            src = URL.createObjectURL(file)
            preview = <video src={src} autoPlay loop controls />

        } else if (/^text\/\S+$/.test(type)) {
            const self = this;
            const reader = new FileReader();
            reader.readAsText(file,"utf-8");
            //注：onload是异步函数，此处需独立处理
            reader.onload = function (e) {
                preview = <textarea value={this.result} readOnly></textarea>
                self.setState({ path: file.name, data: file, preview: preview,progress:0 })
            }
            return;
        }
        this.setState({ path: file.name, data: file, preview: preview ,progress:0})
    }

    upload = () => {
        const data = this.state.data;
        if (!data) {
            console.log('未选择文件');
            return;
        }
        const url = 'http://localhost:3000/api/upload';  // 此处的url应该是服务端提供的上传文件api
        const form = new FormData();

        form.append('file', data);  // 此处的file字段由上传的api决定，可以是其它值

        // fetch方式暂不支持progress events事件

        /*  fetch(url, {
            method: 'POST',
            body: form
        }).then(res => {
            console.log(res)
        }) */

        // 改为使用ajax实现上传并添加显示进度条功能

        const xhr = new XMLHttpRequest();
        this.xhr = xhr
        xhr.upload.addEventListener('progress', this.uploadProgress, false);  // 第三个参数为useCapture?，是否使用事件捕获/冒泡

        // xhr.addEventListener('load',uploadComplete,false);
        // xhr.addEventListener('error',uploadFail,false);
        // xhr.addEventListener('abort',uploadCancel,false)

        xhr.open('POST', url, true);  // 第三个参数为async?，异步/同步
        xhr.send(form);
    }

    uploadProgress = (e) => {
        if (e.lengthComputable) {
            const progress = Math.round((e.loaded / e.total) * 100);
            this.setState({ progress: progress })
        }
    }



    cancel = () => {
        this.props.closeOverlay();
    }

    render() {
        const { name, path, preview } = this.state;
        return (
            <div>
                <h4>上传文件</h4>
                <div className='row'>
                    <label>文件名称</label>
                    <input type='text' placeholder='请输入文件名' value={name} onChange={this.changeName} />
                </div>
                <div className='row'>
                    <label>文件路径</label>
                    <div className='row-input'>
                        <span>{path ? path : '请选择文件路径'}</span>
                        <input type='file' accept='video/*,image/*,text/plain' onChange={this.changePath} />
                    </div>
                </div>
                <div className='media'>
                    {preview}
                </div>
                <div className='progressWrap'>
                    <div className='progress' style={{ width: `${this.state.progress}%` }} />
                    <span className='progress-text' style={{left:`${this.state.progress}%`}}>{this.state.progress}%</span>
                </div>
                <button className='primary upload' onClick={this.upload}>上传</button>
                <button className='primary cancel' onClick={this.cancel}>取消</button>
            </div>
        )
    }
}