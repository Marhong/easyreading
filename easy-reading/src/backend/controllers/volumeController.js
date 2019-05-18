let poolModule = require('./pool');
let pool = poolModule.pool;
let VolumeSQL = poolModule.VolumeSQL;
let BookVolumesSQL = poolModule.BookVolumesSQL;
let ChapterSQL = poolModule.ChapterSQL;
let compare = poolModule.compare;
// 通过id获取某一条卷
exports.getVolumeById = (req,res) =>{
    pool.query(VolumeSQL.selectOneById,[req.params.id], (err, rows)=>{
        if (err){
            res.send(false);
            throw err;
        }
        res.send(rows[0]);
    });
};

// 通过书籍id获取该书籍的所有volume
exports.getAllVolumes = (req,res) =>{

    // 通过bookId从bookVolumes中获取所有项
    pool.query(BookVolumesSQL.selectAll,[req.params.id], (err, rows)=>{
        if (err){
            res.send(false);
            throw err;
        }
        let volumes = [];
        let index = 0;
        let volumeLength = rows.length;
        // 遍历bookVolumes的每一项
        for(let i=0;i<volumeLength;i++){
            let bookVolume = rows[i];
            //  // 通过遍历bookVolumes的每一项中每一项的volumeId从volume中获取volume
            pool.query(VolumeSQL.selectOneById,[bookVolume.volumeId],(err,rows) =>{
                if(err) throw err;
                if(i<volumeLength){
                    volumes.push(rows[0]);
                    index++;
                    if(index === volumeLength){
                        res.send(volumes.sort(compare('id')));
                    }
                }
            })

        }
    });
};
