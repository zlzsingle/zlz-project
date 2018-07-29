(function (win) {
    function runCallback(callback, params, err) {
        if ($.isFunction(callback)) {
            callback.call(this, params, err);
        }
    }

    function getData(path, params, callback) {
        doAjax("GET", path, params, null, callback);
    }

    function postData(path, params, data, callback) {
        doAjax("POST", path, params, data, callback);
    }

    function genUrl(path, params) {
        if ($.type(path) !== "string") {
            return path;
        }
        if (!params) {
            params = {};
        }
        if (path.indexOf("?") === -1) {
            path = path + "?_rid=" + Math.random();
        } else {
            path = path + "&_rid=" + Math.random();
        }
        if (!$.isEmptyObject(params)) {
            path = path + "&" + $.param(params);
        }
        return path;
    }

    function doAjax(type, path, data, params, callback) {
        $.ajax({
            url: genUrl(path, params)
            , type: type
            , dataType: "html"
            , timeout: 3000
            , cache: false
            , data: data ? JSON.stringify(data) : null
            , async: !!callback
            , success: function (body) {
                runCallback(callback, body);
            }
            , error: function (req, status, error) {
                runCallback(callback, null, {req: req, status: status, error: error});
            }
        });
    }

    function initDataList(opts) {
        var options = $.extend({
            $container: "",
            $btnNext: "",
            dataUrl: "",
            totalPage: "",
            btnClickBack: ""
        }, opts);
        var $container = options.$container;
        var $btnNext = options.$btnNext;
        var dataUrl = options.dataUrl;
        var totalPage = options.totalPage;
        var isEnd = false;
        var _currPage = 1;

        function btnClickBack() {
            if ($.isFunction(options.btnClickBack)) {
                options.btnClickBack.apply($btnNext.get(0), arguments);
            }
        }

        //处理数据的数据的Url方法
        function processDataUrl(url, page) {
            if (page == 1) {
                return url;
            } else {
                var urlPath = url;
                var lastIndex = urlPath.lastIndexOf(".");
                var suffix = urlPath.substr(lastIndex + 1);
                var visitUrl = urlPath.substr(0, lastIndex);
                visitUrl = visitUrl + "_" + page;
                visitUrl = visitUrl + "." + suffix;
                return visitUrl;
            }
        }

        //刷新数据
        function refreshData(page, callback) {
            if (isEnd) {
                runCallback(callback, "1");
                return;
            }
            if (totalPage && page > totalPage) {
                $btnNext.attr("disabled", "disabled");
            } else {
                $btnNext.removeAttr("disabled");
                base.getData(processDataUrl(dataUrl, page), null, function (result, err) {
                    if (err) {
                        isEnd = true;
                        runCallback(callback, err);
                    } else {
                        $container.append(result);
                        _currPage = page;
                        runCallback(callback);
                    }
                });
            }
        }

        $btnNext.on("click", function () {
            refreshData(_currPage + 1, btnClickBack);
        });

        refreshData(_currPage, btnClickBack);
    }

    win.base = {
        genUrl: genUrl,
        getData: getData,
        postData: postData,
        runCallback: runCallback,
        initDataList: initDataList
    }
})(window);