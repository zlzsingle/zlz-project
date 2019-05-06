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

// curl http://10.1.0.19:41943/copytrade.gateway/GatewaySrv/GetFollowerFollowList -d '{"Accounts":[{"TraderBrokerID":501,"TraderAccount":"20600288","BrokerID":501,"Account":"20600346"},{"TraderBrokerID":501,"TraderAccount":"20600288","BrokerID":501,"Account":"20600314"},{"TraderBrokerID":501,"TraderAccount":"20600288","BrokerID":4,"Account":"00983991"},{"TraderBrokerID":501,"TraderAccount":"20600288","BrokerID":7,"Account":"900000035"},{"TraderBrokerID":501,"TraderAccount":"20600288","BrokerID":4,"Account":"00983991"}],"IsHistory":false}'
