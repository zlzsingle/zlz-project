/**
 * @api {get}  /api/v1/account/users/:id getUserInfo
 * @apiDescription 交易员个人信息 (现有接口:需要改动,返回值增加属性Score)
 *                 <br/><br/>开发者：[庄伦植](mailto:zhuanglunzhi@followme-inc.com)
 * @apiGroup    Account
 *
 * @apiExample Example usage:
 *      GET /api/v1/account/users/:id
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "code": "SUCCESS",
 *          "data": {
 *               "user": {
 *                   "UserId": 151537,
 *                   "UserType": 1,
 *                   "NickName": "刘庚家",
 *                   "Gender": 0,
 *                   "BrokerId": 104,
 *                   "AccountIndex": 2,
 *                   "AccountRole": 0,
 *                   "Introduction": "投资的第一原则是永远不要亏钱，第二原则是记住第一原则，在别人贪婪时要保持警惕，而在别人警惕时就要贪婪，欲速则不达。建议3000美金设置为0.01手按固定比例跟随，按比例以此类推，谢谢大家对我的支持！",
 *                   "StrategyDescription": "纯手工交易，根据各个国家的经济数据和货币政策做出交易，看日线和周线图趋势为交易方向，以短线交易为主，月收益20%左右！建议3000美金设置为0.01手按固定比例跟随，按比例以此类推！希望能够带你一起赚",
 *                   "FollowProfit": 99922.93,
 *                  "ROI": 381.48,
 *                  "Orders": 1272,
 *                  "Weeks": 16,
 *                  "AttentionCount": 15,
 *                  "FansCount": 333,
 *                  "Expire": 0,
 *                  "IsShowTrade": true,
 *                  "IsShowGender": true,
 *                  "Certifications": "",
 *                  "AttentState": 0,
 *                  "CreateTime": "1512906169",
 *                  "Avatar": "",
 *                  "BlogCount": 21,
 *                  "Address": "广东省深圳市",
 *                  "views": 11418,
 *                  "Score" : 72.23541
 *              }
 *          }
 *      }
 *
 * @apiParam    (Parameter: params)  {number}    [id]     用户id
 *
 * @apiSuccess  {string}    code                            SUCCESS
 * @apiSuccess  {object}    data                            数据
 * @apiSuccess  {array}     data.user                       用户信息
 * @apiSuccess  {string}    data.user.UserId                用户id
 * @apiSuccess  {string}    data.user.UserType              类型
 * @apiSuccess  {string}    data.user.NickName              昵称
 * @apiSuccess  {string}    data.user.Gender                性别
 * @apiSuccess  {string}    data.user.BrokerId              经纪商id
 * @apiSuccess  {string}    data.user.AccountIndex          账号索引
 * @apiSuccess  {string}    data.user.AccountRole           角色
 * @apiSuccess  {string}    data.user.Introduction          介绍
 * @apiSuccess  {string}    data.user.StrategyDescription   跟随策略
 * @apiSuccess  {string}    data.user.FollowProfit          跟随收益
 * @apiSuccess  {string}    data.user.ROI                   点数
 * @apiSuccess  {string}    data.user.Orders                订单数
 * @apiSuccess  {string}    data.user.Weeks                 交易周期
 * @apiSuccess  {string}    data.user.AttentionCount        关注数量
 * @apiSuccess  {string}    data.user.FansCount             粉丝数量
 * @apiSuccess  {string}    data.user.Expire                模拟用户是否失效
 * @apiSuccess  {string}    data.user.IsShowTrade
 * @apiSuccess  {string}    data.user.IsShowGender
 * @apiSuccess  {string}    data.user.Certifications        认证
 * @apiSuccess  {string}    data.user.AttentState
 * @apiSuccess  {string}    data.user.CreateTime            注册时间
 * @apiSuccess  {string}    data.user.Avatar                用户头像地址
 * @apiSuccess  {string}    data.user.BlogCount             博客数量
 * @apiSuccess  {string}    data.user.Address               地址
 * @apiSuccess  {string}    data.user.views                 访问量
 * @apiSuccess  {string}    data.user.Score                 交易员能力值(需新增字段)
 *
 */
exports.getUserInfo = async ctx =>{

};

