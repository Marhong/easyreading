let poolModule = require('./pool');
let pool = poolModule.pool;
let PopularRecommendSQL = poolModule.PopularRecommendSQL;
let BookSQL = poolModule.BookSQL;
let BookReadingDataSQL = poolModule.BookReadingDataSQL;
const type_numbers = 8; // 书籍类型数
const numbers = 6; // 每种类型书籍推荐数
// 获取所有的book_reading_data
exports.getBooks = (req,res) => {

    let dayStartTime = new Date();
    let dayEndTime = new Date();
    dayStartTime.setHours(0,0,0,0);
    dayEndTime.setHours(23,59,59,999);
    // 获取距离现在
    pool.query(PopularRecommendSQL.selectTodayBooks,[dayStartTime.getTime(),dayEndTime.getTime()], (err, rows)=>{
        if (err){
            res.send(err);
            throw err;
        }
        // 如果今日的热门作品推荐书籍已经生成，直接解析数据然后返回
        if(rows.length > 0){
            let leftData = [];
            let xuanhuanData = [];
            let qihuanData = [];
            let xianxiaData = [];
            let lishiData = [];
            let dushiData = [];
            let kehuanData = [];
            let junshiData = [];
            let lingyiData = [];
            let bookIds =  rows[0].book_ids.split(",");
            let index =0,booksLength = bookIds.length;
            let types = Number(req.params.type_numbers);
            let numbers = Number(req.params.numbers);
            for (let item of bookIds){
                pool.query(BookSQL.selectOneBook,[item],(err,rows)=>{
                    if(err) throw err;
                    let book = rows[0];
                    if(index < types){
                        leftData.push(book);
                    }else if(index < types+(numbers-1)){
                        xuanhuanData.push(book);
                    }else if(index < types+(numbers-1)*2){
                        qihuanData.push(book);
                    }else if(index < types+(numbers-1)*3){
                        xianxiaData.push(book)
                    }else if(index < types+(numbers-1)*4){
                        lishiData.push(book);
                    }else if(index<types+(numbers-1)*5){
                        dushiData.push(book);
                    }else if(index<types+(numbers-1)*6){
                        kehuanData.push(book);
                    }else if(index<types+(numbers-1)*7){
                        junshiData.push(book);
                    }else{
                        lingyiData.push(book);
                    }
                    index++;
                    if(index === booksLength){
                        res.send({leftData:leftData,xuanhuanData:xuanhuanData,qihuanData:qihuanData,xianxiaData:xianxiaData,
                            lishiData:lishiData,dushiData:dushiData,kehuanData:kehuanData,junshiData:junshiData,lingyiData:lingyiData});
                        res.end();
                    }
                })
            }

        }else{
            // 如果还没有生成，就创建，然后插入
            // 从book_reading_data中根据rank排序获取前num的书籍
            let leftData = [];
            let leftDataIds = [];
            let xuanhuanData = [];
            let xuanhuanDataIds = [];
            let qihuanData = [];
            let qihuanDataIds = [];
            let xianxiaData = [];
            let xianxiaDataIds = [];
            let lishiData = [];
            let lishiDataIds = [];
            let dushiData = [];
            let dushiDataIds = [];
            let kehuanData = [];
            let kehuanDataIds = [];
            let junshiData = [];
            let junshiDataIds = [];
            let lingyiData = [];
            let lingyiDataIds = [];
            let types = Number(req.params.type_numbers);
            let numbers = Number(req.params.numbers);
            pool.query(BookReadingDataSQL.selectTypeBooks,(err,rows)=>{
                if(err) throw err;
                if(rows.length > 0) {
                    // 获取不同类型书籍前numbers本的id
                    // 这里用switch还好些，不需要写这么多if
                    for (let item of rows) {
                        let book_id = item.book_id;
                        if (lingyiDataIds.length === numbers) break;
                        if (item.type === "1" && xuanhuanDataIds.length === numbers) continue;
                        if (item.type === "1" && xuanhuanDataIds.length < numbers) {
                            xuanhuanDataIds.push(book_id);
                            continue;
                        }
                        if (item.type === "2" && qihuanDataIds.length === numbers) continue;
                        if (item.type === "2" && qihuanDataIds.length < numbers) {
                            qihuanDataIds.push(book_id);
                            continue;
                        }
                        if (item.type === "3" && xianxiaDataIds.length === numbers) continue;
                        if (item.type === "3" && xianxiaDataIds.length < numbers) {
                            xianxiaDataIds.push(book_id);
                            continue;
                        }
                        if (item.type === "4" && lishiDataIds.length === numbers) continue;
                        if (item.type === "4" && lishiDataIds.length < numbers) {
                            lishiDataIds.push(book_id);
                            continue;
                        }
                        if (item.type === "5" && dushiDataIds.length === numbers) continue;
                        if (item.type === "5" && dushiDataIds.length < numbers) {
                            dushiDataIds.push(book_id);
                            continue;
                        }
                        if (item.type === "6" && kehuanDataIds.length === numbers) continue;
                        if (item.type === "6" && kehuanDataIds.length < numbers) {
                            kehuanDataIds.push(book_id);
                            continue;
                        }
                        if (item.type === "7" && junshiDataIds.length === numbers) continue;
                        if (item.type === "7" && junshiDataIds.length < numbers) {
                            junshiDataIds.push(book_id);
                            continue;
                        }
                        if (item.type === "8" && lingyiDataIds.length === numbers) continue;
                        if (item.type === "8" && lingyiDataIds.length < numbers) {
                            lingyiDataIds.push(book_id);
                        }
                    }
                    // 分别将8种类型的第一个放在leftDataIds中
                    leftDataIds.push(xuanhuanDataIds.shift());
                    leftDataIds.push(qihuanDataIds.shift());
                    leftDataIds.push(xianxiaDataIds.shift());
                    leftDataIds.push(lishiDataIds.shift());
                    leftDataIds.push(dushiDataIds.shift());
                    leftDataIds.push(junshiDataIds.shift());
                    leftDataIds.push(kehuanDataIds.shift());
                    leftDataIds.push(lingyiDataIds.shift());
                    let book_ids = leftDataIds.join(",")+","+xuanhuanDataIds.join(",")+","+qihuanDataIds.join(",")+","+xianxiaDataIds.join(",")+","+lishiDataIds.join(",")+","+dushiDataIds.join(",")+","+junshiDataIds.join(",")+","+kehuanDataIds.join(",")+","+lingyiDataIds.join(",");
                    numbers = Number(req.params.numbers)-1;
                    for(let i=0;i<2;i++){
                        setTimeout(()=>{
                            /*console.log(types,numbers);
                            console.log(leftData.length);
                            console.log(xuanhuanData.length);
                            console.log(qihuanData.length);console.log(xianxiaData.length);console.log(lishiData.length);
                            console.log(dushiData.length);
                            console.log(junshiData.length);console.log(kehuanData.length);console.log(lingyiData.length);*/
                            if(leftData.length === types &&
                                xuanhuanData.length===numbers &&qihuanData.length ===numbers&&xianxiaData.length === numbers&& lishiData.length===numbers &&
                                dushiData.length===numbers&&junshiData.length === numbers&&kehuanData.length===numbers&&lingyiData.length===numbers
                            ){
                               /* console.log(JSON.stringify(leftData));
                                console.log(JSON.stringify(xuanhuanData));*/
                               // 将得到的推荐书籍book_ids插入数据库
                                pool.query(PopularRecommendSQL.insert,[Date.now(),Date.now(),book_ids],(err,rows)=>{
                                    if(err) throw err;
                                    res.send({leftData:leftData,xuanhuanData:xuanhuanData,qihuanData:qihuanData,xianxiaData:xianxiaData,
                                        lishiData:lishiData,dushiData:dushiData,junshiData:junshiData,kehuanData:kehuanData,lingyiData:kehuanData});
                                    res.end();
                                })

                            }
                            for (let i = 0; i < leftDataIds.length; i++) {
                                let id = leftDataIds[i];
                                pool.query(BookSQL.selectOneBook, [id], (err, rows) => {
                                    if (err) throw err;
                                    leftData.push(rows[0]);
                                })
                            }

                            for (let i = 0; i < xuanhuanDataIds.length; i++) {
                                let id = xuanhuanDataIds[i];
                                pool.query(BookSQL.selectOneBook, [id], (err, rows) => {
                                    if (err) throw err;
                                    xuanhuanData.push(rows[0]);
                                })
                            }
                            for (let i = 0; i < qihuanDataIds.length; i++) {
                                let id = qihuanDataIds[i];
                                pool.query(BookSQL.selectOneBook, [id], (err, rows) => {
                                    if (err) throw err;
                                    qihuanData.push(rows[0]);

                                })
                            }
                            for (let i = 0; i < xianxiaDataIds.length; i++) {
                                let id = xianxiaDataIds[i];
                                pool.query(BookSQL.selectOneBook, [id], (err, rows) => {
                                    if (err) throw err;
                                    xianxiaData.push(rows[0]);

                                })
                            }
                            for (let i = 0; i < lishiDataIds.length; i++) {
                                let id = lishiDataIds[i];
                                pool.query(BookSQL.selectOneBook, [id], (err, rows) => {
                                    if (err) throw err;
                                    lishiData.push(rows[0]);

                                })
                            }
                            for (let i = 0; i < dushiDataIds.length; i++) {
                                let id = dushiDataIds[i];
                                pool.query(BookSQL.selectOneBook, [id], (err, rows) => {
                                    if (err) throw err;
                                    dushiData.push(rows[0]);

                                })
                            }
                            for (let i = 0; i < junshiDataIds.length; i++) {
                                let id = junshiDataIds[i];
                                pool.query(BookSQL.selectOneBook, [id], (err, rows) => {
                                    if (err) throw err;
                                    junshiData.push(rows[0]);

                                })
                            }
                            for (let i = 0; i < kehuanDataIds.length; i++) {
                                let id = kehuanDataIds[i];
                                pool.query(BookSQL.selectOneBook, [id], (err, rows) => {
                                    if (err) throw err;
                                    kehuanData.push(rows[0]);

                                })
                            }
                            for (let i = 0; i < lingyiDataIds.length; i++) {
                                let id = lingyiDataIds[i];
                                pool.query(BookSQL.selectOneBook, [id], (err, rows) => {
                                    if (err) throw err;
                                    lingyiData.push(rows[0]);

                                })
                            }
                        },100*i)
                    }


                }
            });

        }
    });
};