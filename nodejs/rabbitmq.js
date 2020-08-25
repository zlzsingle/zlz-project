let index = 1;
const q = 'test';

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
        ch.assertQueue(q);
        ch.sendToQueue(q, Buffer.from('something to do'));
        console.log('发布成功!');
    });
}

function consumer(conn) {
    conn.createChannel((err, ch) => {
        if (err != null) {
            bail(err);
        }
        ch.assertQueue(q, { durable: true, autoDelete: true });
        ch.consume(q, function (msg) {
            console.log(`我消费到东西${index++}`)
            if (msg !== null) {
                console.log(msg.content.toString());
                ch.ack(msg);
            }
        });
    });
}

require('amqplib/callback_api').connect({
    protocol: 'amqp',
    hostname: '127.0.0.1',
    port: 5672,
    username: 'username',
    password: 'password',
    locale: 'en_US',
    frameMax: 0,
    heartbeat: 0,
    vhost: '/vhost/',
}, function (err, conn) {
    if (err != null) {
        bail(err);
    }

    // 消费
    consumer(conn);

    // 生产
    setInterval( () =>{
        publisher(conn);
    }, 3000);
});


