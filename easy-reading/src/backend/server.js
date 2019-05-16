var mysql = require('mysql');
var bodyParser = require('body-parser');
var express = require('express');
var cors = require('cors');
// 引入easyreadingRouter
const easyreadingRouter = require('./routes/easyreading');
var app = express();
app.use(express.static('./public/upload'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'wangbin',
    password: '123456',
    database: 'easyreading',
});

app.use('/easyreading', easyreadingRouter);  // 将 easyreading 路由添加进中间件链

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    /*next(createError(404));*/
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    /*res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');*/
});

app.listen(5000, ()=>{
    console.log("Server side, listening port 5000.");
});