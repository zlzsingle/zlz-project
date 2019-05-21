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


```bash
# 例如本机所有的image文件
docker images 
# 或
docker image ls 

# 删除image文件
docker rmi [imageId]
docker rmi [imageName]
docker image rm [imageName]
```
