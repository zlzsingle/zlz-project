# mongo数据库


- 数据库备份

```bash
    mongodump  -h 127.0.0.1 --port 27017 -d yapi -o ./  
```

- 数据库恢复

```bash
    mongorestore -h localhost:27018 -d yapi ./yapi
```

