let poolModule = require('./pool');
let pool = poolModule.pool;
let ChapterSQL = poolModule.ChapterSQL;
let VolumeChaptersSQL = poolModule.VolumeChaptersSQL;
let compare = poolModule.compare;
// 通过id获取某一条章节
exports.getChapterById = (req,res) =>{
    pool.query(ChapterSQL.selectSimpleInfoById,[req.params.id], (err, rows)=>{
        if (err){
            res.send(false);
            throw err;
        }
        let chapter = rows[0];
        pool.query(ChapterSQL.selectContentById,[rows[0].id],(err,rows)=>{
            if(err) throw err;
            chapter.content = rows[0].content;
            res.send(chapter);
            res.end();
        });
    })
};


// 通过卷id获取所有的章节
exports.getChaptersByVolumeId = (req,res) =>{

    // 通过volumeId从chapter中获取所有对应chapter
    pool.query(ChapterSQL.selectNamesByVolumeId,[req.params.id],(err,rows)=>{
        if(err) throw err;
        res.send(rows.sort(compare('id')));
        res.end();
    })

};