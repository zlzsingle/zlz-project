#!/usr/bin/env bash

# 启动数据库
docker run -d --name local-mysql -p 3306:3306 --restart=always -e MYSQL_ROOT_PASSWORD=123456 mysql:8.0

docker stop jira

docker rm jira

rm -rf /root/jira-data

docker run \
  -e ATL_JDBC_URL="jdbc:mysql://172.24.120.4:3306/jira?useUnicode=true&amp;characterEncoding=UTF8&amp;sessionVariables=default_storage_engine=InnoDB" \
  -e ATL_JDBC_USER="root" \
  -e ATL_JDBC_PASSWORD="123456" \
  -e ATL_DB_DRIVER="com.mysql.cj.jdbc.Driver" \
  -e ATL_DB_TYPE="mysql8" \
  -v /root/jira-data:/var/atlassian/application-data/jira \
  --name="jira" \
  -d -p 8080:8080 \
  atlassian/jira-software:8.14.0-RC01-jdk11

docker stop jira

docker cp /root/mysql-connector-java-8.0.15.jar jira:/opt/atlassian/jira/lib

docker cp /root/mysql-connector-java-5.1.47.jar jira:/opt/atlassian/jira/lib

docker restart jira
