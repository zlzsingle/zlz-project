const {Wechaty} = require('wechaty');

//  二维码生成
function onScan (qrcode, status) {
    require('qrcode-terminal').generate(qrcode)  // 在console端显示二维码
    const qrcodeImageUrl = [
        'https://api.qrserver.com/v1/create-qr-code/?data=',
        encodeURIComponent(qrcode),
    ].join('')
    console.log(qrcodeImageUrl)
}

// 登录
async function onLogin(user) {
    console.log(`贴心小助理${user}登录了`)
}

//登出
function onLogout(user) {
    console.log(`${user} 登出`)
}

// 自动加群功能
function onMessage(msg) {
    console.log('message : ', msg);
}


function main() {
    const bot = new Wechaty();

    bot.on('scan', onScan);
    bot.on('login', onLogin);
    bot.on('logout', onLogout);
    bot.on('message', onMessage);

    bot.start()
        .then(() => console.log('开始登陆微信'))
        .catch(e => console.error(e))
}

main();
