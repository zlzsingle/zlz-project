// pm2 start {js path} --name {app name} 开启
// pm2 restart {name id} 重启
// pm2 stop {name id}    停止
// pm2 delete {name id}  删除
// pm2 flush {name id}  清理日志
// pm2 start {name id path} --name {name} -- param1 param2 param3 启动时传参给进程
// pm2 startup
// pm2 resurrect 复活
// pm2 ecosystem 生成ecosystem.json.js文件
// pm2 start npm -- start  运行npm的start
// pm2 start npm --run <scriptname>  运行package的脚本

// https://blog.csdn.net/gong1422425666/article/details/74943073  pm2 deploy 部署

// https://blog.csdn.net/cs380637384/article/details/82682799

/*
    pm2自动化部署
        1.确保服务器可以正常clone项目，将ssh密钥加入gitlab或github.
        2.在本地配置服务器上的ssh配置，修改.ssh/config文件
            Host server-name
            HostName             192.168.xx.xx
            User                 suser
            PubkeyAuthentication yes

        3.执行ssh-copy-id server-name

        4.在项目里创建ecosystem.json文件
            {
                "apps" : [
                    {
                        "name" : "project-name",
                        "script" : "dist/main.js",
                        "max_memory_restart" : "800M",
                        "env" : {
                            "NODE_ENV" : "dev"
                        },
                        "env_prod" : {
                            "NODE_ENV" : "production"
                        }
                    }
                ],
                "deploy" : {
                    "dev" : {
                        "user" : "suser",
                        "host" : "192.168.xx.xx",
                        "ref" : "origin/master",
                        "repo" : "git@gitlab.xxxx.xxx:groupName/project.git",
                        "path" : "~/www/project",
                        "post-deploy" : "~/.nvm/nvm.sh && nvm use 10.9 && yarn && npm run test && pm2 start ecosystem.json --env dev"
                    }
                }
            }

        5.登录server-name服务器,创建项目目录. mkdir -p ~/www/project

        6.回到本地,进入项目目录执行
            pm2 deploy ecosystem.json dev setup
            pm2 deploy ecosystem.json dev --force

*/