/**
 * @api {get}  /api/v2/trader/user/:userId/trader-symbols getTraderSymbol
 * @apiDescription 获取用户常交易的品种信息  (新增接口)
 *                 <br/><br/>开发者：[庄伦植](mailto:zhuanglunzhi@followme-inc.com)
 * @apiGroup    Account
 *
 * @apiExample Example usage:
 *      GET /api/v2/trader/user/9999/trader-symbols?count=3
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "code": "SUCCESS",
 *          "data": {
 *               symbols : [
 *                      {
 *                          SymbolId : 11,
 *                          SymbolCNName:"澳元/纽元",
 *                          SymbolName:"AUD/NZD",
 *                          StandardLots : 1.98,
 *                          Money : 100.25,
 *                          TraderAccount　：　[
 *                              {
 *                                 "UserId": 151537,
 *                                 "UserType": 1,
 *                                 "NickName": "刘庚家",
 *                                 "Gender": 0,
 *                                 "BrokerId": 104,
 *                                 "Account" : "888888",
 *                                 "AccountIndex": 2,
 *                                 "CreateTime": "1512906169",
 *                                 "Avatar": "https://static.followme.com/avatar/avatar-151537-2018-07-10-23-40-10-757331.png",
 *                              }
 *                          ]
 *                      }
 *               ]
 *          }
 *      }
 *
 * @apiParam    (Parameter: params)  {number}   [userId]            用户id
 * @apiParam    (Parameter: query)  {number}   [count]              要获取的品种总数,默认3.取值1-10
 *
 * @apiSuccess  {string}    code                                    SUCCESS
 * @apiSuccess  {object}    data                                    数据
 * @apiSuccess  {string}    data.symbols                            品种列表
 * @apiSuccess  {number}    data.symbols.SymbolId                   品种Id
 * @apiSuccess  {string}    data.symbols.SymbolCNName               品种中文名称
 * @apiSuccess  {string}    data.symbols.SymbolName                 品种名称
 * @apiSuccess  {number}    data.symbols.StandardLots               累计标准手
 * @apiSuccess  {number}    data.symbols.Money                      累计收益
 * @apiSuccess  {array}     data.symbols.TraderAccount　            该品种其他优秀交易员
 * @apiSuccess  {number}    data.symbols.TraderAccount.UserId       用户id
 * @apiSuccess  {number}    data.symbols.TraderAccount.UserType     用户类型
 * @apiSuccess  {string}    data.symbols.TraderAccount.NickName     昵称
 * @apiSuccess  {number}    data.symbols.TraderAccount.Gender       性别
 * @apiSuccess  {number}    data.symbols.TraderAccount.BrokerId     经纪商id
 * @apiSuccess  {string}    data.symbols.TraderAccount.Account      优秀交易员的交易账号
 * @apiSuccess  {number}    data.symbols.TraderAccount.AccountIndex 账号索引
 * @apiSuccess  {string}    data.symbols.TraderAccount.CreateTime   注册时间
 * @apiSuccess  {string}    data.symbols.TraderAccount.Avatar       交易员头像地址
 *
 */
exports.getTraderSymbol = async ctx =>{

};

/**
 * @api {get}  /api/v2/trader/user/:userId/attentions/broker getAttentionBrokers
 * @apiDescription 获取关注的经纪商  (新增接口)
 *                 <br/><br/>开发者：[庄伦植](mailto:zhuanglunzhi@followme-inc.com)
 * @apiGroup    Account
 *
 * @apiExample Example usage:
 *      GET /api/v2/trader/user/89999/attentions/broker
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "code": "SUCCESS",
 *          "data": {
 *                 brokers : [
 *                            {
 *                                BrokerID: 1,
 *                                Name: "pico",
 *                                FullName: "RH晋峰环球国际",
 *                                Introduce: "晋峰金融集团有限公司(“晋峰金融集团”)为投资控股公司，根据英属维尔京群岛法例注册成立的合法机构。晋峰金融集团由两位具广泛人脉、丰富金融投资经验及知识的独立投资者创立。主要透过其全资拥有的子公司晋峰资本投资管理有限公司(“晋峰资本”)及其旗下子公司进行多元化主流业务，包括：期货﹑证劵经纪业务﹑借贷人业务﹑和资产管理业务。",
 *                               Website: "http://www.fxrhs.com/",
 *                               OpenAccountURL: "https://passport.fxrhs.com/Register/MailRegister",
 *                               IconURL: "https://cdn.followme.com/images/broker/web/1/1_15_15.png",
 *                               BigIconURL: "https://cdn.followme.com/images/broker/web/1/1_50_50.png",
 *                               MinLots: 0.1,
 *                               Flag: 1227,
 *                               IsActive: true,
 *                               DepositeURL: "https://passport.fxrhs.com/Account/Login",
 *                               ShortName: "",
 *                               Sort: 0
 *                           }
 *                   ]
 *          }
 *      }
 *
 * @apiParam    (Parameter: params)  {number}   [userId]            用户id
 *
 * @apiSuccess  {string}    code                                    SUCCESS
 * @apiSuccess  {object}    data                                    数据
 * @apiSuccess  {string}    data.brokers                            品种列表
 * @apiSuccess  {string}    data.brokers.BrokerID
 * @apiSuccess  {string}    data.brokers.Name
 * @apiSuccess  {string}    data.brokers.FullName
 * @apiSuccess  {string}    data.brokers.Introduce
 * @apiSuccess  {string}    data.brokers.Website
 * @apiSuccess  {string}    data.brokers.OpenAccountURL
 * @apiSuccess  {string}    data.brokers.IconURL
 * @apiSuccess  {string}    data.brokers.BigIconURL
 * @apiSuccess  {string}    data.brokers.MinLots
 * @apiSuccess  {string}    data.brokers.Flag
 * @apiSuccess  {string}    data.brokers.IsActive
 * @apiSuccess  {string}    data.brokers.DepositeURL
 * @apiSuccess  {string}    data.brokers.ShortName
 * @apiSuccess  {string}    data.brokers.Sort
 *
 */
