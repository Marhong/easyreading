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
    console.log("接收到了请求")
    pool.query(ReplyReportSQL.selectAll,(err,rows) => {
        if(err) throw err;
        for(let item of rows){
            item.key = item.id;
            item.reportedReply = item.replyContent;
            item.reportReason = item.content;
            item.invalidUser = item.reportedUserName;
            item.whistleBlower = item.userName;
            item.reportTime = moment(item.time).format('YYYY-MM-DD HH:mm:ss');
            console.log(item);
        }
        res.send(rows);
        res.end();
    })
};