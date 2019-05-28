# Dockerfile命令

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

    MAINTAINER xxxxx@qq.com


**(3). RUN(执行命令)**

构建指令 : RUN可以运行任何被基础image支持的命令

    RUN <command>

    RUN apt install xxx


**(4). CMD(设置container启动时执行的操作)**

设置指令 : Dockerfile中只能有一个CMD指令。 如果你指定了多个，那么最后个CMD指令是生效的。

    CMD <command>

    CMD npm start

**(5). ENTRYPOINT(设置container启动时执行的操作)**

设置指令 : 指定容器启动时执行的命令,可以多次设置．但是只有最后一个有效．

    ENTRYPOINT ["executable", "param1", "param2"]


**(6). USER(设置container的用户)**

设置指令 : 设置容器启动的用户,默认是root用户.

    ENTRYPOINT ["docker"]
    USER zhangsan
    # or
    ENTRYPOINT ["docker", "-u", "zhangsan"]


**(7). EXPOSE(暴露容器端口给宿主机)**

设置指令 : 该指令向宿主机暴露容器的端口,可以一次暴露多个

    EXPOSE port [<port>...]
    EXPOSE 8000 8001 8002 8003

**(8). ENV(用于设置环境变量)**

设置指令 : 设置容器的环境变量

    ENV <key> <value>

    ENV NODE_ENV=dev


**(9). ADD(从src复制到container的desc路径)**

设置指令 :　更高级的复制文件

    ADD : <source> <desc>


**(10). VOLUME(指定挂载点)**

设置指令 : 创建一个可以从本地主机或其他容器挂载的挂载点，一般用来存放数据库和需要保持的数据等。

    VOLUME ['/data']


**(11). WORKDIR(指定工作目录)**

设置指令 : 指定容器的工作目录

    WORKDIR /app


**(12). ONBUILD(为他人做嫁衣裳)**

设置指令 :　ONBUILD 的作用就是让指令延迟執行，延迟到下一个使用 FROM 的 Dockerfile 在建立 image 时执行，只限延迟一次

    ONBUILD <command>

    ONBUILD npm install 


**(13). COPY(复制本地主机的src文件到container的dest)**

设置指令 : 将文件从路径 src 复制添加到容器内部路径 dest

    COPY <command>

    COPY . /app/


**(14). ARG(构建参数)**

设置指令 : 与`ENV`效果一样,都是设置环境变量.区别在于,将来容器运行时是不会存在这些环境变量的

    ARG <key> <value>

    ARG NODE_ENV=dev


**(15). LABEL(定义标签)**

设置指令 : 用于为镜像添加元数据,元数据以key/value的形式

    LABEL <key> <value> <key> <value>

    LABEL name=zhangsan age=18