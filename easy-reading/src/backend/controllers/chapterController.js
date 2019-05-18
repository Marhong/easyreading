let poolModule = require('./pool');
let pool = poolModule.pool;
let ChapterSQL = poolModule.ChapterSQL;
let VolumeChaptersSQL = poolModule.VolumeChaptersSQL;
let compare = poolModule.compare;
// 通过id获取某一条章节
exports.getChapterById = (req,res) =>{
    pool.query(ChapterSQL.selectOneById,[req.params.id], (err, rows)=>{
        if (err){
            res.send(false);
            throw err;
        }
        res.send(rows[0]);
        res.end();
    });
};

// 通过卷id获取所有的章节
exports.getChaptersByVolumeId = (req,res) =>{

    // 通过volumeId从chapter中获取所有对应chapter
    pool.query(ChapterSQL.selectAllByVolumeId,[req.params.id],(err,rows)=>{
        if(err) throw err;
        console.log(req.params.id,rows.length);
        res.send(rows.sort(compare('id')));
        res.end();
    })

};