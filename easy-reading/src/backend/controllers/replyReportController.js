let poolModule = require('./pool');
let pool = poolModule.pool;
let ReplyReportSQL = poolModule.ReplyReportSQL;
let moment = require('moment');
// 添加一条评论举报记录
exports.addReplyReport = (req,res) =>{
    let id = Date.now();
    let {content,replyContent,userId,userName,reportedUserId,reportedUserName,replyId,time,postId} = req.body;
    // 向post表中插入一条数据
    pool.query(ReplyReportSQL.insert,[id,content,replyContent,userId,userName,reportedUserId,reportedUserName,replyId,time,postId], (err, rows)=>{
        if (err){
            res.send(false);
            throw err;
        }
        res.send({id:id});
        res.end();
    });
};

// 获取所有的评论举报记录
exports.getAllReports = (req,res) => {

    pool.query(ReplyReportSQL.selectAll,(err,rows) => {
        if(err) throw err;
        for(let item of rows){
            item.key = item.id;
            item.reportedReply = item.replyContent;
            item.reportReason = item.content;
            item.invalidUser = item.reportedUserName;
            item.whistleBlower = item.userName;
            item.reportTime = moment(item.time).format('YYYY-MM-DD HH:mm:ss');
        }
        res.send(rows);
        res.end();
    })
};

// 根据id删除某条评论举报信息
exports.deleteReport = (req,res) =>{

    pool.query(ReplyReportSQL.delete,[req.body.id],(err,rows) => {
        if(err) throw err;
        res.send(true);
        res.end();
    })
};


// 根据replyId删除对应的所有举报信息
exports.deleteAllByReplyId = (req,res) =>{
    pool.query(ReplyReportSQL.deleteAllByReplyId,[req.body.id],(err,rows) => {
        if(err) throw err;
        res.send(true);
        res.end();
    })
};