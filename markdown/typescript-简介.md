#TypeScript

##简介

###什么是TypeScript

JavaScript的超集,主要提供了**类型系统**和**ES6**的支持.是由微软开发维护,源码放在[github](https://github.com/Microsoft/TypeScript)上

####为什么选择TypeScript

1. 类型定义明确,代码可读性大大提高
2. 开发或编译阶段就能发现大部分错误
3. 非常包容,**.js**直接更为**.ts**
4. 拥有活跃的社区,有大量的第三方库

####TypeScript的缺点

1. 前端开发人员转入有成本,需要理解接口(Interfaces),泛型(Generics),类(Class),枚举(Enums)概念
2. 可能一些第三方库的结合不是很完美

###安装TypeScript

TypeScript安装命令工具如下:

```bash
    npm install -g typescript
```

以上命令会在全局安装 **tsc** 命令

```bash
    # 输出文件
    tsc --outFile dist.js source.ts
    
    # build
    tsc --build tsconfig.json
```

###Hello TypeScript

我们从一个简单的例子开始, 创建一个`hello.ts`文件

```typescript
    let num: number = 1 ;
    let str: string = 'student' ;
```

让后我们执行一下命令

```bash
    tsc --outFile ./hello.js ./hello.ts
```

然后让我们看下`hello.js`

```javascript
    var num = 11;
    var str = 'student';
```
