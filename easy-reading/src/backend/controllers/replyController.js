let poolModule = require('./pool');
let pool = poolModule.pool;
let ReplySQL = poolModule.ReplySQL;
let moment = require('moment');
// 发布一条评论
exports.addReply = (req,res) =>{
    let id = Date.now();
    let {bookId,userId,content,time,postId,anotherUserId,userName,postTitle} = req.body;
    // 向post表中插入一条数据
    pool.query(ReplySQL.insert,[id,userId,postId,anotherUserId,content,time,bookId,userName,postTitle], (err, rows)=>{
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


// 获取所有评论数据
exports.getAllReplys = (req,res) => {

    pool.query(ReplySQL.selectAll,(err,rows) => {
        if(err) throw err;
        for(let item of rows){
            item.key = item.id;
            item.belongedPost = item.postTitle;
            item.name = item.userName;
            item.replyTime = moment(item.time).format('YYYY-MM-DD HH:mm:ss');
        }
        res.send(rows);
        res.end();})
};