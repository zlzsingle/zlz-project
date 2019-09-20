// https://www.html.cn/doc/lodash/

const _ = require('loadsh');


function main() {
    // 数组去重
    _.uniq([11, 11]);

    // 数组遍历, false中断
    _.forEach([1, 2, 3, 4], (item, index) => {
        return item % 2 === 0;
    });

    // 对象遍历
    _.forEach({a: 1, b: 2}, function (value, key) {
        console.log('item : ', value, ' key :', key);
    });

    // 数组过滤 return false 过滤
    _.filter([1, 2, 3, 4, 5], (item, index) => {
        return index % 2 === 0;
    });

    // 对象过滤 return false 过滤
    _.filter({a: 1, b: 2, c: 3}, (value, key) => {
        return value % 2 === 0;
    });
}
