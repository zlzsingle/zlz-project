const httpToCurl = require('http-to-curl').default;
httpToCurl();

const request = require('request');
request('http://yjdaily.yjrb.com.cn/resfile/2010-11-07/A02/Page.jpg', function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
});
