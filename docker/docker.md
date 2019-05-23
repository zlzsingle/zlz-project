# Docker

## 一、什么是docker
- 1.**docker**是一个容器,是为了实现轻量级系统虚拟化而推出的一款解决方案产品
- 2.**docker**属于Linux容器的一种封装,提供简单易用的容器使用接口.


## 二、docker的主要用途
- 1.提供一次性的环境. 比如,构建统一的部署环境
- 2.提供弹性的云服务. 因为docker容器可以随时开关,很适合动态扩容和缩容
- 3.组建微服务架构.


## 三、docker的安装
- [Mac](https://docs.docker.com/docker-for-mac/install/)
- [Windows](https://docs.docker.com/docker-for-windows/install/)
- [Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
- [Debian](https://docs.docker.com/install/linux/docker-ce/debian/)
- [CentOS](https://docs.docker.com/install/linux/docker-ce/centos/)

```bash
#安装完成之后查看
docker version
```

**docker**需要用户具有sudo权限,可以把用户加入docker用户组[官方文档](https://docs.docker.com/install/linux/linux-postinstall/#manage-docker-as-a-non-root-user)


```bash
sudo usermod -aG docker $USER
```


**docker**是服务器--客户端架构.命令行运行docker命令的时候,需要本机有**docker**服务.如果这项服务没有启动,可以用下面命令启动


```bash
sudo service docker start

sudo systemctl start docker
```


## 四、image文件
**docker把应用程序及其依赖,打包在image文件里面.**只有通过这个文件,才能生成docker容器.image文件可以看作是容器的模板.docker根据image文件才能生成容器的实例.同一个image文件,可以生成多个同时运行的容器实例.

**image** 是二进制文件.实际开发中,一个 **image** 文件往往通过继承另一个 **image** 文件,加上一些个性化设置而生成.  [**举例**](https://www.zlzsingle.com/2019/05/09/%E5%88%B6%E4%BD%9Cdocker%E9%95%9C%E5%83%8F-node/) 来说,你可以基于```ubuntu```的**image**基础上,安装```node```环境.形成自己的**image**

**image** 文件是通用的,一台机器的 **image** 文件拷贝到另一台机器,照样可以使用.通常使用 ``` docker save [option] [imageName] ``` 可以将镜像保存为.tar的文件

```bash
# 例如本机所有的image文件
docker images 
# 或
docker image ls 

# 删除image文件
docker rmi [imageId]
docker rmi [imageName]
docker image rm [imageName]

# 将image保存为文件
docker save -o filename.tar [imageName]

# filename.tar文件可以拷贝到其他机器上,重新load
docker load -i filename.tar 
```


## 五、实例: ubuntu

1.拉取ubuntu16.04的镜像

```bash
# 拉取node镜像
docker pull ubuntu:16.04
# or 
docker image pull ubuntu:16.04
```


2.基于ubuntu镜像启动一个容器

```bash
# 以交互模式运行容器
docker run -it --name ubuntu ubuntu:16.04

# 后台运行容器
docker run -d --name ubuntu ubuntu:16.04 
```


3.查看正在运行的容器

```bash
# 查看所有容器,包括未运行的
docker ps -a 
# or 
docker container ls -a

# 查看所有正在运行的容器
docker ps 
# or
docker container ls 
```


4.进入正在运行的容器内

```bash
docker exec -it ubuntu
```

5.启动/停止/重启/删除容器

```bash
# 启动容器 docker start [containerName]
docker start ubuntu

# 停止容器 docker stop [containerName]
docker stop ubuntu

# 重启容器 docker stop [containerName]
docker restart ubuntu 

# 删除容器 docker rm [containerName] 注:删除前要停止容器
docker rm ubuntu
```


6.删除镜像

```bash
# 删除image之前,要确保这个容器没有被使用
docker rmi ubuntu:16.04
```


## 六、制作Dockerfile

### 描述
> Dockerfile是一种被Docker程序解释的脚本,Dockerfile由一条一条的指令组成,没条指令对应Linux下面的一条命令.
>
> Docker程序将Dockerfile指令翻译成真正的Linux命令.
>
> Dockerfile有自己书写格式和支持的命令,Docker程序解决这些命令间的依赖关系.


### Dockerfile的书写规则及指令使用方法

> Dockerfile是忽略大小写的,建议用大写
>
> 使用```#```作为注释,每一行只支持一条指令,每条指令可以携带多个参数
>
> Dockerfile的指令根据作用可以分为两种,**构建指令和设置指令**
   >> **构建指令** : 用于构建image
   >>
   >> **设置指令** : 用于设置image的属性

</br>
**(1). FROM(指定基础image)**

构建指令 : 必须且在Dockerfile的最前面,该指令会优先从本地仓库查找,如果本地仓库没有,就默认从远程仓库pull
        
        
    FROM IMAGE

    # or

    FROM IMAGE:TAG


**(2). MAINTAINER(用来指定镜像创建者信息)**

构建指令 : 用于将image的制作者相关的信息写入到image中.当我们对该image执行docker inspect命令时，输出中有相应的字段记录该信息。


    MAINTAINER <name>


**(3). RUN(执行命令)**

构建指令 : RUN可以运行任何被基础image支持的命令

    RUN <command>


**(4). CMD(设置container启动时执行的操作)**

设置指令 : 用于container启动时指定的操作

    CMD <command>


**(5). ENTRYPOINT(设置container启动时执行的操作)**

设置指令 : 指定容器启动时执行的命令,可以多次设置．但是只有最后一个有效．

    ENTRYPOINT ["executable", "param1", "param2"]


**(6). USER(设置container的用户)**

设置指令 : 设置容器启动的用户,默认是root用户.

    ENTRYPOINT ["docker"]
    USER zhangsan
    # or
    ENTRYPOINT ["docker", "-u", "zhangsan"]


**(7). EXPOSE(指定容器需要映射到宿主机器的端口)**

设置指令 : 该指令将宿主机的端口和容器的端口打通

    EXPOSE port [<port>...]

**(8). ENV(用于设置环境变量)**

设置指令 : 设置容器的环境变量

    ENV <key> <value>


**(9). ADD(从src复制到container的desc路径)**


**(10). VOLUME(指定挂载点)**


**(11). WORKDIR(指定工作目录)**


**(12). ONBUILD(在子镜像中执行)**


**(13). COPY(复制本地主机的src文件到container的dest)**


**(14). ARG(设置构建镜像时的变量)**


**(15). LABEL(定义标签)**