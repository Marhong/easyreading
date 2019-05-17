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

// 用户路由
// POST 验证用户登录
router.post('/user/login',user_controller.userLogin);
// POST 注册账号时，验证用户名是否已被注册
router.post('/user/signUp/isExist',user_controller.isExist);
// POST 注册账号
router.post('/user/signUp/add',user_controller.addUser);
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
/*router.get('/bulletinList/:start',bulletin_controller.bulletin_getTenBulletins);*/
// GET 按时间排序获取最近的num条公告
/*router.get('/bulletin/bulletinBoard/:num',bulletin_controller.getTopNumBulletins);*/

// Book书籍路由 ///

// POST 用户上传书籍
router.post('/book/add',book_controller.addBook);

/*// 获取用户每天的个性化推荐书籍列表
router.get('/books/personalBooks',book_controller.book_getPersonalBooks);
// GET 通过书籍id获取某一书籍详细信息
router.get('/books/:id/detail',book_controller.book_getBookById);
// GET 获取书籍的最近更新章节
router.get('/books/:id/latestChapter',book_controller.book_getLatestChapter);
// GET 通过书籍id获取某一书籍的所有章节
router.get('/books/:id/volumes',book_controller.book_getAllVolumesById);*/
// 图片路由
router.get('/book/image/:url',book_controller.getImageByUrl);
/// Chapter章节路由 ///   用户每次切换章节都会更新对应书籍的最后阅读章节属性

/*// GET通过章节id获取某一章节详细信息
router.get('/chapters/:id/detail',chapter_controller.chapter_getChapterById);
// GET 通过章节id获取该章节的上一章
router.get('/chapters/:id/preChapter',chapter_controller.getPreChapter);
// GET 通过章节id获取该章节的下一章
router.get('/chapters/:id/nextChapter',chapter_controller.getNextChapter);

/// ReadingSetting阅读界面设置路由

// GET 通过用户id，获取该用户的阅读界面设置
router.get('/readingSetting/:id/detail',reading_setting_controller.getReadingSettingById);
// POST 通过用户id,更新该用户的阅读界面设置
router.post('/readingSetting/:id/update',reading_setting_controller.updateReadingSettingById);

/// RankRecord评分记录路由

// POST 通过用户id,更改他对某一bookId的评分
router.post('/rankRecord/:userId/:bookId/update',rank_record_controller.updateRankRecord);






/// 藏书路由 ///

// GET 获取藏书编目主页
router.get('/', book_controller.index);

// GET 请求添加新的藏书。注意此项必须位于显示藏书的路由（使用了 id）之前。
router.get('/book/create', book_controller.book_create_get);

// POST 请求添加新的藏书
router.post('/book/create', book_controller.book_create_post);

// GET 请求删除藏书
router.get('/book/:id/delete', book_controller.book_delete_get);

// POST 请求删除藏书
router.post('/book/:id/delete', book_controller.book_delete_post);

// GET 请求更新藏书
router.get('/book/:id/update', book_controller.book_update_get);

// POST 请求更新藏书
router.post('/book/:id/update', book_controller.book_update_post);

// GET 请求藏书
router.get('/book/:id', book_controller.book_detail);

// GET 请求完整藏书列表
router.get('/books', book_controller.book_list);

/// 藏书副本、藏书种类、作者的路由与藏书路由结构基本一致，只是无需获取主页 ///*/

module.exports = router;