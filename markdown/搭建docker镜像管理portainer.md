### 搭建docker镜像管理portainer

- 拉取portainer镜像

```bash
    docker pull portainer/portainer
```

- 运行portainer

```bash
    docker run -d -p 9000:9000 --name docker-dashboard -v /var/run/docker.sock:/var/run/docker.sock portainer/portainer
```
