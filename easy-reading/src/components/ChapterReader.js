import React,{Component} from 'react';
import {findDOMNode} from 'react-dom';
import {Breadcrumb,Button,Menu,} from 'antd';
import PageSetting from "./PageSetting";
import {Link} from 'react-router-dom';
require('../css/ChapterReader.css');


export default class ChapterReader extends Component{

    constructor(props){
        super(props);
        this.state = {
            // 通过chapterId从服务器去获取chapter
            chapter :JSON.parse(sessionStorage.getItem("chapter")),
            style:{},
        }

    }
    // 在渲染组件前先从服务器端获取数据
    componentWillMount(){
        // 从服务器端获取当前用户的个人阅读界面设置.url: localhost:3000/easyreading/readingSetting/:id/detail
        this.setState({...this.state,style:{fontSize:14,bgColor:"rgb(250, 238, 215)",pageBgColor:"RGB(217,205,182)",pageWidth:1200,fontFamily:"SimSun"}});
    }
    // 默认的阅读界面设置
    componentDidMount(){
        let style = this.state.style;
        document.documentElement.style.backgroundColor = style.pageBgColor;
        document.body.style.backgroundColor = style.pageBgColor;
        this.readBox.style.background = style.bgColor;
        this.readBox.style.fontSize = style.fontSize+"px";
        this.content.style.width = style.pageWidth-200+"px";
       // this.loadChapter('./chapter.html');
       // this.loadChapter('http://www.baidu.com');
    }
    // 根据用户选择设置阅读界面
    handleSetting(personalStyle){

        let style;
        if(personalStyle == null){
            style = this.state.style;
        }else{
            style = personalStyle;
        }
        this.readBox.style.background = style.bgColor;
        if(style.bgColor.toLowerCase() === "rgb(52, 52, 52)"){
            this.readBox.style.color = "#999999";
        }else{
            this.readBox.style.color = "black";
        }
        document.documentElement.style.backgroundColor = style.pageBgColor;
        document.body.style.backgroundColor = style.pageBgColor;
        this.content.style.fontSize = style.fontSize+"px";
        this.readBox.style.width = style.pageWidth+"px";
        this.content.style.width = style.pageWidth-200+"px";
        this.content.style.fontFamily = style.fontFamily;
        this.setState({...this.state,style:style});
        // 将新的readingSetting上传到服务器更新。url: localhost:3000/easyreading/readingSetting/:id/update
    }
    handleControl(e){
        let pageSetting =findDOMNode(this.setting);
        let clickSpan = e.target;
        if(clickSpan.classList.contains("viewChapList")){

        }else{
            pageSetting.style.display = "block";
        }
    }
    // 切换到上一章节
    handlePreChapter(e){
        // 从服务器获取当前章节的前一章。url: localhost:3000/easyreading/chapters/:id/preChapter
        let preChapter = {...this.state.chapter,name:"我是上一章"};
        this.setState({...this.state,chapter:preChapter});
    }
    // 切换到下一章节
    handleNextChapter(e){
        // 从服务器获取当前章节的下一章。url: localhost:3000/easyreading/chapters/:id/nextChapter
        let nextChapter = {...this.state.chapter,name:"我是下一章"};
        this.setState({...this.state,chapter:nextChapter});
    }
    // 加载显示章节html页面
    loadChapter(link) {
       // this.content.innerHTML = `<object type="text/html" data=${link} width="100%" height="100%"></object>`;
        return  `<p>听到刘老怪唤陆梦麟上台翻译这些英语诗，班上同学们顿时爆发出一阵欢快的讥笑声。</p>
<p>因为所有人都知道，以陆梦麟的英语“造诣”，别说翻译这种程度的英文了，他大概连写的啥都看不懂吧！他可是能考“五分”的猛人啊！</p>
<p>陆梦麟愣了一愣，有点不习惯的缓缓站起了身，在他的记忆中，已经很久很久没有回到课堂了，对于老师点名和上台解题这种事情，确实有点迟钝。</p>
<p>而这位教英语的刘老师，在陆梦麟的印象中，是一个相当猥琐的油腻男人。</p><p>他在教女生解题的时候，会刻意的将身子俯得很低，用老鹰捉小鸡式的呵护，将那些可怜的女生笼罩在怀中。</p>
<p>他还曾经在小城的舞厅里与人争风吃醋，被人打得头破血流，然后裹着纱布给学生上课，吹嘘自己在社会上是多么的神勇。</p>
<p>就是这么一个奇葩的人物，却是柳纺一中高二年级唯一的英语老师，如果只是在学术上误人子弟也就罢了，关键是这家伙的人品还不怎么样，从来不知道学生的自尊心为何物。</p>
<p>像这样故意点名让陆梦麟上讲台出丑的举动，根本就不是为了检验学生的成绩，而是纯粹为了令人尴尬而取乐。</p>
<p>若是在二十年后，这样的垃圾老师根本就没有立足之地，但是在九十年代，特别是在缺乏教师队资源的小地方，确实存在过。</p>
<p>在一片讥笑声中，陆梦麟很认真的看了看黑板上的英文，挠了挠下巴，随口道：“那个，我可能，译得不太准。”</p><p>这句话才一出口，教室里又是一阵哄笑。</p>
<p>陆梦麟这小子说话太逗了，含蓄，相当的含蓄啊！</p><p>如果他不是英语只考五分的神人，这话也许还有点说服力，但是现在从他的嘴里说出来，实在是喜感十足呢！</p>
<p>陆梦麟满脸坦然，在满堂哄笑声中仍保持着身姿如枪，气定神闲。</p><p>坐在左侧第三排的班长苏雪痕微微皱了皱眉，以微弱不可闻的动作轻轻摇头，并没有像其它人一样露出讥笑的神色。</p>
<p>她觉得，刘老师在课堂上点陆梦麟这样的偏科生来答题，完全是一种浪费大家时间的行为，况且这种嘲笑他人弱点的举动，并不好笑，反而有点...猥琐。</p>
<p>苏雪痕就是刘老师口中的那个某天才，她在整个年级的成绩稳居第一，而且很可怕的是从未被超越，比第二名永远能拉开至少十五分的差距，加上她的性格冷淡，沉默寡言，虽然从小就是美人胚子，却令人不敢随意亲近，甚至是有些敬畏。</p>
<p>男生们在私下里喜欢以语文课本中的《爱莲说》一文来形容苏雪痕，“出于淤泥而不染，濯清涟而不妖，中通外直，不蔓不枝，香远益清，亭亭净植，可远观而不可亵玩焉。”</p>
<p>此刻，站在课桌前的陆梦麟，居高临下，能够很轻易的将全班大部分同学的表情尽收眼底，很自然的也看到了苏雪痕的表情。</p>
<p>望着那张曾经令少年时代的自己魂系梦牵的清丽脸庞，陆梦麟突然觉得有些感慨万千。</p>
<p>苏雪痕是自己见过最优秀的女孩子，她不仅长得异常美丽，成绩格外优异，而且心地还很善良，可惜自己的学生时代实在太不够出色了，在她面前自惭形愧，根本就没有勇气去接近这样一位近乎完美的少女。</p>
<p>突然间，陆梦麟的眼神变得凌厉起来，目光炯炯的落在了苏雪痕的身上。</p>
<p>因为他想起来了，应该就在半年后的高考前夜，苏雪痕因为某件事情发挥失常，考出了自己最差的成绩，与第一志愿“燕京大学”失之交臂，令所有人扼腕不已。</p>
<p>如果自己的记忆没有出错的话，在大学毕业之后，苏雪痕凭借自己的优秀和努力，放弃了留校的机会下海创业，很快就积累到了普通人难以企及的财富。</p>
<p>也许正因为在事业上太过专注和努力，她在婚姻上的选择却昏了头，一段失败的婚姻让她颓废到底，惨遭家暴，甚至香消玉陨。</p>
<p>只要一想到如此清丽善良的女生，在滚滚浊世之中却落得那么悲惨的下场，陆梦麟就觉得心中隐隐作痛，望向苏雪痕的眼神中也充满了难以言状的情绪。</p>
<p>少女的敏感，让苏雪痕注意到了来自左上方的凝视，她并没有迎合陆梦麟的目光，反而稍显有些愠怒。</p>
<p>在这个少年如歌的年纪，男生对女生就算有倾慕之情，也只是在心底默默的念想，就连偷偷瞄上一眼都要鼓足了勇气，哪有像陆梦麟这样明目张胆的直勾勾盯着人家，而且还是在众目睽睽的课堂之上。</p>
<p>很快，同学们也发现了这个不寻常的细节，陆梦麟的目光一直盯着苏雪痕，似乎有千言万语要倾诉，这副模样太令人心惊胆颤了。</p><p>“见鬼，他盯着苏雪痕干什么？”</p>
<p>“他不会是想表白吧？这是疯了么？”</p><p>“哈哈，这小子发颠了！连眼神都不对劲了！”</p><p>课堂上传来同学们的交头结耳，议论纷纷。</p>
<p>刘老师也发现了不对劲的地方，他皱起眉头，满脸不屑的说道：“Toad wants to eat Swan meat，癞蛤蟆永远都是癞蛤蟆，想吃天鹅肉的话，先把英语练好吧！”</p>
<p>此言一出，班上同学们又是一团哄笑。</p><p>苏雪痕顿时气得把头埋得低低的，对陆梦麟大胆无知的举动更加生气了。</p>
<p>一片哄笑声中，陆梦麟终于回过神来，意识到自己现在是在九八年，苏雪痕还只是个高中小姑娘，自己刚才的目光似乎太直接了些。</p>
<p>“陆梦麟！父母交学费是让你来发呆的么？像你这样的垃圾，其实真没必要在我的课堂上发呆，去操场上打打篮球，锻炼身体不好吗？反正你也考不上大学，何必浪费光阴呢？”刘老师皮笑肉不笑的讥讽道。</p>
<p>不待陆梦麟说话，刘老师又继续开启嘲讽模式道：“未来是国际化的大时代，学不好英语，等于就是废物！你们如果像他一样，将来就只能去厂里扛大包，当苦力！”</p>
<p>说完这句话之后，教室里的哄笑声顿时少了大半。</p><p>大多数同学忽然觉得陆梦麟挺可怜的，被刘老怪当作了反面教材的典型，半点不留情面。</p>
<p>特别是那些英语成绩较差的同学，更是吓得噤若寒蝉，连大气都不敢出，生怕引火烧身，被刘老怪无差别攻击。</p>
<p>陆梦麟听到这番话，只是皱了皱眉头，显示出了与年龄并不相符的淡泊表情。</p>
<p>如果是二十年前的少年陆梦麟，被老师当众羞辱，大概会羞愤难平，紧张得说不出话来，只想有个地缝钻进去。</p>
<p>事实上，对于这个年纪的高中生而言，老师的影响和煽动性太强了，如果老师不喜欢哪个学生，大家都会似有若无的孤立他，而他本身也会承受巨大的心理压力。</p>
<p>不过，这些垃圾话对于拥有成年人灵魂的陆梦麟来说，却完全可以不当一回事。</p>
<p>如果按照走出社会后的标准来看，面前的这位刘老师只不过是一名普通的高中老师而已，而且还是人品不怎么样的那种，实在算不得什么了不起的人物，他的恶毒攻击并不能撼动陆梦麟的心神，反而只是觉得有些可笑。</p>
<p>许多有个性、有才华的学生，正是在那些垃圾老师的淫威之下，才失去了灵性和自我，变成泯然众人矣。</p>`
    }

