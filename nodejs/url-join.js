{
    let urlJoin = require("url-join");
    let fullUrl = urlJoin('http://www.google.com', 'a', 'b/cd','e','f', '?foo=123');

    console.log(fullUrl);
}