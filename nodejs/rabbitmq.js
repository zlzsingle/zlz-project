let index = 1;
const q = 'notifications';
const moment = require('moment');

function bail(err) {
    console.error(err);
    process.exit(1);
}

// Publisher
function publisher(conn) {
    conn.createChannel((err, ch) => {
        if (err != null) {
            bail(err);
        }
        const msg = `${moment().format('YYYY-MM-DD HH:mm:ss')} 发布消息`;
        ch.assertQueue(q);
        ch.sendToQueue(q, Buffer.from(msg));
        console.log('发布成功!');
        ch.close();
    });
}

function consumer(conn) {
    // const q = 'Qa';
    conn.createChannel((err, ch) => {
        if (err != null) {
            bail(err);
        }
        ch.assertQueue(q, { durable: true, autoDelete: false });
        ch.consume(q, function (msg) {
            console.log(`我消费到东西${index++}`)
            if (msg !== null) {
                console.log(msg.content.toString());
                ch.ack(msg);
            }
            ch.close();
        });
    });
}

require('amqplib/callback_api').connect({
    protocol: 'amqp',
    hostname: '127.0.0.1',
    port: 5672,
    username: 'hzt',
    password: 'hzt123456',
    locale: 'en_US',
    frameMax: 0,
    heartbeat: 0,
    vhost: '/',
}, function (err, conn) {
    if (err != null) {
        bail(err);
    }

    // 消费
    consumer(conn);

    // 生产
    setInterval(() =>{
        publisher(conn);
    }, 3000);
});


