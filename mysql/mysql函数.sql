-- 获取当前数据库系统时间
select now(); -- 2018-11-09 10:54:54

-- 分组连接
select group_concat(1,2,3); -- 123

-- 生成随机数
select rand(); -- 0.9232408888

-- 向上取整数
select ceil(2.2); -- 3

-- 向下取整数
select floor(1.5); -- 1

-- 四舍五入
select round(5.6); -- 6

-- md5加密
select md5(rand() * 10000)　-- d6b6f1fd8ecdb9bd643743236740d557

-- 根据x是正数,负数,0;返回1,-1,0
select sign(10); -- 1

-- 获取平方根
select sqrt(9); -- 3

-- 当前时间戳
select unix_timestamp(now()); -- 1541994931

-- 格式化时间
select date_format(now(),'%Y-%m-%d '); --2018-11-14
select date_format(now(),'%Y-%m-%d %H:%i:%s'); --2018-11-14 11:46:15

-- 时间比较函数
--FRAC_SECOND。表示间隔是毫秒
--SECOND。秒
--MINUTE。分钟
--HOUR。小时
--DAY。天
--WEEK。星期
--MONTH。月
--QUARTER。季度
--YEAR。年
select timestampdiff(day,'2012-08-24','2012-08-30') as day;
