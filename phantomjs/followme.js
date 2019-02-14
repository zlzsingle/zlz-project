var page = require('webpage').create();
var count = 1;

function getPage() {

    page.open('https://www.followme.com/api/v1/account/users/193431', function () {
        console.error(2);
        setTimeout(function () {
            console.error('count : ', count);
            if (count > 1000) {
                phantom.exit();
            } else {
                count = count + 1;
                getPage();
            }
        }, 200);
    });
}

console.error(1);
getPage();
