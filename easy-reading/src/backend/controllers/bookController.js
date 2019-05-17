let poolModule = require('./pool');
let pool = poolModule.pool;
let common = require('./common');
let recommendRecordController =require('./recommendRecordController');
let getRecommendNumbers = recommendRecordController.getRecommendNumbers;
let BookSQL = poolModule.BookSQL;
let BookTypesSQL = poolModule.BookTypesSQL;
let BookTypeSQL = poolModule.BookTypeSQL;
let BookRecomendRecordsSQL = poolModule.BookRecomendRecordsSQL;
let BookRankRecordsSQL = poolModule.BookRankRecordsSQL;
let RankRecordSQL = poolModule.RankRecordSQL;
let readImage = require("./readImage");
let formidable = require('formidable');
let callback = common.parseUploadBookCallBack;
let changeEncoding = common.changeEncoding;
let fs = require('fs');

// 由 POST 处理书籍上传操作
exports.addBook = (req, res) => {
    let book = {};
    book.id = Date.now();
    book.startTime = Date.now();
    book.clickNumbers = 0;
    book.isFinished = true;
    book.latestChapter = 0;
    book.isValid = false;
    book.isFree = true;
    book.fileUrl=0;
    book.imgUrl=0;
    book.numbers = 0;
    // 创建上传表单对象
    let form = new formidable.IncomingForm({
        encoding:"UTF-8", // 编码格式
        uploadDir:"./public/upload",  //文件上传地址
        keepExtensions:true  //保留后缀
    });
    form.encoding = "UTF-8";
    // 解析表单
    form.parse(req, function(err, fields, files){
        Object.keys(fields).forEach(function(name) {  //文本
           // console.log( name+" : "+fields[name]);
            book[name] = fields[name];
        });
        Object.keys(files).forEach(function(name) {  //文件
            let path = files[name].path;
            console.log('name:' + name+";file:"+path);
            console.log(files[name].name);
            let newPath = `public/upload/${files[name].name}`;
            // 好像没必要改名字
            fs.renameSync(path,newPath);
            changeEncoding(files[name].name);
            if(path.split(".")[1] === "txt"){
                book.fileUrl = newPath
            }else{
                book.imgUrl = newPath;
            }

        });

        return callback(err,res,book);
    });
};

// 通过id获取某一书籍
exports.getBookById = (req,res) => {
    pool.query(BookSQL.selectOneBook,[req.params.id], (err, rows)=>{
        if (err){
            res.send(false);
            throw err;
        }
        let book = rows[0];
        // 通过typeId获取type的名字
        pool.query(BookTypeSQL.selectBookTypeById,[book.type],(err,rows)=> {
            if (err) {
                res.send(false);
                throw err;
            }
            book.type = rows[0].name;
            // 书籍的关键字可能有多个，需要遍历查询booktype获取关键字的名字
            let transformed = "";
            let words = book.keywords.split(",");
            let length = book.keywords.split(",").length;
            for (let i = 0; i < length; i++) {

                let item = words[i];
                pool.query(BookTypeSQL.selectBookTypeById, [item], (err, rows) => {
                    if (err) {
                        res.send(false);
                        throw err;
                    }

                    if (i < length - 1) {
                        transformed += rows[0].name + ",";
                    } else {
                        transformed += rows[0].name;
                        book.keywords = transformed;
                        // 获取概书籍推荐次数
                        pool.query(BookRecomendRecordsSQL.selectAllRecommendRecordsByBookId,[book.id], (err, rows)=>{
                            if (err){
                                res.send(false);
                                throw err;
                            }
                            book.recommendNumbers = rows.length;
                            // 获取给该书籍评分的人数
                            pool.query(RankRecordSQL.selectAllRecordByBookId,[book.id],(err,rows)=>{
                                if (err){
                                    res.send(false);
                                    throw err;
                                }
                                book.rankNumbers = rows.length;
                                // 计算书籍评分
                                let sum = 0;
                                for(let i=0,len=rows.length;i<len;i++){
                                    sum += rows[i].score;
                                }
                                book.score = (sum/rows.length).toFixed(1);
                                for(let key of Object.keys(book)){
                                    console.log(key+": "+book[key]);
                                }
                                res.send(book);
                            })

                        });

    /*                    // 获取书籍的所有推荐记录
                        pool.query(BookRecomendRecordsSQL.selectAllRecommendRecordsByBookId, [book.id], (err, rows) => {
                            if (err) {
                                res.send(false);
                                throw err;
                            }
                            book.recommendNumbers = rows.length;
                            console.log("执行了没")
                            pool.query(BookRankRecordsSQL.selectAllRankRecordsByBookId, [book.id], (err, rows) => {
                                if (err) {
                                    res.send(false);
                                    throw err;
                                }
                                // 根据评分记录获取书籍评分人数
                                book.rankNumbers = rows.length;
                                // 根据评分记录计算书籍分值
                                let sum = 0;
                                for (let i=0;i<rows.length;i++) {
                                    pool.query(BookRankRecordsSQL.selectRecordById, [item.rankRecordId], (err, rows) => {
                                            if (err) {
                                                res.send(false);
                                                throw err;
                                            }
                                            if(i<rows.length-1){
                                                sum += rows[0].score;
                                            }else{
                                                book.score = (sum / rows.length).toFixed(1);
                                                for (let key of Object.keys(book)) {
                                                    console.log(key + ": " + book[key]);
                                                }
                                                res.send(book);
                                            }

                                        }
                                    )
                                }

                            })
                        })*/

                    }
                });
            }
        })
})
};
// GET 获取照片
exports.getImageByUrl = (req,res) => {
    console.log(req.params.url);
    if (req.params.url !=="favicon.ico") {
        //res.write('hello,world');//不能向客户端输出任何字节,否则会影响图片的输出
        readImage.readImage(`./public/upload/${req.params.url}`, res); //如果文件路径存在则添加数据，如果不存在则新建文件并且添加数据
        console.log("继续执行");
        //res.end('end'); 在 readImage.readImage方法中已经写过了
    }
};

// 由 POST 处理书籍删除操作
exports.book_delete_post = (req, res) => { res.send('未实现：删除作者的 POST'); };

// 由 POST 处理书籍更新操作
exports.book_update_post = (req, res) => { res.send('未实现：更新作者的 POST'); };