exports.getAttentionBrokers = async ctx =>{

};

/**
 * @api {get}  /api/v2/social/personal/:userId/album getUserAlbum
 * @apiDescription 获取相册  (新增接口)
 *                 <br/><br/>开发者：[庄伦植](mailto:zhuanglunzhi@followme-inc.com)
 * @apiGroup    Account
 *
 * @apiExample Example usage:
 *      GET /api/v2/social/personal/151537/album?count=6
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "code": "SUCCESS",
 *          "data": {
 *               album : [
 *                   {
 *                       Id : 999,
 *                       BlogBody : "",
 *                       keywords : "",　
 *                       CreateTime　: "",
 *                       CreateTimeDesc : "",
 *                       Files : [
 *                           {
 *                               ContentType:"png",
 *                               ObjectId:20471983,
 *                               Seq:47858,
 *                               Url:"https://static.followme.com/social/201807/d59d350896ac48b19f3bef379f1cb9d2.png"
 *                           }
 *                       ]
 *                   }
 *               ]
 *          }
 *      }
 *
 * @apiParam    (Parameter: params)  {number}   [userId]            用户id
 * @apiParam    (Parameter: query)  {number}   [count]              相册总数
 *
 * @apiSuccess  {string}    code                                    SUCCESS
 * @apiSuccess  {object}    data                                    数据
 * @apiSuccess  {string}    data.album                              相册
 * @apiSuccess  {string}    data.album.Id                           微博id
 * @apiSuccess  {string}    data.album.BlogBody                     微博正文
 * @apiSuccess  {string}    data.album.keywords                     关键词
 * @apiSuccess  {string}    data.album.CreateTime　                 创建时间
 * @apiSuccess  {string}    data.album.CreateTimeDesc               创建时间描述
 * @apiSuccess  {string}    data.album.Files                        图片
 * @apiSuccess  {string}    data.album.Files.ContentType            文件类型
 * @apiSuccess  {string}    data.album.Files.ObjectId               文件id
 * @apiSuccess  {string}    data.album.Files.Seq                    文件大小
 * @apiSuccess  {string}    data.album.Files.Url                    文件地址
 *
 */
exports.getUserAlbum = async ctx =>{

};

/**
 * @api {get}  /api/v2/social/user/:userId/visitor getVisitorInfo
 * @apiDescription 获取主页访问者  (新增接口)
 *                 <br/><br/>开发者：[庄伦植](mailto:zhuanglunzhi@followme-inc.com)
 * @apiGroup    Account
 *
 * @apiExample Example usage:
 *      GET /api/v2/social/user/9999/visitor?count=8
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "code": "SUCCESS",
 *          "data": {
 *              users : [{
 *                   UserId : 1,
 *                   ViewTime : 9999999,
 *                   ViewTimeDesc : "1分钟前",
 *                   Avatar: "https://static.followme.com/avatar/avatar-151537-2018-07-10-23-40-10-757331.png",
 *              }]
 *          }
 *      }
 *
 * @apiParam    (Parameter: params)  {number}   [userId]            用户id
 * @apiParam    (Parameter: query)  {number}   [count]              获取的相册数,默认8条.取值 1~100
 *
 * @apiSuccess  {string}    code                                    SUCCESS
 * @apiSuccess  {object}    data                                    数据
 * @apiSuccess  {string}    data.users                              用户
 * @apiSuccess  {string}    data.users.UserId                       用户id
 * @apiSuccess  {string}    data.users.ViewTime                     访问时间
 * @apiSuccess  {string}    data.users.ViewTimeDesc                 访问时间描述
 * @apiSuccess  {string}    data.users.Avatar                       用户头像
 *
 */
