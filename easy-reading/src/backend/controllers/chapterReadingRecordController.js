let poolModule = require('./pool');
let pool = poolModule.pool;
let ChapterReadingRecordSQL = poolModule.ChapterReadingRecordSQL;

// 添加一条章节阅读记录
exports.addReadingRecord = (req,res) => {
    console.log(req.body);
    let id = Date.now();
    let {chapterId,bookId,userId,startTime,endTime} = req.body;
    pool.query(ChapterReadingRecordSQL.insert,[id,chapterId,bookId,userId,startTime,endTime], (err, row)=>{
        if (err){
            res.send(err);
            throw err;
        }
        // 没必要同时向user_chapter_reading_record表中插入一条记录
        // 之前类似的操作也可以去掉
        res.send({id:id});
        res.end();
    });
};

// 更新一条章节阅读记录
exports.updateReadingRecord = (req,res) => {
    console.log(req.body);
    let {id,endTime} = req.body;
    pool.query(ChapterReadingRecordSQL.update,[endTime,id], (err, row)=>{
        if (err){
            res.send(err);
            throw err;
        }
        res.send(true);
        res.end();
    });
};
