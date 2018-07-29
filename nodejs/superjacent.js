//抓取html
{
    let superagent = require("superagent");
    let cheerio = require("cheerio");
    let cookies = {};
    let headers = {
        "Cache-Control": "max-age=0",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Referer": "http://www.imooc.com/",
        "Accept-Encoding": "gzip, deflate, sdch",
        "Accept-Language": "zh-CN,zh;q=0.8",
        "Cookie": cookies // 在外面定义一个 cookies 变量存放自己的 cookies
    };

    superagent
        .get('www.imooc.com/learn/' + courseId) // 在外面设置一个 courseId 的参数
        .set(headers)
        .end(function (err, res) {

            // res.text 通过请求获取的 html 页面
            var $ = cheerio.load(res.text);

            // 获取课程的名称
            $('.course-infos .hd').find('h2').each(function (item) {
                courseTitle = $(this).text();
            })

            // .chapter 是包含所有 video 的容器，这是 jquery 语法，为了获取所有的视频 id 和 filename
            $('.chapter').each(function (item) {

                var videos = $(this).find('.video').children('li')

                videos.each(function (item) {
                    var video = $(this).find('a')
                    var filename = video.text().replace(/(^\\\\\\\\s+)|(\\\\\\\\s+$)/g, "");
                    var id = video.attr('href').split('video/')[1]

                    // 视频 id 和 视频文件名字
                    console.log(id, filename);
                })
            })
        })

// 作者：laizw
// 链接：http://www.jianshu.com/p/d7631fc695af
//     來源：简书
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
}