
let pool = require('./pool').pool;
// 由 POST 处理书籍更新操作
exports.getTopNumBulletins = (req, res) => {
    console.log(req.params.num);
    pool.query('SELECT * FROM bulletin', (err, row)=>{
        if (err) throw err;
        res.json(row);
    });
};
/*app.post('/bulletin/add', (req, res)=> {
    console.log(req.body.title);
  /!*  pool.query(
        'INSERT INTO bulletin(id,userId,title,content,type,time) VALUES(1405041041,2306523,"干净学生党","资讯","45122")',
        (err, row)=>{
            if (err) throw err;
            console.log('Inserted');
        });*!/
});*/