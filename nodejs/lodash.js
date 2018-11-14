const _ = require('lodash');
const a = [
    {age: 20},
    {age: 31},
    {age: 15},
    {age: 4}
];

const age = _.sumBy(a, 'age');
console.error('age :', age); // 70

const item1 = _.find(a, {age: 31});
console.error('item1 : ', JSON.stringify(item1)); // {age : 31}

const item2 = _.find(a, {age: 32});
console.error('item2 : ', JSON.stringify(item2)); // undefined

const filter = _.filter(a, i => i.age % 2 === 0);
console.error('filter : ', JSON.stringify(filter)); // [{"age":20},{"age":4}]
