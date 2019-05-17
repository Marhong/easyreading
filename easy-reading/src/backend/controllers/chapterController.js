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
    });
};

// 通过卷id获取所有的章节
exports.getChaptersByVolumeId = (req,res) =>{
                // 通过volumeId从volume_chapters中获取所有项
                pool.query(VolumeChaptersSQL.selectAll,[req.params.id],(err,rows) =>{
                    if (err){
                        res.send(false);
                        throw err;
                    }
                    let count =rows.length;
                    let chapterList = [];
                    let index =0;
                    // 遍历volume_chapters中所有项
                    for(let i=0;i<count;i++){
                        let volumeChapter = rows[i];
                        // 通过volume_chapters中每一项的chapterId从chapter中获取chapter
                        pool.query(ChapterSQL.selectOneById,[volumeChapter.chapterId], (err, rows)=>{
                            if (err){
                                res.send(false);
                                throw err;
                            }
                            if(i<count){
                                chapterList.push(rows[0]);
                                index++;
                                if(index === count){
                                    console.log("有："+count+" 章");
                                    res.send({count:count,chapterList:compare(chapterList)});
                                }
                            }
                        });
                    }
                })
};