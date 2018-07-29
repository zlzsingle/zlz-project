/*
    1.NodeJs如何连接数据库?
    2.mysql的应用?
    3.query能否执行多条sql语句?
    4.事务如何处理?
*/

let dbConfig = {
    user: "root",
    password: "zhuang123",
    host: "localhost",
    port: "3306",
    database: "koa_db",
    typeCast: true,
    dateStrings: true
    // stringifyObjects: true
};

//1.安装：npm install mysql
//2.创建连接
/*
    //创建连接
    createConnection({
        host : "192.168.1.1", //数据库地址
        port : "3306", //端口
        user : "root", //连接数据库用户
        password : "xxxxx", //用户密码
        database : "db", // 数据库名称
        charset : "UTF8_GENERAL_CI", //连接字符集
        localAddress : "", //TCP连接源地址
        socketPath :"", //  连接到UNIX域套接字的路径。当使用主机和端口时被忽略
        timezone : "local", //MySQL服务器上配置的时区。这用于将JavaScript日期/时间值转换为JavaScript日期对象，反之亦然。这可以是“局部”，“z”，或者是在表格+HH:mm或-HH:mm中的偏移。（默认：“local”）
        connectTimeout : "10000", //在连接到MySQL服务器的过程中发生超时之前的毫秒。(默认值：10000)
        stringifyObjects : false, //简化对象
        insecureAuth : false, //允许连接到要求旧的(不安全)身份验证方法的MySQL实例
        typeCast : true, //确定列值是否应转换为本机JavaScript类型
        queryFormat : Function, //自定义查询函数
        supportBigNumbers : false, //在处理数据库中的大数（双整数和十进制列）时，应启用此选项
        bigNumberStrings : false,
        dateStrings : false, //强制日期类型（时间戳、日期时间、日期）作为字符串返回，而不是膨胀成JavaScript日期对象。可以是真/假或类型名称数组作为字符串保持。
        debug : false, //调试模式
        trace : false,
        multipleStatements : false, //允许每次查询多个MySQL语句。小心这一点，它会增加SQL注入攻击的范围
        flags : false, //使用默认默认值的连接标志列表。黑名单也有可能被列入黑名单。有关更多信息，请检查连接标志
        ssl : SSL option, //https://github.com/mysqljs/mysql#ssl-options
    });

    //开始连接
    connect();

    //查询
    query();

    //结束
    end();

    function createConnection() {
        let mysql = require("mysql");
        let conn = mysql.createConnection(dbConfig);

        conn.connect();
        conn.query("select * from users", function (err, rs) {
            if (err) {
                console.error("err :", err);
            } else {
                console.info("rs :", rs);
            }
        });
        conn.end();
    }

    createConnection();
*/
//3.创建连接池
/*
     //创建连接池
     createPool({
        connectionLimit : 10, //最大连接数
        queueLimit : 0, //在从GETCONNECT返回错误之前池将排队的最大连接请求数。如果设置为0，队列连接请求的数量没有限制
        acquireTimeout : 10000, //从连接池获取连接超时时间
        waitForConnections : true, //从连接池获取连接失败后,是否等待继续连接
     });

     //获取连接事件
     pool.on("acquire",function(connection){

     });

     //连接事件
     pool.on('connection', function (connection) {
       connection.query('SET SESSION auto_increment_increment=1')
     });

     //当排队回叫等待可用连接时，池将发出一个入队事件。
     pool.on("enqueue",function(){

     });

     //连接池释放事件
     pool.on("release",function(connection){

     });

     //关闭连接池中的所有连接
     pool.end(function (err) {
      // all connections in the pool have ended
     });

     let mysql = require("mysql");
    let pool = mysql.createPool(dbConfig);

    function createPool() {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.error(err);
            } else {
                connection.query("select * from users", function (err, rs) {
                    if (err) {
                        console.error(err);
                    } else {
                        console.info("rs : ", rs);
                    }
                    connection.release();

                    setTimeout(function () {
                        pool.end(function () {
                            console.error("pool.end ", arguments);
                        });
                    }, 3000);
                });
            }
        });

        pool.on("acquire", function (connection) {
            console.error("acquire threadId :", connection.threadId, Date.now());
        });

        pool.on("connection", function (connection) {
            console.error("connection threadId :", connection.threadId, Date.now());
        });

        pool.on("enqueue", function () {
            console.error("enqueue");
        });
    }

    console.error("createPool");
    createPool();
*/

//4.数据库集群

//5.事务Transactions
/*
    connection.beginTransaction(function(err) {
      if (err) { throw err; }
      connection.query('INSERT INTO posts SET title=?', title, function (error, results, fields) {
        if (error) {
          return connection.rollback(function() {
            throw error;
          });
        }

        var log = 'Post ' + results.insertId + ' added';

        connection.query('INSERT INTO log SET data=?', log, function (error, results, fields) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }
          connection.commit(function(err) {
            if (err) {
              return connection.rollback(function() {
                throw err;
              });
            }
            console.log('success!');
          });
        });
      });
    });
*/