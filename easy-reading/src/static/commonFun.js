
export const dateFmt = function(fmt,date)
{
    let o = {
        "M+" : date.getMonth()+1,                 //月份
        "d+" : date.getDate(),                    //日
        "h+" : date.getHours(),                   //小时
        "m+" : date.getMinutes(),                 //分
        "s+" : date.getSeconds(),                 //秒
        "q+" : Math.floor((date.getMonth()+3)/3), //季度
        "S"  : date.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(let k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
};
//创建时间格式化显示
export const  crtTimeFtt = function (value,row,index){
    let crtTime = new Date(value*1000);
    return dateFmt("yyyy-MM-dd hh:mm:ss",crtTime);//直接调用公共JS里面的时间类处理的办法
};
// 将时间戳转为“刚刚、N分钟前、今天几点几分、昨天几点几分等表示法”
export function timestampFormat( timestamp ) {
    function zeroize( num ) {
        return (String(num).length == 1 ? '0' : '') + num;
    }

    let curTimestamp = parseInt(new Date().getTime() / 1000); //当前时间戳
    let timestampDiff = curTimestamp - timestamp; // 参数时间戳与当前时间戳相差秒数

    let curDate = new Date( curTimestamp * 1000 ); // 当前时间日期对象
    let tmDate = new Date( timestamp * 1000 );  // 参数时间戳转换成的日期对象

    let Y = tmDate.getFullYear(), m = tmDate.getMonth() + 1, d = tmDate.getDate();
    let H = tmDate.getHours(), i = tmDate.getMinutes(), s = tmDate.getSeconds();

    if ( timestampDiff < 60 ) { // 一分钟以内
        return "刚刚";
    } else if( timestampDiff < 3600 ) { // 一小时前之内
        return Math.floor( timestampDiff / 60 ) + "分钟前";
    } else if ( curDate.getFullYear() == Y && curDate.getMonth()+1 == m && curDate.getDate() == d ) {
        return '今天' + zeroize(H) + ':' + zeroize(i);
    } else {
        let newDate = new Date( (curTimestamp - 86400) * 1000 ); // 参数中的时间戳加一天转换成的日期对象
        if ( newDate.getFullYear() == Y && newDate.getMonth()+1 == m && newDate.getDate() == d ) {
            return '昨天' + zeroize(H) + ':' + zeroize(i);
        } else if ( curDate.getFullYear() == Y ) {
            return  zeroize(m) + '月' + zeroize(d) + '日 ' + zeroize(H) + ':' + zeroize(i);
        } else {
            return  Y + '年' + zeroize(m) + '月' + zeroize(d) + '日 ' + zeroize(H) + ':' + zeroize(i);
        }
    }
}

// 将rgb转为十六进制
export function colorRGBToHex(color) {
    let rgb = color.split(',');
    let r = parseInt(rgb[0].split('(')[1]);
    let g = parseInt(rgb[1]);
    let b = parseInt(rgb[2].split(')')[0]);

   // let hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    let hex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return hex;
}
// 将十六进制转为rgb格式
export function HexToColorRGB(num) {
    //十六进制颜色值的正则表达式
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    let sColor = num.toLowerCase();
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            let sColorNew = "#";
            for (let i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值
        let sColorChange = [];
        for (let i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
        }
        return "RGB(" + sColorChange.join(",") + ")";
    } else {
        return sColor;
    }
}

// 格式化数据，将只显示前10个字后面用...代替
export function formatArray(data){
    let formatedData = deepClone(data);
    if(Array.isArray(formatedData) && formatedData.length>0){
        for(let obj of formatedData){
            if(typeof obj === "object" && obj != null){
                for(let prop in obj){
                    if(obj[prop].length>10 && prop !== "key" && prop.indexOf("Time") === -1){
                        obj[prop] = obj[prop].slice(0,10)+"...";
                    }
                }
            }
        }
    }
    return formatedData;
}

// 通过序列化和反序列化实现深拷贝
export function deepClone(data){
    let result = JSON.stringify(data);
    return JSON.parse(result);
}

 // 根据书籍类型的别名(拼音)转换为对应了书籍类型对象
export function getDefaultType(type){
    let  obj = {type:"分类"};
    switch(type){
        case  "xuanhuan" :
            obj.value = "玄幻";
            break;
        case  "qihuan" :
            obj.value = "奇幻";
            break;
        case  "xianxia" :
            obj.value = "仙侠";
            break;
        case  "lishi" :
            obj.value = "历史";
            break;
        case  "dushi" :
            obj.value = "都市";
            break;
        case  "junshi" :
            obj.value = "军事";
            break;
        case  "kehuan" :
            obj.value = "科幻";
            break;
            // 没有传递参数，value值就为空
        case undefined:
            obj.value = "";
            break;
        default:
            obj.value = "灵异";
    }
    return obj;
}

/**数组根据数组对象中的某个属性值进行排序的方法
 * 使用例子：newArray.sort(sortBy('number',false)) //表示根据number属性降序排列;若第二个参数不传递，默认表示升序排序
 * @param attr 排序的属性 如number属性
 * @param rev true表示升序排列，false降序排序
 * */
export function sortBy(attr,rev){
    //第二个参数没有传递 默认升序排列
    if(rev ==  undefined){
        rev = 1;
    }else{
        rev = (rev) ? 1 : -1;
    }

    return function(a,b){
        a = a[attr];
        b = b[attr];
        if(a < b){
            return rev * -1;
        }
        if(a > b){
            return rev * 1;
        }
        return 0;
    }
}

// 将毫秒转为天 时 分 秒的格式
export function formatDuring(mss){
    let  days = parseInt(mss / (1000 * 60 * 60 * 24));
    days = days > 0 ? days+"天" : "";
    let hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    hours = hours > 0 ? hours+"小时" : "";
    let minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    minutes = minutes > 0 ? minutes+"分钟" : "";
    let seconds = (mss % (1000 * 60)) / 1000;
    seconds = seconds > 0 ? Math.ceil(seconds)+"秒" : "";
    return days +  hours  + minutes  + seconds ;
}

// 将筛选条件转为一个book对象
export function conditionTransform(search){
    let book={};
    if(search.keywords !== "" && search.keywords != null){
        book.name = search.keywords;
    }
    for(let item of search.type){
        let value = item.value;
        switch (item.type){
            case "分类":
                if(value !== ""){
                    book.type = booktypes_reverse(value);
                }
                break;
            case "状态":
                if(value === "完结"){
                    book.isFinished = 1;
                }else{
                    book.isFinished = 0;
                }
                break;
            case "字数":
                switch (value){
                    case "30万字以下":
                        book.sanshi = 300000;
                        break;
                    case "30-50万字":
                        book.wushi = 500000;
                        break;
                    case "50-100万字":
                        book.yibai = 1000000;
                        break;
                    case "100-200万字":
                        book.liangbai = 2000000;
                        break;
                    case "200万字以上":
                        book.wubai = 5000000;
                        break;
                    default:
                }
                break;
            case "更新时间":
                switch (value){
                    case "三日内":
                        book.latestChapter = Date.now() - 1000*60*60*24*3;
                        break;
                    case "七日内":
                        book.latestChapter = Date.now() - 1000*60*60*24*7;
                        break;
                    case "半月内":
                        book.latestChapter = Date.now() - 1000*60*60*24*15;
                        break;
                    case "一月内":
                        book.latestChapter = Date.now() - 1000*60*60*24*30;
                        break;
                    default:
                }
                break;
            case "属性":
                if(value === "免费"){
                    book.isFree = 1;
                }else{
                    book.isFree = 0;
                }
                break;
            case "标签":
                book.keywords = keywords_reverse(value);
                break;
            case "地域":
                book.distribute = distribute_reverse(value);
                break;
            case "朝代":
                book.dynasty = dynasty_reverse(value);
                break;
            default:

        }
    }
    return book;
};
export function  booktypes_reverse(value){
    switch(value){
        case "玄幻":
            return 1;
        case "奇幻":
            return 2;
        case "仙侠":
            return 3;
        case "历史":
            return 4;
        case"都市":
            return 5;
        case "科幻":
            return 6;
        case "军事":
            return 7;
        case "灵异":
            return 8;
        default:

    }

};
export function  booktypes_reverse2(value){
    switch(value){
        case "xuanhuan":
            return "玄幻";
        case "qihuan":
            return "奇幻";
        case "xianxia":
            return "仙侠";
        case "lishi":
            return "历史";
        case"dushi":
            return "都市";
        case "kehuan":
            return "科幻";
        case "junshi":
            return "军事";
        case "lingyi":
            return "灵异";
        default:

    }

};
export function keywords_reverse(value){
    switch (value){
        case "热血":
            return 9;
        case "重生":
            return 10;
        case "豪门":
            return 11;
        case "孤儿":
            return 12;
        case "盗贼":
            return 13;
        case "特工":
            return 15;
        case "黑客":
            return 16;
        case "明星":
            return 17;
        case "特种兵":
            return 14;
        case "杀手":
            break;
        case "老师":
            break;
        case "学生":
            break;
        default:

    }
};
export  function distribute_reverse(value){
    switch (value){
        case "中国":
            return  "zhongguo";
        case "美国":
            return "meiguo";
        case "俄罗斯":
            return   "eluosi";
        case "英国":
            return   "yingguo0";
        case "法国":
            return "faguo";
        case "德国":
            return  "deguo";
        case "日本":
            return  "riben";
        case "加拿大":
            return "jianada";
        default:
    }
}
export function dynasty_reverse(value){
        switch (value){
            case "夏朝":
                return "xiachao";
            case "商朝":
                return "shangchao";
            case "周朝":
                return "zhouchao";
            case "秦朝":
                return "qinchao";
            case "汉朝":
                return  "hanchao";
            case "晋朝":
                return   "jinchao";
            case "隋朝":
                return "suichao";;
            case "唐朝":
                return "tangchao";
            case "宋朝":
                return "songchoa";
            case "元朝":
                return  "yuanchao";
            case "明朝":
                return "mingchao";
            case "清朝":
                return "qingchao";
            case "民国":
                return  "mingguo";
            default:
        }

}
// 判断该book是否符合筛选条件
export  function isOk(book,search){
    let isOk = true;
    for(let key of Object.keys(search)){
        let value = search[key];
        switch (key){
            case "name":
                if(book.name.indexOf(value) === -1 && book.author.indexOf(value) === -1 && book.description.indexOf(value) === -1) {

                    isOk = false;
                }
                break;
            case "type":
                if(book.type !== String(value) && value != null && book.type != null){
                    isOk = false;
                }
                break;
            case "distribute":
                if(book.distribute !== value){
                    isOk = false;
                }
                break;
            case "dynasty":
                if(book.dynasty !== value){
                    isOk = false;
                }
                break;
            case "isFinished":
                if(book.isFinished !== value){
                    isOk = false;
                }
                break;
            case "keywords":
                if(book.keywords.indexOf(value) === -1){
                    isOk =false;
                }
                break;
            case "isFree":
                if(book.isFree !== value){
                    isOk = false;
                }
                break;
            case "latestChapter":
                if(book.latestChapter < value){
                    isOk = false;
                }
                break;
            case "sanshi":
                if(book.numbers >= value){
                    isOk= false;
                }
                break;
            case "wushi":
                if(book.numbers >= value || book.numbers < 300000){
                    isOk = false;
                }
                break;
            case "yibai":
                if(book.numbers >= value || book.numbers < 500000){
                    isOk = false;
                }
                break;
            case "liangbai":
                if(book.numbers >= value || book.numbers < 1000000){
                    isOk = false;
                }
                break;
            case "wubai":
                if(book.numbers < 2000000){
                    isOk =false;
                }
                break;
            default:

        }
    }
    return isOk;
}

// 书籍类型对应关系
export const booktypes = {
    1:"玄幻",
    2:"奇幻",
    3:"仙侠",
    4:"历史",
    5:"都市",
    6:"科幻",
    7:"军事",
    8:"灵异",
};
//

// 书籍所属地域对应关系
export const distribute = {
    "zhongguo" :"中国",
    "meiguo":"美国",
    "eluosi":"俄罗斯",
    "yingguo0":"英国",
    "faguo":"法国",
    "deguo":"德国",
    "riben":"日本",
    "jianada":"加拿大",
};

// 书籍所属朝代对应关系
export const dynasty = {
    "xiachao":"夏朝",
    "shangchao":"商朝",
    "zhouchao":"周朝",
    "qinchao":"秦朝",
    "hanchao":"汉朝",
    "jinchao":"晋朝",
    "suichao":"隋朝",
    "tangchao":"唐朝",
    "songchoa":"宋朝",
    "yuanchao":"元朝",
    "mingchao":"明朝",
    "qingchao":"清朝",
    "mingguo":"民国",
};

// 关键字对应关系
export  const keywords = {
    9:"热血",
    10:"重生",
    11:"豪门",
    12:"孤儿",
    13:"盗贼",
    14:"特种兵",
    15:"特工",
    16:"黑客",
    17:"明星",
};
