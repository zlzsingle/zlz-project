(function () {
    var rs, deep, limited;
    var qs = require("qs");

    rs = qs.stringify({name: "student", age: 18});
    console.error("rs1 : ", rs); //name=student&age=18

    rs = qs.parse('foo[bar][baz]=foobarbaz');
    console.error("rs2 : ", rs); // { foo: { bar: { baz: 'foobarbaz' } } }

    deep = qs.parse('a[b][c][d][e][f][g][h][i]=j', {depth: 0});
    console.error(JSON.stringify(deep));
    // {"a":{"[b][c][d][e][f][g][h][i]":"j"}} ==> depth=0

    deep = qs.parse('a[b][c][d][e][f][g][h][i]=j', {depth: 1});
    console.error(JSON.stringify(deep));
    // {"a":{"b":{"[c][d][e][f][g][h][i]":"j"}}} ==> depth=1

    deep = qs.parse('a[b][c][d][e][f][g][h][i]=j', {depth: 2});
    console.error(JSON.stringify(deep));
    // {"a":{"b":{"c":{"[d][e][f][g][h][i]":"j"}}}} ==> depth=2

    limited = qs.parse('a=b&c=d', {parameterLimit: 1});
    console.error(JSON.stringify(limited)); // 默认解析1000个参数,设置解析的参数 parameterLimit
})();