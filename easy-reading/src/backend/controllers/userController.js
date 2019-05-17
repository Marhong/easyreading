let poolModule = require('./pool');
let pool = poolModule.pool;
let UserSQL = poolModule.UserSQL;
let BookshelfSQL = poolModule.BookshelfSQL;
let ReadingSettingSQL =poolModule.ReadingSettingSQL;
// POST 验证用户登录
exports.userLogin = (req,res) => {
    let {userName,password} = req.body;
    let isRight = false;
    let curUser;
    pool.query(UserSQL.selectAll,(err,rows) => {
        if(err) throw err;
        if(rows.length >0){
           for(let user of rows){
               if(user.name === userName && user.password === password){
                   isRight = true;
                   curUser = user;
                   break;
               }
           }
        }
        res.send(isRight ? curUser : false);
    })
}
// POST 注册用户
exports.addUser = (req,res) => {
    let user = req.body;
    user.id = Date.now();
    user.type = 0;
    user.signUpTime = Date.now();

   pool.query(UserSQL.insert,[user.id,user.name,user.password,user.gender,user.address,user.email,user.phone,user.description,user.type,user.signUpTime]
        ,(err,rows) => {
            if(err) throw err;

            // 如果成功创建用户，则应该同时创建该用户对应的personaleSetting、bookshelf
            let lastModifiedTime = Date.now();
            pool.query(ReadingSettingSQL.insert,[Date.now(),user.id,14,1200,1,"rgb(250, 238, 215)","RGB(217, 205, 182)",Date.now()],(err) =>{
                if(err) throw err;
                pool.query(BookshelfSQL.insert,[Date.now(),user.id],(err) =>{
                    if(err) throw err;
                    res.send({user:user});
                })
            });
        });
}
// 验证用户名是否已被注册
exports.isExist = (req,res) => {
    let name = req.body.name;
    let isExist = false;
    pool.query(UserSQL.selectAll,(err,rows) =>{
        if(err)throw err;
        if(rows.length>0){
            for(let user of rows){
                if(user.name === name){
                    isExist = true;
                    break;
                }
            }
        }
        res.send({isExist:isExist});
    })
}

