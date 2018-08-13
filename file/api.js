/**
 * @api {get}  /api/v1/account/users/:id getUserAccounts
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
exports.getUserAccounts = async ctx =>{

};
