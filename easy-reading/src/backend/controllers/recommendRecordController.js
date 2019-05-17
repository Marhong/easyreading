let poolModule = require('./pool');
let pool = poolModule.pool;
let BookRecomendRecordsSQL = poolModule.BookRecomendRecordsSQL;
let RecomendRecordSQL = poolModule.RecomendRecordSQL;
let UserRecommendsSQL = poolModule.UserRecommendsSQL;


// 用户点击推荐按钮，向recommend_record中插入一条记录
exports.addRecommendRecord = (req,res) =>{
    let id= Date.now();
    let {userId,bookId} =req.body;
    let time = Date.now();
    pool.query(RecomendRecordSQL.insert,[id,userId,bookId,time], (err, rows)=>{
        if (err){
            res.send(false);
            throw err;
        }
        // 向book_recommend_records中插入一条记录
        pool.query(BookRecomendRecordsSQL.insert,[bookId,id], (err, rows)=> {
                if (err) {
                    res.send(false);
                    throw err;
                }
                // 还要向user_recommends插入一条记录
                pool.query(UserRecommendsSQL.insert,[userId,id], (err, rows)=> {
                    if (err) {
                    res.send(false);
                    throw err;
                    }
                 res.send(true);
                 })
            }
        )

    });
};
