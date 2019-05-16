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
    queryAll:'SELECT * FROM User',
    getUserById:'SELECT * FROM User WHERE uid = ? ',
};
exports.BookshelfSQL = {
    insert :'INSERT INTO bookshelf(id,userId) VALUES (?,?)',
};
exports.ReadingSettingSQL = {
    insert:'INSERT INTO reading_setting(id,userId,fontSize,pageWidth,fontFamily,bgColor,pageBgColor,lastModifiedTime) VALUES(?,?,?,?,?,?,?,?)',
};
exports.BookSQL = {
  insert :'INSERT INTO book (id,userId,author,distribute,dynasty,name,startTime,description,' +
  'clickNumbers,isFinished,keywords,preface,latestChapter,isValid,isFree,imgUrl,fileUrl,type) VALUES ' +
  '(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
};
exports.BookTypeSQL = {
    updateUseTimes : 'UPDATE booktype set useTimes = useTimes+1 where id = ?',
};
exports.BookTypesSQL = {
    insert :'INSERT INTO book_types(bookId,bookTypeId) VALUES (?,?)',
};