let poolModule = require('./pool');
let pool = poolModule.pool;
let BookReportSQL = poolModule.BookReportSQL;

// 添加一条书籍举报记录
exports.addBookReport = (req,res) =>{
    let id = Date.now();
    let {userId,bookId,userName,bookName,content,time,reportedUserId} = req.body;
    console.log(req.body);
    // 向post表中插入一条数据
    pool.query(BookReportSQL.insert,[id,userId,bookId,userName,bookName,content,time,reportedUserId], (err, rows)=>{
        if (err){
            res.send(false);
            throw err;
        }
        res.send({id:id});
        res.end();
    });
};