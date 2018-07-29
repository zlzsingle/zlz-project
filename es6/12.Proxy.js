// http://es6.ruanyifeng.com/#docs/proxy
// 1.概述，Proxy用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”
var obj = new Proxy({}, {
    get: function (target, key, receiver) {
        console.log(`getting ${key}!`);
        return Reflect.get(target, key, receiver);
    },
    set: function (target, key, value, receiver) {
        console.log(`setting ${key}!`);
        return Reflect.set(target, key, value, receiver);
    }
});






