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


