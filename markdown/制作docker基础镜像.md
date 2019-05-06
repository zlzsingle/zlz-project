# 制作docker基础镜像

## node镜像

- 1.拉取ubuntu

```bash
    docker pull ubuntu:16.04
```

- 2.执行ubuntu

```bash
    docker run -ti --name ubuntu ubuntu:16.04
```

- 3.安装node环境
```bash
    # 源码安装node
    
    # 1.从nodejs.org上下载
    wget https://nodejs.org/dist/v10.9.0/node-v10.9.0.tar.gz      
    
    # 2.从宿主机拷贝到容器里
    docker cp node-v10.9.0.tar.gz 4e481178cd60:/root/
    
    # 3.进入容器内
    docker exec -it ubuntu bash
    
    # 4.解压node-v10.9.0.tar.gz
    tar zxvf node-v10.9.0.tar.gz
    
    # 5.进入node-v10.9.0,执行configure,执行之前要安装一些依赖
    cd node-v10.9.0
    apt update
    apt install python
    apt install g++ 
    ./configure
    
    # 6.安装,这个过程有点慢
    make && make install 
    
    # 7.测试node是否安装成功
    node -v
```

- 4.压缩容器
```bash
    # 卸载掉多余的依赖.以下命令容器内执行
    apt remove python           // 删除 Python
    apt remove g++              // 删除 g++
    apt autoremove              // apt清理
    rm -rf node-v10.9.0         // 删除多余文件
    rm -rf /var/lib/apt/lists/* // 清理掉apt安装的文件
```

- 5.打包镜像
```bash
    docker commit -a 'auth name' -m 'commit info' 4e481178cd60 xxx/node:v1
    # 4e481178cd60 --> containerId
    # xxx/node:v1  --> 自定义容器名称
```

- 6.推送镜像
```bash
    # 登录
    docker login -u username docker.io.com
    
    # 推送镜像
    docker push xxx/node:v1
    
    # 推送成功之后,拉取测试一下
    docker pull xxx/node:v1
```
