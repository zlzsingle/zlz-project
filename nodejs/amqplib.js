const amqplib = require('amqplib');

const config = {
    protocol: 'amqp',
    hostname: '127.0.0.1',
    port: 5672,
    username: 'user',
    password: 'password',
    frameMax: 0,
    heartbeat: 0,
    vhost: '/test/',
}

const queue = 'student';

// 创建消息
async function producer() {

    const amqp = await amqplib.connect(config);

    const ch = await amqp.createChannel();

    await ch.assertQueue(queue, {durable: true, autoDelete: true});

    const message = Buffer.from(
        JSON.stringify({
            student: Date.now()
        })
    );

    const options = {
        // contentType: 'JSON',
        deliveryMode: true,
        // userId: Date.now().toString(8),
        mandatory: true,
        contentEncoding: 'UTF-8',
        // persistent: boolean,
        // headers: any,
        // priority: number,
        // correlationId: string,
        // replyTo: string,
        messageId: Date.now().toString(12),
        timestamp: Date.now(),
        // type: string,
        appId: 'appId',
    }

    const ok = ch.sendToQueue(queue, message, options);

    await ch.close();

    amqp.close();

    console.log(`发送队列${queue} ${ok}`);

}

// 消费消息
async function consumer() {

    const amqp = await amqplib.connect(config);

    const ch = await amqp.createChannel();

    const result = await ch.assertQueue(queue, {durable: true, autoDelete: true});

    console.log('result : ', result);

    ch.consume(queue, async msg => {

        console.log('msg : ', msg);

        console.log('msg.content : ', msg.content.toString());

        ch.ack(msg);

    });
}

(async () => {
    const type = process.env.TYPE;

    switch (type) {
        case 'producer':
            await producer();
            break;
        case 'consumer':
            await consumer();
            break;
        default:
            break;
    }
})();

