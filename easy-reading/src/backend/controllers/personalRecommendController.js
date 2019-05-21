let poolModule = require('./pool');
let pool = poolModule.pool;
let PersonalRecommendSQL = poolModule.PersonalRecommendSQL;
let BookSQL = poolModule.BookSQL;
let BookReadingDataSQL = poolModule.BookReadingDataSQL;
let ChapterReadingRecordSQL = poolModule.ChapterReadingRecordSQL;
let PopularRecommendSQL = poolModule.PopularRecommendSQL;
let sortBy = require('./common').sortBy;
const maxRecommendBooks = 10; // 最大书籍数目
const type_numbers = 6; // 不同类型书籍推荐数目
// 获取所有的book_reading_data
exports.getBooks = (req,res) => {

    let dayStartTime = new Date();
    let dayEndTime = new Date();
    dayStartTime.setHours(0,0,0,0);
    dayEndTime.setHours(23,59,59,999);
    let id = Number(req.params.id);
    let num = Number(req.params.num);
    // 获取距离现在
    pool.query(PersonalRecommendSQL.selectTodayBooks,[dayStartTime.getTime(),dayEndTime.getTime(),id], (err, rows)=>{
        if (err){
            res.send(err);
            throw err;
        }
        // 如果今日的个性化推荐书籍已经生成，直接解析数据然后返回
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
            // 先获取该用户过去一周的章节阅读记录
            let now = Date.now();
            // 推荐的书籍
            let books = [];
            let bookIdList = [];
            pool.query(ChapterReadingRecordSQL.selectAllByUserId,[id],(err,rows)=>{
                if(err) throw err;
                // 先获取过去一周的阅读记录
                let lastWeekRecords = [];
                let book_ids = [];
                for(let item of rows){
                    // 判断该条记录是否为一周内的记录
                    if(item.startTime > (now-1000*60*60*24*7) && item.endTime > item.startTime){
                        lastWeekRecords.push(item);
                        // 再从这一周的阅读记录中算出各本书籍的阅读总时长
                        if(book_ids.indexOf(item.bookId) === -1){
                            let dataItem = {};
                            dataItem.bookId = item.bookId;
                            dataItem.totalTime = item.endTime - item.startTime;
                            book_ids.push(dataItem);
                        }else{
                            for(let dataItem of book_ids){
                                if(dataItem.bookId === item.bookId){
                                    dataItem.totalTime += item.endTime - item.startTime;
                                    break;
                                }
                            }
                        }
                    }
                }

                // 然后确定总时长最大的书籍为标准书籍
                book_ids.sort(sortBy('totalTime',false));
                let principalBook;
                // 最后根据标准书籍推荐同作者、同类型的书
                pool.query(BookSQL.selectOneBook,[book_ids[0].bookId],(err,rows)=>{
                    if(err) throw err;
                    principalBook = rows[0];
                 /*   console.log(JSON.stringify(rows[0]));*/
                });
                for(let i=0;i<2;i++){
                    setTimeout(()=>{
                        // 获取到了标准书籍信息后，获取同作者、同类型的书
                        if(principalBook != null){
                            pool.query(BookSQL.selectBooksByAuthor,[principalBook.author],(err,rows)=>{
                                if(err) throw err;
                                // 如果该作者只有这一本书，那么返回的rows长度就为1
                                if(rows.length > 1){
                                    for(let item of rows){
                                        bookIdList.push(item.id);
                                    }
                                }
                                // 从popular_recommend表中获取与标准类型书籍相同的书籍
                                pool.query(PopularRecommendSQL.selectTodayBooks,[dayStartTime.getTime(),dayEndTime.getTime()], (err, rows)=>{
                                    if (err){
                                        res.send(err);
                                        throw err;
                                    }

                                    if(rows.length > 0){
                                        let bookIds =  rows[0].book_ids.split(",");
                                        for(let item of bookIdList){
                                            if(bookIds.indexOf(String(item)) === -1){
                                                bookIds.unshift(String(item));
                                            }
                                        }
                                         bookIdList = [];
                                         let index =0,booksLength = bookIds.length;
                                        for (let item of bookIds){
                                            pool.query(BookSQL.selectOneBook,[Number(item)],(err,rows)=>{
                                                if(err) throw err;
                                                if(rows.length >0 && rows[0].type === principalBook.type){
                                                    books.push(rows[0]);
                                                    bookIdList.push(item);
                                                    index++;
                                                    // 如果达到最大推荐书籍数目maxRecommendBooks或者不同类型推荐数type_numbers就返回
                                                    if(index === maxRecommendBooks || index === type_numbers){
                                                        console.log(JSON.stringify(books),bookIdList);
                                                        // 将今日个性化推荐记录插入数据库
                                                        pool.query(PersonalRecommendSQL.insert,[Date.now(),Number(req.params.id),bookIdList.join(","),Date.now()],(err,rows)=>{
                                                            if(err) throw err;
                                                            res.send(books);
                                                            res.end();
                                                        });

                                                    }
                                                }
                                            })
                                        }

                                    }});
                            });
                        }
                    },100*i)
                }

            })
            // 如果还没有生成，就创建，然后插入
            // 从book_reading_data中根据rank排序获取前num的书籍
            /*  let book_ids = "";
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
                            /!*  if(index === booksLength){
                                  // 将获取的book_ids插入到heavy_recommend中去
                                  pool.query(HeavyRecommendSQL.insert,[Date.now(),Date.now(),book_ids],(err,rows)=>{
                                      if(err) throw err;
                                      res.send(books);
                                      res.end();
                                  });
                              }*!/
                          })
                      }
                  }
              });*/

        }
    });
};