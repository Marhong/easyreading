import React,{Component} from 'react';
import {Button,Icon} from 'antd';
import {colorRGBToHex,HexToColorRGB} from '../static/commonFun';

require('../css/PageSetting.css');
const bgColors = {
    faeed7:"#d9cdb6",
    e9eff5:"#b9c1c9",
    e7f0e1:"#c4ccc0",
    f2e4e9:"#d4c7cc",
    f7f7f7:"#ccc",
    f9f7e3:"#d6d5c1",
    343434:"#222",
};
export default class PageSetting extends Component{
    constructor(props){
        super(props);
        this.state = {
            style : {fontSize:14,bgColor:"rgb(250, 238, 215)",pageBgColor:"RGB(217, 205, 182)",pageWidth:1200,fontFamily:1,},
        }
    }
    componentDidMount(){

    }
    handleClose(){
        this.setting.style.display = "none";
        this.setState((prevState) =>  {return {style:prevState.style}});
    }
    handleSettingChange(e){
        let clickedSpan = e.target;
        let parent = clickedSpan.parentNode;
        let spans;
        if(parent.classList.contains("controlFont")){
            let fontSize = Number(this.size.innerHTML);
            if(clickedSpan.classList.contains("minus") && fontSize >14){
                this.size.innerHTML = fontSize - 2;
            }else if(clickedSpan.classList.contains("plus") && fontSize<30){
                this.size.innerHTML = fontSize + 2;
            }
            this.setState({style:{...this.state.style,fontSize:Number(this.size.innerHTML)}});
        }else if(parent.classList.contains("outer")){
            spans = parent.parentNode.children;
            for(let span of spans){
                span.classList.remove("selected");
            }
            clickedSpan.parentNode.classList.add("selected");
            let bgColor = getComputedStyle(clickedSpan).borderColor;
            let hexBgColor = colorRGBToHex(bgColor);
            let pageColor = HexToColorRGB(bgColors[hexBgColor]);
            console.log(bgColor,pageColor)
            this.setState({style:{...this.state.style,bgColor:bgColor,pageBgColor:pageColor}});
        }else if(parent.classList.contains("controlFontFamily")){
            spans = parent.children;
            for(let span of spans){
                span.classList.remove("selected");
            }
            clickedSpan.classList.add("selected");
            let fontFamily;
            let selectedFontFamily = clickedSpan.innerHTML;
            if(selectedFontFamily === "宋体"){
                fontFamily = "SimSun";
            }else if(selectedFontFamily === "黑体"){
                fontFamily = "SimHei";
            }else if(selectedFontFamily === "微软雅黑"){
                fontFamily = "Microsoft YaHei";
            }else{
                fontFamily = "KaiTi";
            }
            this.setState({style:{...this.state.style,fontFamily:fontFamily}});
        }else if(parent.classList.contains("controlPageWidth")){
            spans = parent.children;
            for(let span of spans){
                span.classList.remove("selected");
            }
            clickedSpan.classList.add("selected");
            let width = clickedSpan.innerHTML;
            let newWidth;
            if(width === "默认"){
                newWidth = 1200;
            }else{
                newWidth = Number(width);
            }
            this.setState({style:{...this.state.style,pageWidth:newWidth}});
        }else if(parent.classList.contains("controlSetting")){

            if(!clickedSpan.classList.contains("ant-btn-danger")){
                this.setState({style:null});
            }
            this.setting.style.display = "none";
        }
        setTimeout(()=>{
            if(this.props.onSetting){
                this.props.onSetting(this.state.style);
            }
        },1);

    }

    render(){
        return(
            <div className="setting" ref={(setting) => this.setting = setting} style={{fontSize:18}}>
                <div className="title">
                    <strong className="settingName">设置</strong><Icon type="close" className="close" onClick={this.handleClose.bind(this)}/>
                </div>
                <hr/>
                <div className="bgColor" onClick={this.handleSettingChange.bind(this)} >
                    <span >阅读背景</span>
                        <span className="outer selected" > <span className="color1"/></span>
                        <span className="outer"><span className="color2"/></span>
                        <span className="outer"><span className="color3"/></span>
                        <span className="outer"><span className="color4"/></span>
                        <span className="outer"><span className="color5"/></span>
                        <span className="outer"><span className="color6"/></span>
                        <span className="outer"><span className="color7"/></span>

                </div>
                <div className="fontFamily" onClick={this.handleSettingChange.bind(this)}>
                    <span >正文字体</span>
                    <span className="controlFontFamily" >
                        <span className="selected">宋体</span>
                        <span>黑体</span>
                        <span>微软雅黑</span>
                        <span>楷体</span>
                    </span>
                </div>
                <div className="fontSize">
                    <span >字体大小 </span>
                    <span className="controlFont" onClick={this.handleSettingChange.bind(this)}>
                        <strong className="minus">A-</strong> | <strong/><span ref={(size) => this.size = size}> 14</span> <strong/>| <strong/><strong className="plus">A+</strong>
                    </span>
                </div>
                <div className="pageWidth"  onClick={this.handleSettingChange.bind(this)}>
                    <span >页面宽度 </span>
                    <span className="controlPageWidth" >
                        <span>600</span>
                        <span>800</span>
                        <span className="selected">默认</span>
                        <span>1500</span>
                    </span>
                </div>
                <div className="footer">
                    <span className="controlSetting" onClick={this.handleSettingChange.bind(this)}> <Button type="danger">保存设置</Button></span>
                </div>
            </div>
        );
    }

}
