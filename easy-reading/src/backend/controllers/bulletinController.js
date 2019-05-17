let poolModule = require('./pool');
let pool = poolModule.pool;
let BulletinSQL = poolModule.BulletinSQL;
let UserSQL = poolModule.UserSQL;
let moment = require('moment');
// 添加一条公告
exports.addBulletin = (req,res) => {
    let id = Date.now();
    let type = "资讯";
    let {userId,title,content,time} = req.body;
    pool.query(BulletinSQL.insert,[id,userId,title,content,type,time], (err, row)=>{
        if (err){
            res.send(err);
            throw err;
        }
        res.send({bulletin:{id:id,userId:userId,type:"资讯",title:title,content:content,time:time}});
    });
};
// 获取所有公告
exports.getAllBulletins = (req,res) => {
    let allBulletins = [];
    pool.query(BulletinSQL.selectAll,(err, rows)=>{
        if (err){
            res.send(err);
            throw err;
        }
        let length = rows.length;
        let index =1;
        for(let bulletin of rows){

            let item = {};
            item.key = bulletin.id;
            item.title = bulletin.title;
            item.content = bulletin.content;
            item.publishTime = moment(bulletin.time).format('YYYY-MM-DD HH:mm:ss');

            pool.query(UserSQL.getUserById,[bulletin.userId],(err,rows) =>{
                if(err){
                    throw err;
                }
                if(rows.length>0){
                    item.publisher = rows[0].name;
                    allBulletins.push(item);
                    if(index===length){
                        res.send(allBulletins);
                    }
                    index++;
                }
            });

        }

    });

};

// 删除某条公告
exports.deleteBulletin = (req,res) => {
   
    pool.query(BulletinSQL.delete,[req.body.id], (err, row)=>{
        if (err){
            res.send(false);
            throw err;
        }
        res.send(true);
    });
};
