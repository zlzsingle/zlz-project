module.exports = (function () {
    var urlJoin = require("url-join");
    var qs = require('qs');

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