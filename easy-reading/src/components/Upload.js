import React,{Component} from 'react'

import Overlay from './Overlay'
import UploadFile from './UploadFile'

export default class Upload extends Component{
    state={
        overlayActive:false
    }
    closeOverlay=()=>{
        this.setState({overlayActive:false})
    }
    showOverlay=()=>{
        this.setState({overlayActive:true})
    }
    render(){
        return(
            <div>
                {this.state.overlayActive&&<Overlay onClose={this.closeOverlay}><UploadFile closeOverlay={this.closeOverlay}/></Overlay>}
                <button onClick={this.showOverlay}>show</button>
            </div>
        )
    }
}