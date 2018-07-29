module.exports = (function () {
    let urlJoin = require("url-join");
    let qs = require('qs');

    return {
        join: function () {
            urlJoin.apply({}, arguments);
        },
        genData: function (params) {
            params = qs.stringify(params);
            params = "?" + params;
            return params;
        }
    };
})();