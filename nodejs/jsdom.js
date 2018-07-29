var html = "<html><body><h1>测试</h1></body></html>";
var jsdom = require("jsdom");
var window = (new jsdom.JSDOM(html)).window;
var $ = require("jquery")(window);

var $h = $("body h1");

console.error($h.text());