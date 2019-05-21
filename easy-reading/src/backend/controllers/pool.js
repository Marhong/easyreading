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
    selectOneByUserId:'SELECT * FROM user WHERE id = ? ',
    update:'UPDATE user set gender = ?,address = ?,email = ?,phone = ?,description =? WHERE id = ?',
    updatePassword:'UPDATE user set password = ? WHERE id = ?',
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
    updateNormalClickNumbers :'UPDATE book set clickNumbers = clickNumbers +1  WHERE id = ?',
    selectAllBooks :'SELECT * FROM book ',
    selectAllBooksByUserId :"SELECT * FROM book WHERE userId = ?",
    delete :'DELETE FROM book WHERE id = ?',
};
exports.PostSQL = {
  insert :'INSERT INTO post (id,bookId,userId,title,content,time,userName) VALUES (?,?,?,?,?,?,?)',
  selectAllByBookId :'SELECT * FROM post WHERE bookId = ? order by id desc',
    selectAll :'SELECT * FROM post order by id desc',
    delete :'DELETE FROM post WHERE id = ?',
    selectAllByUserId:'SELECT * FROM post WHERE userId = ?',
    selectNumbersByBookId :'SELECT COUNT(id) FROM post WHERE bookId = ?',
};
exports.ReplySQL = {
    insert :'INSERT INTO reply (id,userId,postId,anotherUserId,content,time,bookId,userName,postTitle) VALUES (?,?,?,?,?,?,?,?,?)',
    selectAllByPostId :'SELECT * FROM reply WHERE postId = ? order by id desc',
    selectAll :'SELECT * FROM reply order by id desc',
    delete :'DELETE FROM reply WHERE id = ?',
    deleteAllByPostId:'DELETE FROM reply WHERE postId = ?',
    selectAllByUserId:'SELECT * FROM reply WHERE userId = ? order by id desc',
    selectAllByBookId :'SELECT * FROM reply WHERE bookId = ?',
    selectNumbersByBookId :'SELECT COUNT(id) FROM reply WHERE bookId = ?',
};
exports.ReplyReportSQL = {
    insert :'INSERT INTO replyreport (id,content,replyContent,userId,userName,reportedUserId,reportedUserName,replyId,time,postId) VALUES (?,?,?,?,?,?,?,?,?,?)',
    selectAll:'SELECT * FROM replyreport order by id desc',
    delete:'DELETE FROM replyreport WHERE id = ?',
    deleteAllByReplyId:'DELETE FROM replyreport WHERE replyId = ?',
    deleteAllByPostId :'DELETE FROM replyreport WHERE postId = ?',
};
exports.PostReportSQL = {
    insert :'INSERT INTO postreport (id,postId,userId,content,postTitle,userName,reportedUserName,reportedUserId,time) VALUES (?,?,?,?,?,?,?,?,?)',
    selectAll:'SELECT * FROM postreport order by id desc',
    delete:'DELETE FROM postreport WHERE id = ?',
    deleteAllByPostId:'DELETE FROM postreport WHERE postId = ?',
};
exports.BookReportSQL = {
    insert :'INSERT INTO bookreport (id,userId,bookId,userName,bookName,content,time,reportedUserId) VALUES (?,?,?,?,?,?,?,?)',
    selectAll:'SELECT * FROM bookreport order by id desc',
    delete:'DELETE FROM bookreport WHERE id = ?',
};
exports.BookRecomendRecordsSQL = {
    selectAllRecommendRecordsByBookId : 'SELECT * FROM book_recommend_records WHERE bookId = ?',
    insert:'INSERT INTO book_recommend_records (bookId,recommendRecordId) VALUES (?,?)',
};
exports.RecomendRecordSQL = {
    insert:'INSERT INTO recommend_record (id,userId,bookId,time) VALUES (?,?,?,?)',
    selectAllByBookId :'SELECT * FROM recommend_record WHERE bookId = ?',
    selectNumbersByBookId :'SELECT COUNT(id) FROM recommend_record WHERE bookId = ?',
};
exports.BookRankRecordsSQL = {
    selectAllRankRecordsByBookId : 'SELECT * FROM book_rank_records WHERE bookId = ?',
    insert :'INSERT INTO book_rank_records (bookId,rankRecordId) VALUES (?,?)',
};
exports.RankRecordSQL = {
    selectAllRecordByBookId : 'SELECT * FROM rank_record WHERE  bookId = ?',
    insert : 'INSERT INTO rank_record (id,bookId,userId,score,time) VALUES (?,?,?,?,?)',
    updateScore : 'UPDATE rank_record set score = ? WHERE userId = ?',
    selectNumbersByBookId :'SELECT COUNT(id) FROM rank_record WHERE bookId = ?',
};
exports.CollectRecordSQL = {
  insert :'INSERT INTO collectrecord (id,userId,bookId,time) VALUES (?,?,?,?)',
    selectByUserAndBookId : 'SELECT * FROM collectrecord WHERE userId = ? and bookId = ?',
    selectAllByUserId :'SELECT * FROM collectrecord WHERE userId = ? order by id desc',
    delete:'DELETE FROM collectrecord WHERE id = ?',
    selectAllByBookId :'SELECT * FROM collectrecord WHERE bookId = ?',
    selectNumbersByBookId :'SELECT COUNT(id) FROM collectrecord WHERE bookId = ?',
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
    selectNumbersByBookId :'SELECT COUNT(id) FROM volume WHERE bookId = ?',
};
exports.ChapterSQL = {
    insert :'INSERT INTO chapter (id,volumeId,bookId,name,numbers,link,isFree,time,content) VALUES (?,?,?,?,?,?,?,?,?)',
    selectOneById : 'SELECT * FROM chapter WHERE id = ?',
    selectAllByVolumeId : 'SELECT * FROM chapter WHERE volumeId = ?',
    selectSomeProperities :'SELECT id,name,time FROM chapter WHERE id = ?',
};
exports.ChapterReadingRecordSQL = {
    insert : 'INSERT INTO chapterreadingrecord (id,chapterId,bookId,userId,startTime,endTime) VALUES (?,?,?,?,?,?)',
    update :'UPDATE chapterreadingrecord set endTime = ? WHERE id = ?',
    selectAllByUserId :'SELECT * FROM chapterreadingrecord WHERE userId = ? order by id desc',
    selectAllByBookId :'SELECT * FROM chapterreadingrecord WHERE bookId = ?',
    selectNumbersByBookId :'SELECT COUNT(id) FROM chapterreadingrecord WHERE bookId = ?',
};
exports.SearchRecordSQL = {
  insert:'INSERT INTO search_record (id,userId,name,type,distribute,dynasty,isFinished,isFree,numbers,latestChapter,keywords) VALUES(?,?,?,?,?,?,?,?,?,?,?)',
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
exports.BookReadingDataSQL = {
    insert:'INSERT INTO book_reading_data (id ,book_id ,book_name ,type ,isFinished ,startTime, click_numbers ,recommend_numbers,collect_numbers ,post_numbers ,reply_numbers  ,rank_numbers ,total_time ,rank ,lastModifiedTime) ' +
    'VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    update:'UPDATE book_reading_data set click_numbers =?,recommend_numbers=?,collect_numbers=?,post_numbers=?,reply_numbers=?,rank_numbers=?,total_time=?,rank=?,lastModifiedTime=? WHERE book_id = ? ',
    selectAll:'SELECT * FROM book_reading_data order by rank',
    selectTypeBooks :'SELECT * FROM book_reading_data order by type,rank desc ',
    selectSome:'SELECT book_id FROM book_reading_data order by rank desc limit ?',
    selectFinishedBooks :'SELECT * FROM book_reading_data  WHERE isFinished = 1 order by rank desc limit ? ',
    selectHotNewBooks :'SELECT * FROM book_reading_data where startTime > ?  order by rank desc,startTime desc  limit ?'
};
exports.HeavyRecommendSQL = {
    insert :'INSERT INTO heavy_recommend (id,time,book_ids) VALUES (?,?,?)',
    selectTodayBooks :'SELECT * FROM heavy_recommend WHERE time > ? and time < ?',
};
exports.FinishedRecommendSQL = {
    insert :'INSERT INTO finished_recommend (id,time,book_ids) VALUES (?,?,?)',
    selectTodayBooks :'SELECT * FROM finished_recommend WHERE time > ? and time < ? ',
};
exports.HotNewRecommendSQL = {
    insert :'INSERT INTO hot_new_recommend (id,time,book_ids) VALUES (?,?,?)',
    selectTodayBooks :'SELECT * FROM hot_new_recommend WHERE time > ? and time < ? ',
};
exports.PopularRecommendSQL = {
    insert :'INSERT INTO popular_recommend (id,time,book_ids) VALUES (?,?,?)',
    selectTodayBooks :'SELECT * FROM popular_recommend WHERE time > ? and time < ? ',
};


