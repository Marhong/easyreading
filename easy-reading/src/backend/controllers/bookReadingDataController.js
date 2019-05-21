let poolModule = require('./pool');
let pool = poolModule.pool;
let common = require('./common');
let calculateRank = common.calculateRank;
let sortBy =common.sortBy;
let BookReadingDataSQL = poolModule.BookReadingDataSQL;
let BookSQL = poolModule.BookSQL;
let RecomendRecordSQL = poolModule.RecomendRecordSQL;
let CollectRecordSQL = poolModule.CollectRecordSQL;
let PostSQL = poolModule.PostSQL;
let ReplySQL = poolModule.ReplySQL;
let RankRecordSQL = poolModule.RankRecordSQL;
let ChapterReadingRecordSQL = poolModule.ChapterReadingRecordSQL;
// 更新book_reading_data记录
exports.updateBookReadingData = (req,res) => {
    // 先获取所有的books
    let books =[];
    pool.query(BookSQL.selectAllBooks,(err,rows)=>{
        if(err)throw err;
        if(rows.length > 0){
            books = rows;
        }
    });
    // 如果20ms后还没获取到所有书籍认为失败
    for(let i=0;i<3;i++){
        setTimeout(()=>{
            if(books.length > 0){
                for(let item of books){
                    // 获取该书相关的所有推荐记录
                    pool.query(RecomendRecordSQL.selectNumbersByBookId,[item.id],(err,rows)=>{
                        if(err) throw err;
                        if(rows.length>0){
                            item.recommend_numbers = rows[0]["COUNT(id)"];
                        }

                    });
                    // 获取该书相关的所有收藏记录
                    pool.query(CollectRecordSQL.selectNumbersByBookId,[item.id],(err,rows)=>{
                        if(err) throw err;
                        if(rows.length>0){
                            item.collect_numbers = rows[0]["COUNT(id)"];
                        }

                    });
                    // 获取该书相关的所有帖子
                    pool.query(PostSQL.selectNumbersByBookId,[item.id],(err,rows)=>{
                        if(err) throw err;
                        if(rows.length>0){
                            item.post_numbers = rows[0]["COUNT(id)"];
                        }

                    });
                    // 获取该书相关的所有评论
                    pool.query(ReplySQL.selectNumbersByBookId,[item.id],(err,rows)=>{
                        if(err) throw err;
                        if(rows.length>0){
                            item.reply_numbers = rows[0]["COUNT(id)"];
                        }

                    });
                    // 获取该书相关的所有评分记录
                    pool.query(RankRecordSQL.selectNumbersByBookId,[item.id],(err,rows)=>{
                        if(err) throw err;
                        if(rows.length>0){
                            item.rank_numbers = rows[0]["COUNT(id)"];
                        }

                    });
                    // 获取该书相关的章节阅读记录
                    pool.query(ChapterReadingRecordSQL.selectAllByBookId,[item.id],(err,rows)=>{
                        if(err) throw err;
                        let total_time = 0;
                        if(rows.length > 0){
                            for(let item of rows){
                                if(item.endTime > item.startTime){
                                    total_time += item.endTime-item.startTime;
                                }
                            }
                        }
                        item.total_time = total_time;
                    });

                   // console.log(item.recommend_numbers,item.collect_numbers,item.rank_numbers,item.post_numbers,item.reply_numbers,item.total_time)
                }
                // 虽然上面有个for循环，但是里面有数据库查询操作，所以代码会后执行
                // 所以要等recommend_numbers这些属性有了之后才能进行更新操作
                // 获取数据完后，更新数据
                if(books[0].recommend_numbers != null){
                    for(let item of books){
                        item.rank = calculateRank(item);
                        console.log(item.clickNumbers,item.recommend_numbers,item.collect_numbers,item.post_numbers,
                            item.reply_numbers,item.rank_numbers,item.total_time,item.rank,Date.now(),item.id)
                        pool.query(BookReadingDataSQL.update,[item.clickNumbers,item.recommend_numbers,item.collect_numbers,item.post_numbers,
                        item.reply_numbers,item.rank_numbers,item.total_time,item.rank,Date.now(),item.id], (err, row)=>{
                            if (err){
                                res.send(err);
                                throw err;
                            }
                        });
                    }
                }


            }
        },1000*i);
    }

};

// 获取所有的book_reading_data
exports.getAllData = (req,res) => {
 /*   console.log(req.body);
    let {id,endTime} = req.body;
    pool.query(BookReadingDataSQL.update,[endTime,id], (err, row)=>{
        if (err){
            res.send(err);
            throw err;
        }
        res.send(true);
        res.end();
    });*/
};
