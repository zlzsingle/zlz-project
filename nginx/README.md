# Nginx

## 基本

- ubuntu安装

```bash
    apt install nginx 
```

- mac安装
```bash
    # 1. 安装nginx 
    brew install nginx

    # 2. 检查是否安装成功
    cd /usr/local/Cellar/nginx/1.19.0/bin && ./nginx

    # 3. 浏览器访问 localhost:8080

    # 4. 配置环境变量
    vim /etc/profile 

    # 5. 最底加入
    export PATH=$PATH:/usr/local/Cellar/nginx/1.19.0/bin

    # 6. 立即生效
    source /etc/profile
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
    
    # 测试语法是否有误(查看配置文件地址)
    nginx -t     
    
    # 查看帮助
    nginx -h 
    
    # 查看版本
    nginx -v
```

- 配置文件说明

```
    # 负载均衡配置
    upstream testserver {
        server 127.0.0.1:7007;
        server 127.0.0.1:7008;
    }

    # 负载均衡策略(默认:轮询 round robin)
    upstream testround {
        server 127.0.0.1:7007;
        server 127.0.0.1:7008;
    }

    # 负载均衡策略(随机 random)
    upstream testrandom {
        random; 
        server 127.0.0.1:7007;
        server 127.0.0.1:7008;
    }

    # 负载均衡策略(权重 weight)
    upstream testweight {
        server 127.0.0.1:7007 weight=5;
        
        # 默认为不配置权重为1
        server 127.0.0.1:7008;
    }

    # 负载均衡策略(ip配置 ip_hash)
    upstream testiphash {
        ip_hash;
        server 127.0.0.1:7007;
        server 127.0.0.1:7008;
    }
    
    # 负载均衡策略(最小连接数 least_conn)
    upstream testleastconn {
        least_conn;
        server 127.0.0.1:7007;
        server 127.0.0.1:7008;
    }

    # http配置
    server {
        listen       80;                    # 监听的端口                                                   
        server_name  service.name.com;      # 服务域名

        location / {
            
            # 反向代理
            proxy_pass http://testserver/;
            proxy_set_header Host $host:$server_port;

            # websocket的配置
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
        }
    }

    # https配置
    server {
       listen       443 ssl;
       server_name  www.xxxxx.com;

       ssl_certificate      ~/files/1_www.xxxxx.com_bundle.crt;
       ssl_certificate_key  ~/files/2_www.xxxxx.com.key;

       ssl_session_cache    shared:SSL:1m;
       ssl_session_timeout  5m;

       ssl_ciphers  HIGH:!aNULL:!MD5;
       ssl_prefer_server_ciphers  on;

       location / {
           proxy_pass http://127.0.0.1:3000/;
           proxy_set_header Host $host:$server_port;
       }
    }

```
