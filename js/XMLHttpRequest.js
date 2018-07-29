(function () {

    function get() {
        //GET 方式请求
        var xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.open("GET", "http://localhost:3000/getStudent", true);
        xmlHttpRequest.send(null);
        xmlHttpRequest.onreadystatechange = function () {

            console.error("readyState :" + xmlHttpRequest.readyState);
            console.error("status :" + xmlHttpRequest.status);

            if (xmlHttpRequest.readyState == 4) {
                if (xmlHttpRequest.status == 200) {
                    console.error("response", xmlHttpRequest.response);
                    console.error("responseXML", xmlHttpRequest.responseXML);
                    console.error("statusText", xmlHttpRequest.statusText);
                }
            }
        };
    }

    function post() {
        //POST 请求
        var xmlHttpRequest = new XMLHttpRequest();

        xmlHttpRequest.open("POST", "/postTest", true);
        xmlHttpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHttpRequest.send({form :1,data:2});
        xmlHttpRequest.onreadystatechange = function () {

            console.error("readyState :" + xmlHttpRequest.readyState);
            console.error("status :" + xmlHttpRequest.status);

            if (xmlHttpRequest.readyState == 4) {
                if (xmlHttpRequest.status == 200) {
                    console.error("response", xmlHttpRequest.response);
                    console.error("responseXML", xmlHttpRequest.responseXML);
                    console.error("statusText", xmlHttpRequest.statusText);
                }
            }
        };

    }

    function startUpload() {
        var uploadFileSize = 0; //上传文件的大小，单位字节
        var uploadStartTime = null; //上传时间的毫秒
        var fileObj = document.getElementById("file").files[0];
        var formData = new FormData();
        var xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.open("POST", "uploadFile", true);
        //请求完成的方法
        xmlHttpRequest.onload = function (evt) {
            alert("√上传成功");
            console.error("upload success",evt);
        };
        //请求失败的方法
        xmlHttpRequest.onerror = function (evt) {
            alert("×上传成功");
            console.error("upload error", evt);
        };
        //上传开始的方法
        xmlHttpRequest.upload.onloadstart = function (evt) {
            uploadFileSize = 0;
            uploadStartTime = new Date().getTime();
        };
        //上传进度调用方法实现
        xmlHttpRequest.upload.onprogress = function () {

        };
        formData.append("file", fileObj);
        xmlHttpRequest.send(formData);
    }


})();