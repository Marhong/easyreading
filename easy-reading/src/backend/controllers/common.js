let poolModule = require('./pool');
let pool = poolModule.pool;
let BookSQL = poolModule.BookSQL;
let BookTypesSQL = poolModule.BookTypesSQL;
let BookTypeSQL = poolModule.BookTypeSQL;
let VolumeSQL = poolModule.VolumeSQL;
let ChapterSQL = poolModule.ChapterSQL;
let VolumeChaptersSQL = poolModule.VolumeChaptersSQL;
let BookVolumesSQL = poolModule.BookVolumesSQL;
let fs = require('fs');
let readline = require('readline');
let chardet = require('chardet');
let jschardet = require('jschardet');
let encoding = require('encoding');
// 解析表单后将数据插入数据库
exports.parseUploadBookCallBack = async (err,res,book) =>{

    // 将book对象属性值插入数据库
      pool.query(BookSQL.insert,[book.id,book.userId,book.author,book.distribute,book.dynasty,book.name,book.startTime,book.description,
              book.clickNumbers,book.isFinished,book.keywords,book.preface,book.latestChapter,book.isValid,book.isFree,book.imgUrl,book.fileUrl,book.type,book.numbers,book.firstChapter,book.memberClickNumbers]
          ,(err,rows) => {
              if(err){
                  res.send(err);
                  throw err;
              }
              // 如果成功插入书籍，则应该在book_types表中插入插入相应的数据
              // 章节的volumeList应该放在后面，去插入，章节的latestChapter应该放在后面去插入.
              let booktypes = `${book.type},${book.keywords}`;
              for(let bookType of booktypes.split(",")){
                  pool.query(BookTypesSQL.insert,[book.id,bookType],(err) => {
                      if(err){
                          res.send(err);
                          throw err;
                      }
                      // 同时要更新对应类型书籍的userTimes
                      pool.query(BookTypeSQL.updateUseTimes,[bookType],(err) => {
                          if(err){
                              res.send(err);
                              throw err;
                          }

                      })
                  })
              }
              res.send(true);

          });
      analyseTxtFile(res,book.fileUrl,book.id);
}
async function analyseTxtFile(res,url,bookId) {
    // 创建文件读取流。一次最多可读取64M。设置读取流的编码方式为utf-8
     let fRead = fs.createReadStream(url,{highWaterMark:65536});
     fRead.setEncoding("utf-8");
    // 根据文件读取流创建逐行读取数据接口
     let objReadline = readline.createInterface({
         input: fRead
     });
        // 匹配卷的正则表达式
        let volume = /^第([0-9|一二三四五六七八九十百千万]+)?(.[卷集部])/;
        // 匹配章节的正则表达式
        let chapter = /^第([0-9|一二三四五六七八九十百千万]+)?(.[章篇回节])/;

        let volumeList = []; // 卷列表
        let chapterList = []; // 章节列表
        let volumeIndex = 0;  // 卷索引
        let chapterIndex = 0; // 章节索引
        let curVolume = null; // 当前卷
        let curChapter = null; // 当前章节
        let numbers = 0; // 书籍总字数
     // 开始逐行读取数据
     objReadline.on('line', function (lineText) {
         let line = lineText.trim();
         // 去掉空白行
         if(line.length >0 ){

             let volumeResult = volume.exec(line);
             let chapterResult = chapter.exec(line);
             if(volumeResult != null){

                 let newVolumeId =0;
                 if(curVolume != null){
                     newVolumeId = curVolume.id +1;
                 }else{
                     newVolumeId = Date.now();
                 }
                 let newVolume = {id:newVolumeId,bookId:bookId,name:volumeResult.input,isFree:true,startTime:Date.now(),numbers:0};
                 volumeList[volumeIndex] = newVolume;
                 curVolume = newVolume;
                 volumeIndex ++;

             }else if(chapterResult != null){
                 if(curVolume == null) {
                     curVolume = {};
                    curVolume.id = Date.now();
                    curVolume.name = "第一卷";
                    curVolume.bookId = bookId;
                    curVolume.isFree = true;
                    curVolume.startTime = Date.now();
                    curVolume.numbers = 0;
                    volumeList[volumeIndex] = curVolume;
                 }
                 let newChapterId =0;
                 if(curChapter != null){
                     newChapterId = curChapter.id +1;
                 }else{
                     newChapterId = Date.now();
                 }
                     let newChapter = {id:newChapterId,bookId:bookId,volumeId:curVolume.id,name:chapterResult.input,numbers:0,isFree:true,time:Date.now(),content:"",link:""};
                     curChapter = newChapter;
                     chapterList[chapterIndex] = newChapter;
                     chapterIndex ++;


             }else  if(curChapter != null){
               {
                    curChapter.content += "<p>"+line+"</p>";
                    let length = line.length;
                    curChapter.numbers += length;
                    curVolume.numbers += length;
                    numbers += length;
                }

             }
         }

     });
     objReadline.on('close', function () {
         console.log(volumeList.length ,chapterList.length);
        // 解析完txt文件后，将相应数据插入数据库
         if(chapterList.length > 0){
             insertBookData(res,volumeList,chapterList,numbers,bookId);
         }else{
             pool.query(BookSQL.delete,[bookId],(err,row)=>{
                 if(err) throw err;
             })
         }

     });
}
// 将volume、chapter、volumeChapters、bookVolumes插入数据库，修改book的numbers和latestChapter
async function insertBookData(res,volumeList,chapterList,numbers,bookId){
    // 将volume插入数据库
    for(let i=0,len=volumeList.length;i<len;i++){
        let volume = volumeList[i];
        pool.query(VolumeSQL.insert,[volume.id,bookId,volume.name,volume.isFree,volume.startTime,volume.numbers],(err) =>{
            if(err){
                res.send(err);
                throw err;
            }
            // 每插入一个volume,就插入一个bookVolumes
            pool.query(BookVolumesSQL.insert,[bookId,volume.id],(err) => {
                if(err){
                    res.send(err);
                    throw err;
                }
            })
        })
    }
    // 将chapter插入数据库
    for(let i=0,len=chapterList.length;i<len;i++){
        let chapter = chapterList[i];
        pool.query(ChapterSQL.insert,[chapter.id,chapter.volumeId,bookId,chapter.name,chapter.numbers,chapter.link,chapter.isFree,chapter.time,chapter.content],(err)=>{
            if(err){
                throw err;
            }
            // 每插入一个chapter,就插入一个volumeChapters
            pool.query(VolumeChaptersSQL.insert,[chapter.volumeId,chapter.id],(err) =>{
                if(err){
                    res.send(err);
                    throw err;
                }
            })
        })
    }
    // update书籍的number和latestChapter
    pool.query(BookSQL.updateNumbersAndLatestChapter,[numbers,chapterList[chapterList.length-1].id,chapterList[0].id,bookId],(err) => {
        if(err){
            res.send(err);
            throw err;
        }
    })
}
// 将文件编码格式转为utf-8
exports.changeEncoding=(fileName) => {
    let filePath = fileName;
    let stats = fs.statSync(filePath);

    if (stats.isFile()) {
        let buff = fs.readFileSync(filePath);
        if (buff.length && buff[0].toString(16).toLowerCase() == "ef" && buff[1].toString(16).toLowerCase() == "bb" && buff[2].toString(16).toLowerCase() == "bf") {
            //EF BB BF 239 187 191
            console.log('\n发现BOM文件：', filePath, "\n");

            buff = buff.slice(3);
            fs.writeFile(filePath, buff.toString(), "utf8", function(err, written, buffer) {});
        }

        // { encoding: 'UTF-8', confidence: 0.99 }
        // var charset = chardet.detectFileSync(filePath);
        let info = jschardet.detect(buff);

        if (info.encoding === "GB2312" || info.encoding === "ascii") {
            let resultBuffer = encoding.convert(buff, "UTF-8", info.encoding);
            fs.writeFile(filePath, resultBuffer, "utf8", function(err, written, buffer) {});
        }
        else if (info.encoding !== "UTF-8" && chardet.detectFileSync(filePath) !== "UTF-8")
        {
            if (buff.toString().indexOf("\r\n") > -1)
            {
                let resultBuffer = encoding.convert(buff, "UTF-8", "GBK");
                fs.writeFile(filePath, resultBuffer, "utf8", function(err, written, buffer) {});
            }
        }
    }
}


/**数组根据数组对象中的某个属性值进行排序的方法
 * 使用例子：newArray.sort(sortBy('number',false)) //表示根据number属性降序排列;若第二个参数不传递，默认表示升序排序
 * @param attr 排序的属性 如number属性
 * @param rev true表示升序排列，false降序排序
 * */
exports.sortBy = (attr,rev) =>{
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

// 将毫秒转为天 时 分 秒的格式
exports.formatDuring = (mss) => {
    let  days = parseInt(mss / (1000 * 60 * 60 * 24));
    days = days > 0 ? days+"天" : "";
    let hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    hours = hours > 0 ? hours+"小时" : "";
    let minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    minutes = minutes > 0 ? minutes+"分钟" : "";
    let seconds = (mss % (1000 * 60)) / 1000;
    seconds = seconds > 0 ? Math.ceil(seconds)+"秒" : "";
    return days +  hours  + minutes  + seconds ;
};


// 书籍类型对应关系
exports.booktypes = {
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
exports.distribute = {
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
exports.dynasty = {
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