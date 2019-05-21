let poolModule = require('./pool');
let pool = poolModule.pool;
let HeavyRecommendSQL = poolModule.HeavyRecommendSQL;
let BookSQL = poolModule.BookSQL;
let BookReadingDataSQL = poolModule.BookReadingDataSQL;
// 获取所有的book_reading_data
exports.getBooks = (req,res) => {

    let dayStartTime = new Date();
    let dayEndTime = new Date();
    dayStartTime.setHours(0,0,0,0);
    dayEndTime.setHours(23,59,59,999);
    // 获取距离现在
       pool.query(HeavyRecommendSQL.selectTodayBooks,[dayStartTime.getTime(),dayEndTime.getTime()], (err, rows)=>{
           if (err){
               res.send(err);
               throw err;
           }
           // 如果今日的重磅推荐书籍已经生成，直接解析数据然后返回
           if(rows.length > 0){
                let books = [];
                let bookIds =  rows[0].book_ids.split(",");
                let index =0,booksLength = bookIds.length;
                for (let item of bookIds){
                    pool.query(BookSQL.selectOneBook,[item],(err,rows)=>{
                        if(err) throw err;
                        books.push(rows[0]);
                        index++;
                        if(index === booksLength){
                            res.send(books);
                            res.end();
                        }
                    })
                }

           }else{
               // 如果还没有生成，就创建，然后插入
               // 从book_reading_data中根据rank排序获取前num的书籍
               let book_ids = "";
               let books =[];
               pool.query(BookReadingDataSQL.selectSome,[Number(req.params.num)],(err,rows)=>{
                   if(err) throw err;
                   if(rows.length>0){
                       let index =0,booksLength = rows.length;
                       for(let i=0;i<booksLength;i++){
                           let id = rows[i].book_id;
                           pool.query(BookSQL.selectOneBook,[id],(err,rows)=>{
                               if(err) throw err;
                               if(index === booksLength-1){
                                   book_ids += id;
                               }else{
                                   book_ids += id+",";
                               }
                               books.push(rows[0]);
                               index++;
                               if(index === booksLength){
                                   // 将获取的book_ids插入到heavy_recommend中去
                                   pool.query(HeavyRecommendSQL.insert,[Date.now(),Date.now(),book_ids],(err,rows)=>{
                                       if(err) throw err;
                                       res.send(books);
                                       res.end();
                                   });
                               }
                           })
                       }
                   }
               });

           }
       });
};