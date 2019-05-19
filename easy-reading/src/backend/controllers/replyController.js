let poolModule = require('./pool');
let pool = poolModule.pool;
let ReplySQL = poolModule.ReplySQL;
// 发布一条评论
exports.addReply = (req,res) =>{
    let id = Date.now();
    let {bookId,userId,content,time,postId,anotherUserId} = req.body;
    // 向post表中插入一条数据
    pool.query(ReplySQL.insert,[id,userId,postId,anotherUserId,content,time,bookId], (err, rows)=>{
        if (err){
            res.send(false);
            throw err;
        }
        res.send({id:id});
        res.end();
    });
};

// 通过帖子id获取该帖子所有reply
exports.getAllReplysByPostId = (req,res) =>{

    // 通过bookId从post中获取所有项
    pool.query(ReplySQL.selectAllByPostId,[req.params.id], (err, rows)=>{
        if (err){
            res.send(false);
            throw err;
        }
        res.send(rows);
        res.end();

    });
};