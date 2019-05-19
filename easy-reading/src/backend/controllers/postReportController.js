let poolModule = require('./pool');
let pool = poolModule.pool;
let PostReportSQL = poolModule.PostReportSQL;

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