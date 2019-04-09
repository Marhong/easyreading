import React,{Component,Fragment} from 'react';
import IndexHeaderSearch from './IndexHeaderSearch';
import IndexHeaderLeft from './IndexHeaderLeft';
import IndexHeaderCenter from './IndexHeaderCenter';
import IndexHeaderRight from './IndexHeaderRight';
import IndexHeaderMain from './IndexHeaderMain';
import '../css/IndexHeader.css';
export default class IndexHeader extends Component{
    render(){
        return(
            <div className="header">
                <IndexHeaderSearch/>
                <IndexHeaderMain/>
            </div>
        )
    }
}