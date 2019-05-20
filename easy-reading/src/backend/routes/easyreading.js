const express = require('express');
const router = express.Router();

// 导入控制器模块
const book_controller = require('../controllers/bookController');
const book_list_controller = require('../controllers/bookListController');
const bookshelf_controller = require('../controllers/bookshelfController');
const book_type_controller = require('../controllers/bookTypeController');
const chapter_controller = require('../controllers/chapterController');
const chapter_reading_record_controller = require('../controllers/chapterReadingRecordController');
const collect_record_controller = require('../controllers/collectRecordController');
const label_record_controller = require('../controllers/labelReocrdController');
const post_controller = require('../controllers/postController');
const rank_record_controller = require('../controllers/rankRecordController');
const reading_setting_controller = require('../controllers/readingSetting');
const recommend_record_controller = require('../controllers/recommendRecordController');
const reply_controller = require('../controllers/replyController');
const search_record_controller = require('../controllers/searchRecordController');
const user_controller = require('../controllers/userController');
const volume_controller = require('../controllers/volumeController');
const bulletin_controller = require('../controllers/bulletinController');
const post_report_controller = require('../controllers/postReportController');
const reply_report_controller = require('../controllers/replyReportController');
const book_report_controller = require('../controllers/bookReportController');
// 用户路由
// POST 验证用户登录
router.post('/user/login',user_controller.userLogin);
// POST 注册账号时，验证用户名是否已被注册
router.post('/user/signUp/isExist',user_controller.isExist);
// POST 注册账号
router.post('/user/signUp/add',user_controller.addUser);
// GET 获取所有的用户
router.get('/user/all',user_controller.getAllUsers);
// POST 更新账号信息
router.post('/user/update',user_controller.updateUser);
// POST 更新账号密码
router.post('/user/update/password',user_controller.updatePassword);
/// BookType书籍类型路由 ///

// GET 获取固定的那8种BookType
/*router.get('/bookTypes',book_type_controller.book_type_static_list);*/


/// Bulletin公告路由 ///

// POST 发布公告
router.post('/bulletin/add',bulletin_controller.addBulletin);
// GET 获取所有公告
router.get('/bulletin/all',bulletin_controller.getAllBulletins);
// POST 删除某条公告
router.post('/bulletin/delete',bulletin_controller.deleteBulletin);
// GET 每次获取10条公告,请求应该包含一个参数
// start 起始索引，初始化时start为0，之后每请求一次start+=10
router.get('/bulletin/more/:start',bulletin_controller.getMoreTenBulletins);
// GET 按时间排序获取最近的num条公告
router.get('/bulletin/top/:num',bulletin_controller.getTopNumBulletins);
// GET 获取某一条公告
router.get('/bulletin/:id',bulletin_controller.getBulletinById);

// Book书籍路由 ///

// POST 用户上传书籍
router.post('/book/add',book_controller.addBook);
// GET 获取所有书籍
router.get('/book/all',book_controller.getAllBooks);
// GET 通过书籍id获取某一书籍详细信息
router.get('/book/:id',book_controller.getBookById);
// GET 通过书籍id获取某本书的简略信息
router.get('/book/:id/simpleInfo',book_controller.getSimpleBookById);
// GET 通过用户id获取用户上传的所有书籍
router.get('/book/:userId/upload',book_controller.getAllBooksByUserId)
// POST 举报书籍
router.post('/book/report',book_report_controller.addBookReport);
// GET 获取所有书籍举报信息
router.post('/book/report/all',book_report_controller.getAllReports);
// POST 根据id删除书籍举报信息
router.post('/book/report/delete',book_report_controller.deleteReport);
// GET 获取书籍id的所有帖子
router.get('/post/:id/all',post_controller.getAllPostsByBookId);
// POST 发布一条帖子
router.post('/post/add',post_controller.addPost);
// POST 根据id删除一条帖子
router.post('/post/delete',post_controller.deletePost);
// GET 获取所有的帖子
router.get('/post/all',post_controller.getAllPosts);
// GET 通过userId获取用户发表的所有评论
router.get('/post/:userId',post_controller.getAllPostsByUserId);


