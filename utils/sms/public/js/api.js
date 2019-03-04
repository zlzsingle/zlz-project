/**
 * Created by cc on 2014/8/15.
 */
(function(exports){
/////////////////////////////////////////////////////
//以上勿动
/////////////////////////////////////////////////////

    exports.sms = {
        send:function(send_obj,cb){
            var url = api_tools.gen_url('/sms/send');
            api_tools.post_data(url,null,send_obj,cb);
        },
        get_last_send_time:function(cb){
            var url = api_tools.gen_url('/sms/last_send_date');
            api_tools.get_data(url,null,cb);
        }
    };
/////////////////////////////////////////////////////
//以下勿动
/////////////////////////////////////////////////////

})( (function(){
    if(typeof exports === 'undefined') {
        if(typeof window.zlz === 'undefined')
            window.zlz = {};

        return zlz;
    }
    else {
        return exports;
    }
})() );

