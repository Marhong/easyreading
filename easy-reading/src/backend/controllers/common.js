let poolModule = require('./pool');
let pool = poolModule.pool;
let BookSQL = poolModule.BookSQL;
let BookTypesSQL = poolModule.BookTypesSQL;
let BookTypeSQL = poolModule.BookTypeSQL;
// 解析表单后将数据插入数据库
exports.parseUploadBookCallBack = (err,res,book) =>{
    // 将book对象属性值插入数据库
      pool.query(BookSQL.insert,[book.id,book.userId,book.author,book.distribute,book.dynasty,book.name,book.startTime,book.description,
              book.clickNumbers,book.isFinished,book.keywords,book.preface,book.latestChapter,book.isValid,book.isFree,book.imgUrl,book.fileUrl,book.type]
          ,(err,rows) => {
              if(err){
                  res.send(err);
                  throw err;
              }
              // 如果成功插入书籍，则应该在book_types表中插入插入相应的数据
              // 章节的volumeList应该放在后面，去插入，章节的latestChapter应该放在后面去插入.
              let booktypes = `${book.type},${book.keywords}`;
              for(let bookType of booktypes.split(",")){
                  pool.query(BookTypesSQL.insert,[book.id,bookType],(err) => {
                      if(err){
                          res.send(err);
                          throw err;
                      }
                      // 同时要更新对应类型书籍的userTimes
                      pool.query(BookTypeSQL.updateUseTimes,[bookType],(err) => {
                          if(err){
                              res.send(err);
                              throw err;
                          }

                      })
                  })
              }
              res.send(true);
          });
}