// POST 发布一条评论
router.post('/reply/add',reply_controller.addReply);
// POST 根据id删除一条评论
router.post('/reply/delete',reply_controller.deleteReply);
// GET 获取所有的评论
router.get('/reply/all',reply_controller.getAllReplys);
// GET 通过postId获取所有评论
router.get('/reply/:id/all',reply_controller.getAllReplysByPostId);
// GET 通过userId获取用户发表的所有评论
router.get('/reply/:userId',reply_controller.getAllReplysByUserId);

// POST 举报一条帖子
router.post('/post/report',post_report_controller.addPostReport);
// POST 获取所有的帖子举报信息
router.post('/post/report/all',post_report_controller.getAllReports);
// POST 根据id删除一条帖子举报信息
router.post('/post/report/delete',post_report_controller.deleteReport);
// POST 根据postId删除该条post的所有举报信息
router.post('/post/report/delete/all',post_report_controller.deleteAllByPostId);

// POST 举报一条评论
router.post('/reply/report',reply_report_controller.addReplyReport);
// POST 获取所有评论举报信息
router.post('/reply/report/all',reply_report_controller.getAllReports);
// POST 根据id删除一条评论举报信息
router.post('/reply/report/delete',reply_report_controller.deleteReport);
// POST 根据replyId删除该条reply的所有举报信息
router.post('/reply/report/delete/all',reply_report_controller.deleteAllByReplyId);
/*// 获取用户每天的个性化推荐书籍列表
router.get('/books/personalBooks',book_controller.book_getPersonalBooks);


*/
// 图片路由
router.get('/book/image/:url',book_controller.getImageByUrl);
// POST 用户推荐书籍
router.post('/book/recommend',recommend_record_controller.addRecommendRecord);
// POST 用户给书籍评分
router.post('/book/rank',rank_record_controller.addOrUpdateRankRecord);
/// Chapter章节路由 ///   用户每次切换章节都会更新对应书籍的最后阅读章节属性
// POST 用户查看书籍详情,修改书籍clickNumbers
router.post('/book/click',book_controller.clickBook);
// GET通过章节id获取某一章节详细信息
router.get('/chapter/:id',chapter_controller.getChapterById);
// GET 通过卷id获取该卷的所有章节
router.get('/chapter/:id/all',chapter_controller.getChaptersByVolumeId);
// GET 通过卷id获取某一卷详细信息
router.get('/volume/:id',volume_controller.getVolumeById);
// GET 通过书籍id获取该书籍的所有卷
router.get('/volume/:id/all',volume_controller.getAllVolumes);
/// GET 通过userId获取阅读界面设置
router.get('/reading_setting/:id',reading_setting_controller.getReadingSettingByUserId);
/// POST 保存用户设置的阅读界面设置
router.post('/reading_setting/:id/save',reading_setting_controller.saveReadingSetting);

// POST 添加一条章节阅读界面设置
router.post('/chapterreadingrecord/add',chapter_reading_record_controller.addReadingRecord);
// POST 更新一条章节阅读记录
router.post('/chapterreadingrecord/update',chapter_reading_record_controller.updateReadingRecord);
// GET 获取某一用户的周阅读记录
router.get('/chapterreadingrecord/:userId/week',chapter_reading_record_controller.getWeekRecord);
// POST 添加一条收藏记录
router.post('/collect/add',collect_record_controller.addCollectRecord);
// GET 通过userId获取用户收藏的所有书籍
router.get('/collect/:userId',collect_record_controller.getAllByUserId);
router.post('/collect/delete',collect_record_controller.deleteRecord);
// POST 请求删除藏书
router.post('/book/:id/delete', book_controller.book_delete_post);

// POST 请求更新藏书
router.post('/book/:id/update', book_controller.book_update_post);



module.exports = router;