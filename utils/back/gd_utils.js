//http://lbs.amap.com/api/webservice/guide/api/ipconfig/
module.exports = (function () {

    let needle = require('needle');
    let urlJoin = require("url-join");
    let qs = require("qs");
    let host = "http://restapi.amap.com"; //高德api地址
    let key = "5f4d39a455230ade049a6fef5ddf5ae8";

    let options = {
        timeout: 30000
        , json: false
        , headers: {
            'Content-Type': 'text/html'
            , 'Charset': 'UTF-8'
        }
    };
    let dfParams = {
        output: "json",
        key: key,
        page: 1,
        offset: 10,
        extensions: "base" // all|base
    };

    function outInfo(info) {
        // console.info(info);
    }

    function genErrInfo(body) {
        return body.infocode;
    }

    function genUrl(url, params) {
        return urlJoin(host, url + "?" + qs.stringify(params));
    }

    // lat 经度 , lon 纬度
    function genLocation(lat, lon) {
        return lat + "," + lon;
    }

    // lat 经度 , lon 纬度
    function splitLocation(location) {
        let arr = location.split(",");
        return {
            lat: arr[0],
            lon: arr[1]
        }
    }

    function runCallback(callback, params, err) {
        if (typeof callback === "function") {
            callback(err, params);
        }
    }

    function checkBody(body) {
        if (body.status + "" === "1") {
            return true;
        }
        return false;
    }

    function genParams(params) {
        for (let key in dfParams) {
            if (!params[key] && params[key] != 0) {
                params[key] = dfParams[key];
            }
        }
        return params;
    }

    function newPage(page, pageSize, pageTotal, results) {
        let result = {};
        result.currentPage = page;
        result.data = results;
        result.pageSize = pageSize;
        result.totalResult = pageTotal;
        result.totalPage = pageTotal % pageSize == 0 ? pageTotal / pageSize : pageTotal / pageSize + 1;
        result.start = page * pageSize + 1;
        result.queryTime = null;
        result.userdata = null;
        return result;
    }

    function getPoi(path,data, callback) {
        let params = genParams(data);
        let url = genUrl(path, params);

        outInfo("url : " + url);

        needle.get(url, options, function (err, res, body) {
            if (err) {
                return runCallback(callback, null, err);
            }
            if (!checkBody(body)) {
                return runCallback(callback, null, genErrInfo(body));
            }
            let results = [];
            let pois = body.pois;
            let count = body.count;
            if (pois && pois.length > 0){
                pois.forEach(function (poi) {
                    results.push({
                        id: poi.id,
                        name: poi.name,
                        type: poi.type,  //兴趣点类型
                        typeCode: poi.typecode, //兴趣点类型编码
                        bizType: poi.biz_type, //行业类型
                        address: poi.address, //地址
                        lat: splitLocation(poi.location).lat, //纬度
                        lon: splitLocation(poi.location).lon, //经度
                        pCode: poi.pcode, //省份代码
                        pName: poi.pname, //省份名称
                        cityCode: poi.citycode, //城市代码
                        cityName: poi.cityname //城市名称
                    })
                });
            }
            runCallback(callback, newPage(params.page, params.offset, count, results));
        });
    }

    // http://lbs.amap.com/api/webservice/guide/api/search/#text  api文档地址
    //http://restapi.amap.com/v3/place/text?&keywords=北京大学&city=beijing&output=xml&offset=20&page=1&key=<用户的key>&extensions=base 访问例子地址
    //{keywords: "南屏街口",city : "beijing",citylimit : true|false,offset : "10",page : "1"} 参数
    /**
     * 通过关键字搜索poi
     * @param data {keywords : "南屏|前山"(关键词,多个通过|分割), city : "beijing"|"北京",citylimit :""(仅返回指定城市数据),offset :"10"(每页显示多少条), page : "1"(第几页)}
     * @param callback
     */
    function getPoiKeyword(data, callback) {
        getPoi("/v3/place/text", data, callback);
    }

    //http://restapi.amap.com/v3/place/around?key=<用户的key>&location=116.456299,39.960767&output=xml&radius=10000&types=商务写字楼
    /**
     * 通过坐标获取附近的poi
     * @param data {location : "", keywords : "", types : "", city : "", radius : "", offset : "", page : ""}
     * @param callback
     */
    function getPoiLocation(data, callback) {
        getPoi("/v3/place/around", data, callback);
    }

    /**
     * 通过Ip获取所在的城市省份信息
     * @param data {ip : ip}
     * @param callback
     */
    function getCityInfo(data, callback) {
        let path = "/v3/ip";
        let params = genParams(data);
        let url = genUrl(path, params);
        needle.get(url, options, function (err, res, body) {
            if (err) {
                return runCallback(callback, null, err);
            }
            if (!checkBody(body)) {
                return runCallback(callback, null, genErrInfo(body));
            }
            let result = {
                city: body.city, //城市名称
                adcode: body.adcode, //城市的adcode编码
                province: body.province //省份名称
            };
            runCallback(callback, result);
        });
    }

    return {
        genLocation: genLocation,
        getCityInfo: getCityInfo,
        getPoiKeyword: getPoiKeyword,
        getPoiLocation: getPoiLocation
    };
})();