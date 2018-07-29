//https://www.npmjs.com/package/needle

let needle = require("needle");

const options = {
    timeout: 600000
    , json: true
    , headers: {
        //'Content-Type': 'application/x-www-form-urlencoded'
        'Content-Type': 'application/json'
        , 'Charset': 'UTF-8'

    }
};

function merge_session_to_header(session){
    var opt = {__proto__: options};
    if (!session) {
        return opt;
    }

    opt.headers.sessionid = session.id;

    if (session.userinfo === undefined) {
        return opt;
    }

    opt.headers.userId = session.userinfo.user.id;
    opt.headers.customerId = session.userinfo.user.customerId;
    if(session.userinfo.user.type == 0 && session.userinfo.user.department)
        opt.headers.deptId = session.userinfo.user.department.id;
    else
        opt.headers.deptId = "";
    var settings = session.userinfo.user.settingsObj;
    if (settings && settings.lang) {
        opt.headers.lang = settings.lang;
    }else{
        opt.headers.lang = tycom.config.page_lang_default;
    }
    return opt;
}

/**-------------------------------------------get-----------------------------------------*/
(()=>{
    needle.get("http://172.20.4.102:81/mobile/api/comment/get_good?comment_id=1375,1376", options, (err, res, body) => {
        console.error(err, res, body);
    });
})();


/**-------------------------------------------post-----------------------------------------*/
(()=>{
    needle.post("http://localhost:80/create_user", {id : "", name : "",age : ""}, merge_session_to_header(session), function(err,res,body){
        if(err){
            console.info('==================================================');
            console.error('needle_ERROR' + "Status Code1: " + (res ?res.statusCode:undefined));
            console.error('needle.post url' + url);
            console.error('needle.post: data');
            console.info(JSON.stringify(data));
            console.error(err);
            cb({code: "needle_ERROR", msg: "Back Server connect error."});
            return;

        }
        if (res.statusCode !== 200) {
            console.error('needle_ERROR' + "Status Code: " + res.statusCode);
            console.error('needle.post url' + url);
            console.error('needle.post: data');
            console.info(JSON.stringify(data));
            console.error(body);
            cb({code: "needle_ERROR", msg: "Back Server connect error！"});
        }
        else {
            cb(JSON.parse(body));
        }
    });
})();