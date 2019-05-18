let poolModule = require('./pool');
let pool = poolModule.pool;
let VolumeSQL = poolModule.VolumeSQL;
// 通过id获取某一条卷
exports.getVolumeById = (req,res) =>{
    pool.query(VolumeSQL.selectOneById,[req.params.id], (err, rows)=>{
        if (err){
            res.send(false);
            throw err;
        }
        res.send(rows[0]);
        res.end();
    });
};

// 通过书籍id获取该书籍的所有volume
exports.getAllVolumes = (req,res) =>{

    // 通过bookId从bookVolumes中获取所有项
    pool.query(VolumeSQL.selectAllByBookId,[req.params.id], (err, rows)=>{
        if (err){
            res.send(false);
            throw err;
        }
        res.send(rows);
        res.end();

    });
};
