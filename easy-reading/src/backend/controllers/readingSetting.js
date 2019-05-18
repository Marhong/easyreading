let poolModule = require('./pool');
let pool = poolModule.pool;

let ReadingSettingSQL = poolModule.ReadingSettingSQL;

// 通过id获取某一用户阅读界面设置
exports.getReadingSettingByUserId = (req,res) =>{
    pool.query(ReadingSettingSQL.selectOneByUserId,[req.params.id], (err, rows)=>{
        if (err){
            res.send(false);
            throw err;
        }
        res.send(rows[0]);
        res.end();
    });
};

// 保存userId的阅读界面设置
exports.saveReadingSetting = (req,res)=>{
    let lastModifiedTime = Date.now();
    let userId = req.params.id;
    console.log(userId,req.body);
    let {fontSize,pageWidth,fontFamily,bgColor,pageBgColor} =req.body;
    pool.query(ReadingSettingSQL.update,[fontSize,pageWidth,fontFamily,bgColor,pageBgColor,lastModifiedTime,userId], (err, rows)=>{
        if (err){
            res.send(false);
            throw err;
        }
        res.send(rows[0]);
        res.end();
    });
};