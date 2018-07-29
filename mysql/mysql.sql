-- mysql 命令大全

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

