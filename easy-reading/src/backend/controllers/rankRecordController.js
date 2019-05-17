let poolModule = require('./pool');
let pool = poolModule.pool;
let RankRecordSQL = poolModule.RankRecordSQL;
let BookRankRecordsSQL = poolModule.BookRankRecordsSQL;
let UserRanksSQL = poolModule.UserRanksSQL;
// 向rank_record表中插入或者更新一条记录
exports.addOrUpdateRankRecord = (req,res) =>{
    let id= Date.now();
    let {userId,bookId,score} =req.body;
    let time = Date.now();
    pool.query(RankRecordSQL.selectAllRecordByBookId,[bookId], (err, rows)=>{
        if (err){
            res.send(false);
            throw err;
        }
        let isExist = false;
        let oldScore = 0; // 旧的评分
        if(rows.length > 0){
            // 先判断该用户是否已经给该书评分过，没有就插入一条新记录，有就更新分值
            for(let i=0,len=rows.length;i<len;i++){
                let record = rows[i];

                // 评分过，更新
                if(record.userId === Number(userId)){
                    oldScore = record.score;
                    isExist = true;
                    break;
                }
            }
        }

        if(!isExist){
            pool.query(RankRecordSQL.insert,[id,bookId,userId,score,time], (err, rows)=> {
                    if (err) {
                        res.send(false);
                        throw err;
                    }
                    // 同时向book_rank_records中插入一条记录
                    pool.query(BookRankRecordsSQL.insert,[bookId,id], (err, rows)=> {
                        if (err) {
                            res.send(false);
                            throw err;
                        }
                        // 还要向user_ranks插入一条记录
                        pool.query(UserRanksSQL.insert,[userId,id], (err, rows)=> {
                            if (err) {
                                res.send(false);
                                throw err;
                            }
                            res.send({code:200});
                        })
                    })
                })
        }else{
            pool.query(RankRecordSQL.updateScore,[score,userId], (err, rows)=> {
                    if (err) {
                        res.send(false);
                        throw err;
                    }
                    res.send({code:300,oldScore:oldScore});
                }
            )
        }


    });
};