exports.getVisitorInfo = async ctx =>{

};

/**
 * @api {get}  /api/v2/trade/user/:userId/follows getFollowRelation
 * @apiDescription 获取指定用户,他跟随或跟随他的数据  (新增接口)
 *                 <br/><br/>开发者：[庄伦植](mailto:zhuanglunzhi@followme-inc.com)
 * @apiGroup    Account
 *
 * @apiExample Example usage:
 *      GET /api/v2/trade/user/9999/follows
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "code": "SUCCESS",
 *          "data": {
 *              from : [{
 *                  BrokerId : "",
 *                  BrokerName : "",
 *                  Account : "",
 *                  AccountIndex : 1,
 *                  FollowCount : 100
 *              }],
 *              to : [{
 *                   BrokerId : "",
 *                   BrokerName : "",
 *                   Account : "",
 *                   AccountIndex : 1
 *              }]
 *          }
 *      }
 *
 * @apiParam    (Parameter: params)  {number}   [userId]             用户id
 *
 * @apiSuccess  {string}    code                                    SUCCESS
 * @apiSuccess  {object}    data                                    数据
 * @apiSuccess  {string}    data.from                               跟随他账户的数据
 * @apiSuccess  {string}    data.from.BrokerId                      账号经纪商家id
 * @apiSuccess  {string}    data.from.BrokerName                    账号经纪商名称
 * @apiSuccess  {string}    data.from.Account                       账号
 * @apiSuccess  {string}    data.from.AccountIndex                  账号索引
 * @apiSuccess  {string}    data.from.FollowCount                   该账号跟随总数
 * @apiSuccess  {string}    data.to                                 他跟随别人的账户数据
 * @apiSuccess  {string}    data.to.BrokerId                        账号经纪商家id
 * @apiSuccess  {string}    data.to.BrokerName                      账号经纪商名称
 * @apiSuccess  {string}    data.to.Account                         账号
 * @apiSuccess  {string}    data.to.AccountIndex                    账号索引
 *
 */
exports.getFollowRelation = async ctx =>{

};

/**
 * @api {post}  /api/v2/social/user/save/flags saveNotifyFlag
 * @apiDescription 保存通知标签[需要登录]  (新增接口)
 *                 <br/><br/>开发者：[庄伦植](mailto:zhuanglunzhi@followme-inc.com)
 * @apiGroup    Account
 *
 * @apiExample Example usage:
 *      GET /api/v2/social/user/save/flags
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "code": "SUCCESS",
 *          "data": {
 *              ok : true
 *          }
 *      }
 *
 * @apiParam    (Parameter: body)  {string}   [flags]               JSON字符串
 *
 * @apiSuccess  {string}    code                                    SUCCESS
 * @apiSuccess  {object}    data                                    数据
 * @apiSuccess  {string}    data.ok                                 是否保存成功
 *
 */
exports.saveNotifyFlag = async ctx => {

};



/*
1.(Update)获取用户基本信息                    getUserInfo
    注:返回结果集增加属性 Score(当前用户最高交易员能力值)         http://dev.fmfe.com/docs/dev/#api-Account-GetV1AccountUsersId
2.(New)获取常交易的品种                       getTraderSymbol
3.(New)获取关注的经纪商                       getAttentionBrokers
4.(New)获取微博相册                           getUserAlbum
5.(New)获取访问用户数据                       getVisitorInfo
6.(New)获取跟随关系                           getFollowRelation
7.(Update)交易概览接口                        getStatisticsOfAccount         http://dev.fmfe.com/docs/dev/#api-Follow-getStatisticsOfAccount
    注:返回结果集增加属性 BingFlag(绑定标签)、BrokerId、BrokerName(经纪商)
8.(New)保存通知标签                           saveNotifyFlag
*/
