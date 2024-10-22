let poolModule = require('./pool');
let pool = poolModule.pool;
let PostReportSQL = poolModule.PostReportSQL;
let moment = require('moment');
// 添加一条帖子举报记录
exports.addPostReport = (req,res) =>{
    let id = Date.now();
    let {postId,userId,content,postTitle,userName,reportedUserName,reportedUserId,time} = req.body;
    console.log(req.body);
    // 向post表中插入一条数据
    pool.query(PostReportSQL.insert,[id,postId,userId,content,postTitle,userName,reportedUserName,reportedUserId,time], (err, rows)=>{
        if (err){
            res.send(false);
            throw err;
        }
        res.send({id:id});
        res.end();
    });
};

// 获取所有的帖子举报记录
exports.getAllReports = (req,res) => {

    pool.query(PostReportSQL.selectAll,(err,rows) => {
        if(err) throw err;
        for(let item of rows){
            item.key = item.id;
            item.reportedPost = item.postTitle;
            item.reportReason = item.content;
            item.whistleBlower = item.userName;
            item.invalidUser = item.reportedUserName;
            item.reportTime = moment(item.time).format('YYYY-MM-DD HH:mm:ss');
        }
        res.send(rows);
        res.end();
    })
};

// 根据id删除某条评论举报信息
exports.deleteReport = (req,res) =>{
    pool.query(PostReportSQL.delete,[req.body.id],(err,rows) => {
        if(err) throw err;
        res.send(true);
        res.end();
    })
};

// 根据postId删除对应的所有举报信息
exports.deleteAllByPostId = (req,res) =>{
    pool.query(PostReportSQL.deleteAllByPostId,[req.body.id],(err,rows) => {
        if(err) throw err;
        res.send(true);
        res.end();
    })
};