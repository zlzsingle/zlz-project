'use strict';
var guid = function () {
    var uid = 0;
    this.newId = function () {
        uid = uid % 1000;
        var now = new Date();
        var utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
        return utc.getTime() + uid++;
    }
}
exports.utils = {
    guid: new guid()
};