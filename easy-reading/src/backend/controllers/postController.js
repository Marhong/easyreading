let poolModule = require('./pool');
let pool = poolModule.pool;
let PostSQL = poolModule.PostSQL;
let ReplySQL = poolModule.ReplySQL;
// 通过书籍id获取该书籍的所有post
exports.getAllPostsByBookId = (req,res) =>{

    // 通过bookId从post中获取所有项
    pool.query(PostSQL.selectAllByBookId,[req.params.id], (err, rows)=>{
        if (err){
            res.send(false);
            throw err;
        }
        let posts = [];
        let index=0,postLength=rows.length;
        // 通过postId获取所有的评论
        for(let i=0,len=postLength;i<len;i++){
            let post = rows[i];
            // 通过bookId从post中获取所有项
            pool.query(ReplySQL.selectAllByPostId,[post.id], (err, rows)=>{
                if (err){
                    res.send(false);
                    throw err;
                }
                if(index<postLength){
                    post.postReply = rows;
                    posts.push(post);
                    index++;
                    if(index === postLength){
                        res.send(posts);
                        res.end();
                    }
                }
            });

        }


    });
};

// 发布一条帖子
exports.addPost = (req,res) =>{
    let id = Date.now();
    let {bookId,userId,title,content,time} = req.body;
    // 向post表中插入一条数据
    pool.query(PostSQL.insert,[id,bookId,userId,title,content,time], (err, rows)=>{
        if (err){
            res.send(false);
            throw err;
        }
        res.send({id:id});
        res.end();
    });
};
