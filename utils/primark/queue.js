/**
 * 队列主键
 */
(function (exports) {

    function Queue() {
        if (!(this instanceof Queue)) {
            return new Queue();
        }
        var _this = this;

        _this.processStatus = false; //处理状态,是否正在处理
        _this.status = false;//运行状态
        _this.time = 1000; //有新数据进来,隔多久后开始处理
        _this._array = []; //待处理的数据
        _this._processData = null; //正在处理的数据

        return _this;
    }

    /**
     * 推入一个
     * @param data {*}
     * @returns {Queue}
     */
    Queue.prototype.push = function (data) {
        var _this = this;
        _this._array.push(data);
        if (!_this.processStatus) {
            _this._process();
        }
        return _this;
    };

    /**
     * 推入多个
     * @param dataList {Array}
     * @returns {Queue}
     */
    Queue.prototype.pushList = function (dataList) {
        var _this = this;
        if (Array.isArray(dataList) && dataList.length > 0) {
            dataList.forEach(function (data) {
                _this._array.push(data);
            });
            if (!_this.processStatus) {
                _this._process();
            }
        }
        return _this;
    };

    /**
     * 推到最前面
     * @param data {*}
     * @returns {Queue}
     */
    Queue.prototype.pushNow = function (data) {
        var _this = this;
        _this._array.unshift(data);
        if (!_this.processStatus) {
            _this._process();
        }
        return _this;
    };

    /**
     * 停止执行
     * @returns {Queue}
     */
    Queue.prototype.stop = function () {
        var _this = this;
        if (_this._timeout) {
            clearTimeout(_this._timeout);
        }
        _this._timeout = null;
        _this.status = false;
        return _this;
    };

    /**
     * 开始执行
     * @returns {Queue}
     */
    Queue.prototype.run = function () {
        var _this = this;
        if (!(_this._processMethod instanceof Function)) {
            throw new Error("not setting process method");
        }
        if (_this.status) {
            return _this;
        }
        _this.status = true;
        _this._process();
        return _this;
    };

    /**
     * 清空处理数据
     * @returns {Queue}
     */
    Queue.prototype.clear = function () {
        var _this = this;
        _this._array = [];
        return _this;
    };

    /**
     * 开始处理
     * @returns {Queue}
     * @private
     */
    Queue.prototype._process = function () {
        var _this = this;
        if (!_this.status) {
            _this.processStatus = false;
            return _this.stop();
        }
        if (_this._array.length === 0) {
            _this.processStatus = false;
            return _this;
        }

        if (_this._timeout) {
            clearTimeout(_this._timeout);
            _this._timeout = null;
        }
        _this.processStatus = true;
        _this._timeout = setTimeout(function () {
            _this._processData = _this._array.shift();
            if (_this._processMethod) {
                _this._processMethod(_this._processData, function () {
                    _this._process();
                });
            } else {
                _this._process();
            }
        }, _this.time);
        return _this;
    };

    /**
     * 设置队列实例的处理函数
     */
    Object.defineProperty(Queue.prototype, "process", {
        set: function (process) {
            this._processMethod = process;
        }
    });

    /**
     * 获取队列导待处理的个数
     */
    Object.defineProperty(Queue.prototype, "count", {
        get: function () {
            return this._array.length;
        }
    });

    exports.Queue = Queue;

    //使用例子
    // var queue = new Queue();
    //
    // queue.process = function (data, cb) {
    //     setTimeout(function () {
    //         console.error("data : " + JSON.stringify(data));
    //         cb();
    //     }, 3000);
    // };
    //
    // queue.push(data).run();

})(function () {
    if (typeof window !== 'undefined') {
        return window;
    } else if (typeof exports !== 'undefined') {
        return exports;
    } else {
        return {}
    }
}());