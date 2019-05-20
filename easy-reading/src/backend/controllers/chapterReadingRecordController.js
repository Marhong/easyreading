let poolModule = require('./pool');
let pool = poolModule.pool;
let ChapterReadingRecordSQL = poolModule.ChapterReadingRecordSQL;
let moment = require('moment');
let formatDuring = require('./common').formatDuring;
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

const oneWeekMills = 1000*60*60*24*7;
// 通过userId获取该用户的所有章节阅读记录
exports.getWeekRecord = (req,res) => {

    pool.query(ChapterReadingRecordSQL.selectAllByUserId,[req.params.userId],(err,rows)=>{
        if(err) throw err;
        if(rows.length > 0){

            let weekdata = [];
            // 取值时是根据id倒序排序的，所以最后一条阅读记录为获取的第一条数据
            let firstTime = rows[0].startTime;
            let lastTime = rows[rows.length-1].startTime;
            // 循环读取一周时间内的章节阅读记录
            while(firstTime > lastTime ){
                let endTime = 0;
                if(firstTime - lastTime > oneWeekMills){
                     endTime = firstTime - oneWeekMills;
                }else{
                    endTime = lastTime;
                }
                let item = {};
                item.key = firstTime;
                item.period = moment(endTime).format('YYYY-MM-DD HH:mm:ss')+" 至 "+moment(firstTime).format('YYYY-MM-DD HH:mm:ss');
                let totalTime = 0;
                let weekRecords = [];
                let books = [];
                // 遍历所有阅读记录，找出一周内的阅读总时间
                for(let item of rows){
                    if(item.startTime >= endTime && item.startTime <= firstTime && item.endTime > 0){
                        totalTime += item.endTime - item.startTime;
                        weekRecords.push(item);
                        books.push(item.bookId);
                    }
                }
                item.totalTime = formatDuring(totalTime);
                // 通过set去重，得到一周内阅读的不同书籍数
                let distinctBooks = new Set(books);
                item.num = distinctBooks.size;
                item.books = Array.from(distinctBooks);
                item.weekRecords = weekRecords;
                weekdata.push(item);
                firstTime = endTime;
            }
            res.send(weekdata);
            res.end();
        }else{
            res.send(false);
            res.end();
        }
    })
};
