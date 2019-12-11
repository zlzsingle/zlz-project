# Nginx

## 基本

- ubuntu安装

```bash
    apt install nginx 
```

- 常用的命令

```bash
    # 启动
    service nginx start
    
    # 停止
    service nginx stop
    nginx -s stop 
    
    # 重启
    service nginx restart
    nignx -s reopen
    
    # 查看配置文件路径
    nginx -t 

    # 重载配置文件
    nginx -s reload
    
    # 退出
    nginx -s quit
    
    # 测试语法是否有误
    ngixn -t     
    
    # 查看帮助
    nginx -h 
    
    # 查看版本
    nginx -v
```

- 配置文件说明

```editorconfig
    
```
