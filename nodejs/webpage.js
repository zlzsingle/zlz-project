var page = require('webpage').create();
page.open('http://www.163.com', function () {
    page.render('example.png');
    phantom.exit();
});