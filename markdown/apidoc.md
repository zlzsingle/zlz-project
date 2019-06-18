# 接口文档规范

### url定义

整个URL必须包含 **`/前缀/版本/项目/模块/接口`** ，全部采用 **小写字母命名**，**不要有特殊字符**

- 前缀： 分为`api`和`app`，用于区分`web`和`app`的接口
- 版本： 项目的版本号，例: `/v1`、`/v2`、`/v3`等
- 项目： 当前项目的名称，例: `/trade`、`/social`等
- 模块： 本项目接口对应的项目模块，例: `/account`、`/broker`等
- 接口： 当前接口的名称，**可分为多层**，例: `/sambind`、`/:userId/settings`等

```bash
# web的url定义举例

/app/v2/trade/user/:userId/settings

/api/v2/trade/account/sambind 

/api/v3/social/blogs/like

```

### 请求参数

### 响应数据

### 接口描述