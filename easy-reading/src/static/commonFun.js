
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
};