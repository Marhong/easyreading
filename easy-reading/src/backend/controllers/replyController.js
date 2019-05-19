let poolModule = require('./pool');
let pool = poolModule.pool;
let ReplySQL = poolModule.ReplySQL;
let BookSQL = poolModule.BookSQL;
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


// 通过useId获取所有评论数据
exports.getAllReplysByUserId = (req,res) =>{
    pool.query(ReplySQL.selectAllByUserId,[req.params.userId],(err,rows) => {
        if(err) throw err;
        let replys =[];
        let index=0,replyLength= rows.length;
        if(rows.length>0){
        for(let item of rows){
            let reply = item;
            reply.key = reply.id;
            reply.post = reply.postTitle;
            reply.replyContent = reply.content;
            reply.latReplyTime = moment(reply.time).format('YYYY-MM-DD HH:mm:ss');

            pool.query(BookSQL.selectOneBook,[reply.bookId],(err,rows)=>{
                if(err) throw err;
                reply.bookName = rows[0].name;
                console.log(reply);
                replys.push(reply);
                index++;
                if(index === replyLength){
                    res.send(replys);
                    res.end();
                }
            })
        }

        }else{
            res.send(false);
            res.end();
        }

    })
};
// 根据id删除某条评论
exports.deleteReply = (req,res) =>{
    pool.query(ReplySQL.delete,[req.body.id],(err,rows) => {
        if(err) throw err;
        res.send(true);
        res.end();})
};