let poolModule = require('./pool');
let pool = poolModule.pool;
let CollectRecordSQL = poolModule.CollectRecordSQL;

// 添加一条书籍收藏记录
exports.addCollectRecord = (req,res) => {
    console.log(req.body);
    let id = Date.now();
    let {bookId,userId,time} = req.body;
    pool.query(CollectRecordSQL.selectByUserAndBookId,[userId,bookId],(err,rows) => {
        if(err) throw err;
        if(rows.length > 0){
            // 如果收藏过，就返回false
            res.send(false);
            res.end();
        }else{
            // 如果之前没有收藏过
            pool.query(CollectRecordSQL.insert,[id,userId,bookId,time], (err, rows)=>{
                if (err){
                    res.send(err);
                    throw err;
                }
                // 没必要同时向user_collects表中插入一条记录
                // 之前类似的操作也可以去掉
                res.send(true);
                res.end();
            });
        }
    });

};

// 通过id删除一条收藏记录
exports.deleteRecord = (req,res) => {

    pool.query(CollectRecordSQL.delete,[req.body.id],(err)=>{
        if(err) throw err;
        res.send(true);
        res.end();
    })
};
// 通过userId获取所有收藏书籍
exports.getAllByUserId = (req,res) =>{
    pool.query(CollectRecordSQL.selectAllByUserId,[req.params.userId],(err,rows) => {
        if(err) throw err;
        let records =[];
        let index=0,recordsLength= rows.length;
        if(recordsLength>0){
            for(let item of rows) {
                let record = item;
                record.key = record.id;
                records.push(record);
                index++;
                if (index === recordsLength) {
                    res.send(records);
                    res.end();
                }
            }
        }else{
            res.send(false);
            res.end();
        }

    })
};