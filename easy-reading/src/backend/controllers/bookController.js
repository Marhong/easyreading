let poolModule = require('./pool');
let pool = poolModule.pool;
let BookSQL = poolModule.BookSQL;
let BookTypesSQL = poolModule.BookTypesSQL;
let BookTypeSQL = poolModule.BookTypeSQL;
let readImage = require("./readImage");
let formidable = require('formidable');
let callback = require('./common').parseUploadBookCallBack;


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
    // 创建上传表单对象
    let form = new formidable.IncomingForm({
        encoding:"utf-8", // 编码格式
        uploadDir:"./public/upload",  //文件上传地址
        keepExtensions:true  //保留后缀
    });
    // 解析表单
    form.parse(req, function(err, fields, files){
        Object.keys(fields).forEach(function(name) {  //文本
           // console.log( name+" : "+fields[name]);
            book[name] = fields[name];
        });
        Object.keys(files).forEach(function(name) {  //文件
            let path = files[name].path;
            //console.log('name:' + name+";file:"+path);
            if(path.split(".")[1] === "txt"){
                book.fileUrl = path
            }else{
                book.imgUrl = path;
            }
        });
        return callback(err,res,book);
    });
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