let poolModule = require('./pool');
let pool = poolModule.pool;
let SearchRecordSQL = poolModule.SearchRecordSQL;
// 添加一条搜索记录
exports.addRecord = (req,res) => {

    let id = Date.now();

     let {userId,name,type,distribute,dynasty,isFinished,isFree,numbers,latestChapter,keywords} = req.body;
     if(name == null){
         name ="*";
     }
     if(type == null){
         type =0;
     }
     if(distribute == null){
         distribute = "*";
     }
     if(dynasty == null){
         dynasty = "*";
     }
     if(isFinished == null){
         isFinished = 1;
     }
     if(isFree == null){
         isFree = 1;
     }
     if(numbers == null){
         numbers =0;
     }
     if(latestChapter == null){
         latestChapter =0;
     }
     if(keywords ==null){
         keywords =0;
     }
     if(type == null){
         type = 0;
     }
    pool.query(SearchRecordSQL.insert,[id,userId,name,type,distribute,dynasty,isFinished,isFree,numbers,latestChapter,keywords], (err, row)=>{
        if (err){
            res.send(err);
            throw err;
        }
        // 没必要同时向user_searchs表中插入一条记录
        // 之前类似的操作也可以去掉
        res.send({id:id});
        res.end();
    });
};