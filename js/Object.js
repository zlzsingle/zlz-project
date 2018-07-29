(function () {

    function _definedProperty() {
        //get and set
        var a = {};

        Object.defineProperty(a, "name", {
            get: function () {
                console.error("get");
            },
            set: function (name) {
                console.error("name:" + name);
            }
        });

        var b = {};
        Object.defineProperty(b, "name", {
            configurable: true, // 为 true 时，该属性描述符才能够被改变，也能够被删除。默认为false
            value: 1, //属性的默认值
            writable: true//属性能否被修改,默认为 false。
        });

        var c = {};
        Object.defineProperty(c, "name", {
            value: "test",
            enumerable: true //当且仅当该属性的 enumerable 为 true 时，该属性才能够出现在对象的枚举属性中。默认为 false。
        });
        for (var key in c) {
            console.error("key : " + key);
        }
    }

    function _assign() {
        var a = {a: 1};
        var b = {b: 2};
        var c = {c: 3};
        Object.assign(a, b, c);
        console.error("a:", a);
        console.error("b:", b);
        console.error("c:", c);


        var a = {b: {c: 4}, d: {e: {f: 1}}}
        var g = Object.assign({}, a)
        var h = JSON.parse(JSON.stringify(a));
        console.log(g.d) // { e: { f: 1 } }
        g.d.e = 32
        console.log('g.d.e set to 32.') // g.d.e set to 32.
        console.log(g) // { b: { c: 4 }, d: { e: 32 } }
        console.log(a) // { b: { c: 4 }, d: { e: 32 } }
        console.log(h) // { b: { c: 4 }, d: { e: { f: 1 } } }
        h.d.e = 54
        console.log('h.d.e set to 54.') // h.d.e set to 54.
        console.log(g) // { b: { c: 4 }, d: { e: 32 } }
        console.log(a) // { b: { c: 4 }, d: { e: 32 } }
        console.log(h) // { b: { c: 4 }, d: { e: 54 } }
    }

    function _getOwnPropertyDescriptor() {
        let obj = {};

        Object.defineProperty(obj, "name", {
            get(){

            },
            set(){


            },
            enumerable: false
        });

        let value = Object.getOwnPropertyDescriptor(obj,"name");

        //value : {get(),set(),enumerable : false}
    }

})();