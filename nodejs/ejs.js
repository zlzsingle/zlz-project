//http://www.cnblogs.com/stephenykk/p/6017927.html
(()=>{
    let path = require("path");
    let ejs = require("ejs");
    let fs = require("fs");

    let filename = path.join(__dirname, "ejs.html");
    let data = {
        open: "<%",
        close: "%>",
        data: {
            name: "test"
        }
    };

    function render() {
        let temp = `<div><h1><%=data.name%></h1></div>`;
        let html = ejs.render(temp, data);
        console.error(html);
    }

    function two() {

    }

})();