    render(){
        console.log("章节id:",this.props.match.params.id);
        // 通过bookId从服务器去获取book
        const book = JSON.parse(sessionStorage.getItem("book"));
        const chapter = this.state.chapter;
        chapter.link = this.loadChapter();
        return(
                <div className="readerPage">
                    <div className="readerCrumb" style={{width:300}}>
                        <Breadcrumb separator=">" >
                            <Breadcrumb.Item > <Link to={`/index`} >首页</Link></Breadcrumb.Item>
                            <Breadcrumb.Item ><Link to={`/bookCity`} >书城</Link></Breadcrumb.Item>
                            <Breadcrumb.Item ><Link to={`/bookCity/books/${book.id}`} >{book.name}</Link></Breadcrumb.Item>
                            <Breadcrumb.Item ><Link to={`/bookCity/books/${book.id}/chapterList`} >章节列表</Link></Breadcrumb.Item>
                            <Breadcrumb.Item ><Link to={`/bookCity/books/${book.id}/chapterList/${chapter.id}`} style={{color:"#40a9ff"}}>{chapter.name}</Link></Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className="readerBox" ref={(readBox) => this.readBox = readBox}>
                         <PageSetting onSetting={this.handleSetting.bind(this)} ref={(setting) => this.setting =setting}/>
                         <div className="chapInfo">
                             <h3>{chapter.name}</h3>
                             <p>
                                <span>作者: {book.author}</span>
                                <span>字数: {chapter.numbers}</span>
                                <span>更新时间: {chapter.time}</span>
                                 <span className="control" onClick={this.handleControl.bind(this)}><Link to={`/bookCity/books/${book.id}/chapterList`} > <span className="viewChapList"><i className="iconfont icon-mulu"/> 章节目录</span></Link><span ><i className="iconfont icon-shezhi"/> 设置</span></span>
                             </p>
                         </div>
                        {chapter.link ?
                            <div className="content" ref={(content) => this.content = content}
                                 dangerouslySetInnerHTML={{__html: chapter.link}}/>
                            :
                            <p>暂无内容</p>
                        }
                        <div className="readerFooter">
                            <span className="control"> <Button onClick={this.handlePreChapter.bind(this)}>上一章</Button><Link to={`/bookCity/books/${book.id}/chapterList`} ><Button>章节目录</Button></Link><Button onClick={this.handleNextChapter.bind(this)}>下一章</Button></span>
                        </div>
                    </div>
                </div>

        );
    }
}