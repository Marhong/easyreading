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