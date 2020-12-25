## SSH总结

- 生成ssh秘钥
```
ssh-keygen -t rsa -C "xxxxx@gmail.com"
```

- 将生成的公钥生成copy到目标主机上，下次免密登录
```
ssh-copy-id -i ./id_rsa.pub username@192.168.x.xxx
```

- .ssh/authorized_keys

- .ssh/known_hosts

- .ssh/config 
```
Host            [别名]
HostName        [ip地址]
User            [用户]
IdentityFile    [认证文件]
Port            [端口]
ProxyCommand    [代理命令]
```

- ssh连接
```
ssh server-name -o serveraliveinterval=60
```
