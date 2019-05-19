let poolModule = require('./pool');
let pool = poolModule.pool;
let BookReportSQL = poolModule.BookReportSQL;
let moment = require('moment');
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

// 获取所有的书籍举报记录
exports.getAllReports = (req,res) => {
    pool.query(BookReportSQL.selectAll,(err,rows) => {
        if(err) throw err;
        for(let item of rows){
            item.key = item.id;
            item.name = item.bookName;
            item.reportedReason = item.content;
            item.whistleBlower = item.userName;
            item.reportTime = moment(item.time).format('YYYY-MM-DD HH:mm:ss');
        }
        res.send(rows);
        res.end();
    })
};

// 根据id删除某条举报信息
exports.deleteReport = (req,res) => {
    pool.query(BookReportSQL.delete,[req.body.id],(err,rows) => {
        if(err) throw err;
        res.send(true);
        res.end();
    })
};
