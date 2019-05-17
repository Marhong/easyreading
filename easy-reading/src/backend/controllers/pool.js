let mysql = require('mysql');
exports.pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'wangbin',
    password: '123456',
    database: 'easyreading',
});
exports.UserSQL = {
    insert:'INSERT INTO user(id,name,password,gender,address,email,phone,description,type,signUpTime) VALUES(?,?,?,?,?,?,?,?,?,?)',
    selectAll:'SELECT * FROM user',
    getUserById:'SELECT * FROM user WHERE id = ? ',
};
exports.BookshelfSQL = {
    insert :'INSERT INTO bookshelf(id,userId) VALUES (?,?)',
};
exports.ReadingSettingSQL = {
    insert:'INSERT INTO reading_setting(id,userId,fontSize,pageWidth,fontFamily,bgColor,pageBgColor,lastModifiedTime) VALUES(?,?,?,?,?,?,?,?)',
};
exports.BookSQL = {
  insert :'INSERT INTO book (id,userId,author,distribute,dynasty,name,startTime,description,' +
  'clickNumbers,isFinished,keywords,preface,latestChapter,isValid,isFree,imgUrl,fileUrl,type,numbers) VALUES ' +
  '(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
  updateNumbersAndLatestChapter : 'UPDATE book set numbers = ?, latestChapter = ? WHERE id = ?',
  updateBookIsValid:'UPDATE book set isValid = ? WHERE id = ?',
};
exports.BookTypeSQL = {
    updateUseTimes : 'UPDATE booktype set useTimes = useTimes+1 where id = ?',
};
exports.BookTypesSQL = {
    insert :'INSERT INTO book_types(bookId,bookTypeId) VALUES (?,?)',
};
exports.VolumeSQL = {
  insert : 'INSERT INTO volume (id,bookId,name,isFree,startTime,numbers) VALUES (?,?,?,?,?,?)',
};
exports.ChapterSQL = {
    insert :'INSERT INTO chapter (id,volumeId,bookId,name,numbers,link,isFree,time,content) VALUES (?,?,?,?,?,?,?,?,?)'
};
exports.VolumeChaptersSQL = {
  insert : 'INSERT INTO volume_chapters (volumeId,chapterId) VALUES (?,?)',
};
exports.BookVolumesSQL = {
    insert : 'INSERT INTO book_volumes (bookId,volumeId) VALUES (?,?)',
};
exports.BulletinSQL = {
    insert :'INSERT INTO bulletin (id,userId,title,content,type,time) VALUES (?,?,?,?,?,?)',
    delete : 'Delete FROM bulletin WHERE id = ?',
    selectAll :'SELECT * FROM bulletin order by time desc',
    selectTopNumBulletin : 'SELECT * FROM bulletin order by time desc top ?',
    selectOneBulletin : 'SELECT * FROM bulletin WHERE id = ?',
    selectMoreTenBulletin : 'SELECT * FROM bulletin order by time desc top (? + 10)',
};