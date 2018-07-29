(function () {

    /*-------------------------------------------------------------------------------*/
    var fs = require("fs");
    var builder = require("xmlbuilder");
    var xml = builder.create('root')
        .ele('xmlbuilder')
        .ele('repo', {'type': 'git'}, 'git://github.com/oozcitak/xmlbuilder-js.git')
        .end({pretty: true});

    fs.writeFile(path.join(__dirname, 'message.xml'), xml, 'utf8', function () {

    });
    /*-------------------------------------------------------------------------------*/


    var contentList = [{id: 1, name: "张三"}, {id: 2, name: "李四"}];
    var root = builder.create('root');
    root.com('f(x) = x^2');

    contentList.forEach(function (content) {
        var item = root.ele("content");
        for (var key in content) {
            item.ele(key, "", content[key]);
        }
    });
    root.end({pretty: true});
    fs.writeFile(path.join(__dirname, 'message.xml'), root, 'utf8', function () {

    });

    // for (var i = 1; i <= 5; i++) {
    //     var item = root.ele('content');
    //     item.ele("id", "", "1");
    //     item.ele("name", "", "张三");
    // }


})();