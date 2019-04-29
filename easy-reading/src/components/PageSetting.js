import React,{Component} from 'react';
import {Button,Icon} from 'antd';
require('../css/PageSetting.css');
export default class PageSetting extends Component{

    handleClose(){
        this.setting.style.display = "none";
    }
    handleSettingChange(e){
        let clickedSpan = e.target;
        let parent = clickedSpan.parentNode;
        let spans;
        let isChangeColor = false;
        if(parent.classList.contains("outer")){
             spans = parent.parentNode.children;
             isChangeColor = true;
        }else{
             spans = parent.children;
        }
        for(let span of spans){
            span.classList.remove("selected");
        }
        if(isChangeColor){
            clickedSpan.parentNode.classList.add("selected");
        }else{
            clickedSpan.classList.add("selected");
        }
    }

    render(){
        return(
            <div className="setting" ref={(setting) => this.setting = setting}>
                <div className="title">
                    <strong className="settingName">设置</strong><Icon type="close" className="close" onClick={this.handleClose.bind(this)}/>
                </div>
                <hr/>
                <div className="bgColor" onClick={this.handleSettingChange.bind(this)}>
                    <span>阅读背景</span>
                        <span className="outer selected" > <span className="color1"/></span>
                        <span className="outer"><span className="color2"/></span>
                        <span className="outer"><span className="color3"/></span>
                        <span className="outer"><span className="color4"/></span>
                        <span className="outer"><span className="color5"/></span>
                        <span className="outer"><span className="color6"/></span>
                        <span className="outer"><span className="color7"/></span>

                </div>
                <div className="fontFamily" onClick={this.handleSettingChange.bind(this)}>
                    <span>正文字体</span>
                    <span className="controlFontFamily">
                        <span className="selected">宋体</span>
                        <span>黑体</span>
                        <span>微软雅黑</span>
                        <span>楷体</span>
                    </span>
                </div>
                <div className="fontSize">
                    <span>字体大小 </span>
                    <span className="controlFont">
                        <strong>A-</strong> | <strong/>14 <strong/>| <strong/><strong>A+</strong>
                    </span>
                </div>
                <div className="pageWidth"  onClick={this.handleSettingChange.bind(this)}>
                    <span>页面宽度 </span>
                    <span className="controlPageWidth">
                        <span>600</span>
                        <span>800</span>
                        <span className="selected">默认</span>
                        <span>1500</span></span>
                </div>
                <div className="footer">
                    <span className="controlSetting"> <Button type="danger">保存设置</Button> <Button>恢复默认</Button></span>
                </div>
            </div>
        );
    }

}
