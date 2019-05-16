let poolModule = require('./pool');
let pool = poolModule.pool;
let BookSQL = poolModule.BookSQL;
let BookTypesSQL = poolModule.BookTypesSQL;
let BookTypeSQL = poolModule.BookTypeSQL;
let fs = require('fs');
var iconv = require('iconv-lite');
var readline = require('readline');
var chardet = require('chardet');
var jschardet = require('jschardet');
var encoding = require('encoding');
// 解析表单后将数据插入数据库
exports.parseUploadBookCallBack = async (err,res,book) =>{

    // 将book对象属性值插入数据库
      pool.query(BookSQL.insert,[book.id,book.userId,book.author,book.distribute,book.dynasty,book.name,book.startTime,book.description,
              book.clickNumbers,book.isFinished,book.keywords,book.preface,book.latestChapter,book.isValid,book.isFree,book.imgUrl,book.fileUrl,book.type]
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
      analyseTxtFile(book.id,book.fileUrl,book.id);
}
async function analyseTxtFile(id,url,bookId) {
 let fRead = fs.createReadStream(url);
    fRead.setEncoding("utf-8");
     let objReadline = readline.createInterface({
         input: fRead
     });
     let arr = new Array();
        let index =0;
        let volume = /第([0-9|一|二|三|四|五|六|七|八|九|十|百|千|万]+)?[卷|集|部]/;
        let chapter = /第([0-9|一|二|三|四|五|六|七|八|九|十|百|千|万]+)?[章|篇|回|节]/;
        let volumeList = [];
        let chapterList = [];
        let volumeIndex = 0;
        let chapterIndex = 0;
        let curVolume = null;
        let curChapter = null;
        let numbers = 0;
     objReadline.on('line', function (lineText) {
         let line = lineText.trim();
         // 去掉空白行
         if(line.length >0 ){
             let volumeResult = volume.exec(line);
             let chapterResult = chapter.exec(line);
             if(volumeResult != null){
                 let newVolume = {id:Date.now(),bookId:bookId,name:volumeResult.input,isFree:true,startTime:Date.now(),};
                 volumeList[volumeIndex] = newVolume;
                 curVolume = newVolume;
                 volumeIndex ++;

             }else if(chapterResult != null){
                 if(curVolume != null){
                     numbers = 0;
                     let newChapter = {id:Date.now(),bookId:bookId,volumeId:curVolume.id,name:chapterResult.input,numbers:0,isFree:true,time:Date.now(),content:""};
                     curChapter = newChapter;
                     chapterList[chapterIndex] = newChapter;
                     chapterIndex ++;
                 }

             }else  if(curChapter != null){
               {
                    curChapter.content += "<p>"+line+"</p>";
                    curChapter.numbers += line.length;
                }

             }
         }
        /* arr.push(line);*/
         //console.log('line:'+ line);
     });
     objReadline.on('close', function () {
         console.log(volumeList.length ,chapterList.length,chapterIndex);
        console.log(arr.length);
       /*  callback(arr);*/
     });


}
// 将文件编码格式转为utf-8
exports.changeEncoding=(fileName) => {
    let filePath = 'public/upload/'+fileName;
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
