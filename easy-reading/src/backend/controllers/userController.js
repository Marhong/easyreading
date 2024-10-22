let poolModule = require('./pool');
let pool = poolModule.pool;
let UserSQL = poolModule.UserSQL;
let BookshelfSQL = poolModule.BookshelfSQL;
let ReadingSettingSQL =poolModule.ReadingSettingSQL;
let moment = require('moment');
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
};
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
};

// 更新账号信息
exports.updateUser = (req,res) => {

    let {gender,address,email,phone,description,id} =req.body;
    pool.query(UserSQL.update,[gender,address,email,phone,description,id],(err,rows) => {
        if(err) throw err;
        res.send(true);
        res.end();
    })
};
// 更新账号密码
exports.updatePassword = (req,res) => {
    let {password,id} =req.body;
    pool.query(UserSQL.updatePassword,[password,id],(err,rows) => {
        if(err) throw err;
        res.send(true);
        res.end();
    })
};
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
};

// 获取所有的用户信息
exports.getAllUsers = (req,res) => {
    pool.query(UserSQL.selectAll,(err,rows) => {
        if(err) throw err;
        for(let item of rows){
            item.key = item.id;
            item.registerTime = moment(item.signUpTime).format('YYYY-MM-DD HH:mm:ss');
        }
        res.send(rows);
        res.end();
    })
};

