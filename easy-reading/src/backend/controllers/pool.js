let mysql = require('mysql');
exports.pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'wangbin',
    password: '123456',
    database: 'easyreading',
});
exports.compare = (property) => {
    return function(a,b){
        let value1 = a[property];
        let value2 = b[property];
        return value1 - value2;
    }
};
exports.UserSQL = {
    insert:'INSERT INTO user(id,name,password,gender,address,email,phone,description,type,signUpTime) VALUES(?,?,?,?,?,?,?,?,?,?)',
    selectAll:'SELECT * FROM user',
    getUserById:'SELECT * FROM user WHERE id = ? ',
};
exports.UserRanksSQL = {
    insert :'INSERT INTO user_ranks (userId,rankRecordId) VALUES (?,?)',
};
exports.UserRecommendsSQL = {
    insert :'INSERT INTO user_recommends (userId,recommendRecordId) VALUES (?,?)',
};
exports.BookshelfSQL = {
    insert :'INSERT INTO bookshelf(id,userId) VALUES (?,?)',
};
exports.ReadingSettingSQL = {
    insert:'INSERT INTO reading_setting(id,userId,fontSize,pageWidth,fontFamily,bgColor,pageBgColor,lastModifiedTime) VALUES(?,?,?,?,?,?,?,?)',
    selectOneByUserId : 'SELECT * FROM reading_setting WHERE userId = ?',
    update: 'UPDATE reading_setting set fontSize = ?, pageWidth = ?, fontFamily = ?,bgColor = ?,pageBgColor = ?,lastModifiedTime = ? WHERE userId = ?',
};
exports.BookSQL = {
  insert :'INSERT INTO book (id,userId,author,distribute,dynasty,name,startTime,description,' +
  'clickNumbers,isFinished,keywords,preface,latestChapter,isValid,isFree,imgUrl,fileUrl,type,numbers,firstChapter,memberClickNumbers) VALUES ' +
  '(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
  updateNumbersAndLatestChapter : 'UPDATE book set numbers = ?, latestChapter = ? ,firstChapter = ? WHERE id = ?',
  updateBookIsValid:'UPDATE book set isValid = ? WHERE id = ?',
    selectOneBook : 'SELECT * FROM book WHERE id = ?',
    updateNormalAndMemberClickNumbers :'UPDATE book set clickNumbers = clickNumbers +1,  memberClickNumbers = memberClickNumbers+1 WHERE id = ?',
    updateNormalClickNumbers :'UPDATE book set clickNumbers = clickNumbers +1  WHERE id = ?'
};
exports.BookRecomendRecordsSQL = {
    selectAllRecommendRecordsByBookId : 'SELECT * FROM book_recommend_records WHERE bookId = ?',
    insert:'INSERT INTO book_recommend_records (bookId,recommendRecordId) VALUES (?,?)',
};
exports.RecomendRecordSQL = {
    insert:'INSERT INTO recommend_record (id,userId,bookId,time) VALUES (?,?,?,?)',
};
exports.BookRankRecordsSQL = {
    selectAllRankRecordsByBookId : 'SELECT * FROM book_rank_records WHERE bookId = ?',
    insert :'INSERT INTO book_rank_records (bookId,rankRecordId) VALUES (?,?)',
};
exports.RankRecordSQL = {
    selectAllRecordByBookId : 'SELECT * FROM rank_record WHERE  bookId = ?',
    insert : 'INSERT INTO rank_record (id,bookId,userId,score,time) VALUES (?,?,?,?,?)',
    updateScore : 'UPDATE rank_record set score = ? WHERE userId = ?',
};
exports.CollectRecordSQL = {
  insert :'INSERT INTO collectrecord (id,userId,bookId,time) VALUES (?,?,?,?)',
    selectByUserAndBookId : 'SELECT * FROM collectrecord WHERE userId = ? and bookId = ?',
};
exports.BookTypeSQL = {
    updateUseTimes : 'UPDATE booktype set useTimes = useTimes+1 where id = ?',
    selectBookTypeById: 'SELECT * FROM booktype WHERE id = ?',
};
exports.BookTypesSQL = {
    insert :'INSERT INTO book_types(bookId,bookTypeId) VALUES (?,?)',
};
exports.VolumeSQL = {
  insert : 'INSERT INTO volume (id,bookId,name,isFree,startTime,numbers) VALUES (?,?,?,?,?,?)',
    selectOneById : 'SELECT * FROM volume WHERE id = ?',
    selectAllByBookId :'SELECT * FROM volume WHERE bookId = ?',
};
exports.ChapterSQL = {
    insert :'INSERT INTO chapter (id,volumeId,bookId,name,numbers,link,isFree,time,content) VALUES (?,?,?,?,?,?,?,?,?)',
    selectOneById : 'SELECT * FROM chapter WHERE id = ?',
    selectAllByVolumeId : 'SELECT * FROM chapter WHERE volumeId = ?',
};
exports.ChapterReadingRecordSQL = {
    insert : 'INSERT INTO chapterreadingrecord (id,chapterId,bookId,userId,startTime,endTime) VALUES (?,?,?,?,?,?)',
    update :'UPDATE chapterreadingrecord set endTime = ? WHERE id = ?',
};
exports.VolumeChaptersSQL = {
  insert : 'INSERT INTO volume_chapters (volumeId,chapterId) VALUES (?,?)',
    selectAll : 'SELECT * FROM volume_chapters WHERE volumeId = ?',
};
exports.BookVolumesSQL = {
    insert : 'INSERT INTO book_volumes (bookId,volumeId) VALUES (?,?)',
    selectAll : 'SELECT * FROM book_volumes WHERE bookId = ? order by volumeId',
};
exports.BulletinSQL = {
    insert :'INSERT INTO bulletin (id,userId,title,content,type,time) VALUES (?,?,?,?,?,?)',
    delete : 'Delete FROM bulletin WHERE id = ?',
    selectAll :'SELECT * FROM bulletin order by time desc',
    selectTopNumBulletin : 'SELECT * FROM bulletin order by time desc limit ?',
    selectOneBulletin : 'SELECT * FROM bulletin WHERE id = ?',

};
