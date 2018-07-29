// http://nodejs.cn/api/url.html
/*-------------------------------hash-------------------------------*/
(function () {
    const {URL} = require('url');
    const myURL = new URL('https://example.org/foo#bar');
    // console.log(myURL.hash); // bar
})();
/*-------------------------------hash-------------------------------*/

/*-------------------------------host-------------------------------*/
(function () {
    const {URL} = require('url');
    const myURL = new URL('https://example.org:81/foo');
    // console.log(myURL.host);
    // example.org:81

    myURL.host = 'example.com:82';
    // console.log(myURL.href);
    //https://example.com:82/foo
})();
/*-------------------------------host-------------------------------*/