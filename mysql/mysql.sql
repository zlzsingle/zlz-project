-- mysql 命令大全
-- https://www.yiibai.com/mysql/mysqltips.html

--选择数据库
use 'databasename';

--查看mysql安装目录
select @@basedir from dual;

-- 查看mysql版本号
select version();

--ifnull函数
select ifnull(id,1) from `user`;

--分组连接函数 group_concat()
select group_concat(code) from user group by pass;

--声明变量
declare a int ;

--创建数据库
create database 'name';

--删除数据库
drop database 'databasename'

-- 重构表
truncate table table_name;

--触发器
drop trigger if exists trigger_name;
create trigger trigger_name
after delete on tab1
for each row
begin
      delete from tab2 where tab2_id=old.tab1_id;
end;

--显示所有表
show tables;

-- 显示所有触发器
show triggers;

-- 显示表的列
show columns from [table_name];

--mysql修改密码命令
set password for 'root'@'localhost'=password('newPassword');

-- mysql 临时结果集
select * from (
  select 10000 as login  union all
  select 10001 as login  union all
  select 10002 as login
) t

-- mysql 创建临时表, session 一断开,temp临时表就失效.存在内存里
create temporary table temp_table (
    id int not null,
    name varchar(256) not null
)

create temporary table temp_table
    select 10000 as login union
    select 10001 as login union
    select 10002 as login

create temporary table temp_talbe
    select id,name from table_name;

-- 判断临时表是否存在,不存在则创建
create temporary table if not exists temp_table
    select id,name from table_name

-- mysql 数据增量更新
insert into ${tablename} (login) values (123123),(456456) on duplicate key update login=login

-- mysql 锁表
lock tables tab_name read;
