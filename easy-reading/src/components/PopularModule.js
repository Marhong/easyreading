import React,{Component} from 'react';
import LeftSelectedCard from "./LeftSelectedCard";
import MyListCard from "./MyListCard";

export default class PopularModule extends Component{
    static defaultProps = {
        moduleType : "",
    }
    render(){
        const data =[{id:"sm122",type:"玄幻",imgSrc:"https://bookcover.yuewen.com/qdbimg/349573/1013451202/180",name:"11征服荒野",bookHref:"",desc:"我是简介所为和司我是"},
            {id:"sm1252",type:"玄幻",imgSrc:"https://bookcover.yuewen.com/qdbimg/349573/1013451202/180",name:"11征服荒野",bookHref:"",desc:"我是简介所为和司我是"},
            {id:"sm1232",type:"玄幻",imgSrc:"http://imgsrc.baidu.com/forum/pic/item/bfb87c22dd54564e60f2e846bdde9c82d0584f2c.jpg",name:"22征服荒野",bookHref:"",desc:"我是简介所为和司我是简所发生的发了科技和分类进卡士大夫阿斯蒂芬拉三等奖分类撒大声地房间里看电视"},
            {id:"sm3122",type:"玄幻",imgSrc:"https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=10da86d6df43ad4bb92e40c0b2035a89/03087bf40ad162d93b3a196f1fdfa9ec8b13cde9.jpg",name:"33征服荒野",bookHref:"",desc:"我是简介所为和司我是我是简介所为和司我是我是简介所为和司我是我是简介所为和司我是我是简介所为和司我是"},
            {id:"s4m122",type:"玄幻",imgSrc:"https://bookcover.yuewen.com/qdbimg/349573/1013451202/180",name:"44征服荒野",bookHref:"",desc:"我是简介所为和司我是简所发生的发了科技和分类进卡士大夫阿斯蒂芬拉三等奖分类撒大声地房间里看电视"},];
        const typeData = [{bookType:"玄幻",books:data,nickname:"xuanhuan"},{bookType:"奇幻",books:data,nickname:"qihuan"},{bookType:"仙侠",books:data,nickname:"xianxia"},{bookType:"历史",books:data,nickname:"lishi"}];
        const typeData2 = [{bookType:"都市",books:data,nickname:"dushi"},{bookType:"科幻",books:data,nickname:"kehuan"},{bookType:"军事",books:data,nickname:"junshi"},{bookType:"灵异",books:data,nickname:"lingyi"}];
        return(
            <div className="popularModule">
                <div className="leftSelectedCards">
                    <LeftSelectedCard data={data} moduleType={this.props.moduleType}/>
                </div>
                <div className="rightCardList">
                    <ul>
                        {typeData.map((typeList,index) => {
                            return <li key={index}><MyListCard  data={typeList} /></li>
                        })}
                    </ul>
                    <ul>
                        {typeData2.map((typeList,index) => {
                            return <li key={index}><MyListCard  data={typeList} /></li>
                        })}
                    </ul>

                </div>
            </div>
        );
    }
}