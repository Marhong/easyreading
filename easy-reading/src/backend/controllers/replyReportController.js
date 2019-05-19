let poolModule = require('./pool');
let pool = poolModule.pool;
let ReplyReportSQL = poolModule.ReplyReportSQL;

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