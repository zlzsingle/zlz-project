(function () {
    var arr = [1, 2, 3, 4];
    var key = arr.keys();

    var next = key.next();
    while (!next.done) {
        console.error("index : " + next.value);
        console.error("value : " + arr[next.value]);
        next = key.next();
    }

    Array.prototype.slice();
    var arr = [0, 1, 2, 3, 4];
    var newArr = arr.slice(1, 3);

    console.error(arr); // [0, 1, 2, 3, 4]
    console.error(newArr); // [1,2]

})();