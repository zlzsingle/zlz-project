const transliteration = require('transliteration');

const a = transliteration.transliterate('你好，世界'); // Ni Hao ,Shi Jie
const b = transliteration.slugify('你好，世界'); // ni-hao-shi-jie
const c = transliteration.slugify('你好，世界', {lowercase: true, separator: ''}); // nihaoshijie
const d = transliteration.slugify('你好，世界', {lowercase: false, separator: '_'}); // Ni_Hao_Shi_Jie

console.info(a);
console.info(b);
console.info(c);
console.info(d);
