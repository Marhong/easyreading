import React,{Component} from 'react';
import '../css/BookListDetail.css';
import BookListDetailItem from "./BookListDetailItem";

import BookItemFooter from "./BookItemFooter";
// 书单的数据
const bookListItem =     {
    imgs:[{src:"https://bookcover.yuewen.com/qdbimg/349573/1013470066/180",name:"沙发书单"},{name:"考虑领料",src:"https://bookcover.yuewen.com/qdbimg/349573/1013862069/180"},{name:"我的师傅",src:"https://bookcover.yuewen.com/qdbimg/349573/1010754871/180"},{name:"三国志",src:"https://bookcover.yuewen.com/qdbimg/349573/1014127256/180"}],
    bookList:{name:"点击量破亿的十大网文小说，你看过哪些",description:"神奇的世界，诞生了无数的种类与神话。有我们熟知的斗气大陆，斗罗大陆。也有充满灵性的天元大陆，元气大陆。   人生的旅途，不在于目的地，在于的是沿途的风景，神奇的大陆，诞生了太多让人缅怀，深陷记忆的风景。   我推荐了一条风景线给大家，一起踏上旅途吧！\n" +
        "                       ",authorImg:"https://facepic.qidian.com/qd_face/349573/262/100",author:"小南",num:10,createTime:"1553011200",likeNum:9},
};
// 书单内的书籍数据
const data= [{id:"566",imgSrc:"https://bookcover.yuewen.com/qdbimg/349573/1015021024/300",name:"我是万界BOSS",author:"大象不会飞",type:"都市",isOver:false,desc:"我是地球1上唯一一个真正意义上的BOSS，不论什么生意，我都能盘活！我有一大波来自其他宇宙的员工，他们是最可爱的人，我有一大波来自其他宇宙的技术，它们是我最大沙发阿斯蒂芬",latestUpdate:{name:"第三十三章 第四个成员",time:"1553095343"}},
    {id:"251",imgSrc:"https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=337129898,4125449877&fm=58&w=121&h=140&img.PNG",name:"西北工业大学",author:"大象不会飞",type:"都市",isOver:false,desc:"我是地球1上唯一一个真正意义上的BOSS，不论什么生意，我都能盘活！我有一大波来自其他宇宙的员工，他们是最可爱的人，我有一大波来自其他宇宙的技术，它们是我最大沙发阿斯蒂芬",latestUpdate:{name:"第四百三十三章 五一劳动节",time:"1556724143"}},];
const recommends = ["新书幼苗，前几章就发现主角是个有趣的娃，所以追了下来，事实证明，作者的风格就是幽默逗比，所以行文非常欢乐，剧情开森！另外，里面也涉及到很多关于创业和商业的专业名词啥的，比较真实，初步看来，作者可能打算做全行业的创业，算是个大胆的尝试，目前没有什么毒点，阔以追一波！",
"长平大漠翼大风，冠军踏胡临瀚海。飞将耸立北长城，博望名扬西域间。"];
export default class BookListDetail extends Component{
    render(){
        // 应该通过从BookListItem传过来的BookListId从服务器去获取对应书单的数据和书单内的书籍的数据
        const bookList = bookListItem.bookList;
        return(
            <div className="bookListDetail">
                <h3 ><strong>想念书单#想念出品</strong></h3>
                <div className="bookListInfo">
                    <p>{bookList.description}</p>
                    <BookItemFooter bookList={bookList} />
                </div>
                <div className="items">
                    <span><strong>共{bookList.num}本书</strong></span>
                {data.map((item,index) => {
                    return  <BookListDetailItem book={item} key={index} recommend={recommends[index]}/>
                })}
                </div>
            </div>
        );
    }
}