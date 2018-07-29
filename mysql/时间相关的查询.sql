-- 日期相关的查询

--查看本地时间
select now() from dual;

-- http://www.cnblogs.com/benefitworld/p/5832897.html
-- 查询“今天”的记录
select * from [table_name] where to_days([column_name]) = to_days(now());

-- 查询“昨天”的记录
select * from [table_name] where to_days( now() ) - to_days([column_name]) <= 1;

-- 查询近“7天”的记录
select * from [table_name] where date_sub(curdate(), interval 7 day) <= date([column_name])

-- 查询近“30天”的记录
select * from [table_name] where date_sub(curdate(), interval 30 day) <= date([column_name]);

-- 查询“本月”的记录
select * from [table_name] where date_format([column_name], '%y%m' ) = date_format( curdate( ) , '%y%m' );

-- 查询“上一月”的记录
select * from [table_name] where period_diff( date_format( now() , '%y%m' ) , date_format( [column_name], '%y%m' ) ) =1;