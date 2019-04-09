import React,{Component,Fragment} from 'react';
import IndexHeaderSearch from './IndexHeaderSearch';
import IndexHeaderLeft from './IndexHeaderLeft';
import IndexHeaderCenter from './IndexHeaderCenter';
import IndexHeaderRight from './IndexHeaderRight';

export default class IndexHeaderMain extends Component{
    render(){
        return(
                <div className="headerMain">
                    <div className="headerLeft">
                        <IndexHeaderLeft/>
                    </div>
                    <div className="headerCenter">
                        <IndexHeaderCenter/>
                    </div>
                    <div className="headerRight">
                        <IndexHeaderRight/>
                    </div>

                </div>
        )
    }
}