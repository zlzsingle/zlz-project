# linux用户操作

### 用户组操作

- 查看所有用户组

```bash
    cat /etc/group
```

- 新建用户组

```bash
    # -g 344 指定用户组id为344
    # grouptest 用户组名为grouptest
    sudo groupadd -g 344 grouptest
```

- 删除用户组

```bash
    sudo groupdel grouptest
```


### 用户操作

- 查看所有用户

```bash
    cat /etc/passwd
```

- 新建用户

```bash
    # 创建用户并指定id
    sudo useradd test -u 544
```

- 修改密码

```bash
    # 修改用户密码
    passwd
```

- 分配用户组

```bash
    # 将用户加入到一个用户组
    # docker --> groupName 
    # test --> userName
    sudo usermod -a -G docker test
```

- 取消用户组

```bash
    # 将用户从组中移除
    # test --> userName
    # docker --> groupName
    sudo gpasswd -d test docker
```

- 锁定用户

```bash
    sudo usermod -L test
```

- 解锁用户

```bash
    sudo usermod -U test
```