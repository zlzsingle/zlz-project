let http = require("http");
let path = require("path");
let express = require("express");

let app = express();

app.set('views', path.join(process.cwd(), 'views'));
app.engine('.html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('view engine', 'html');
app.use(express.static(path.join(process.cwd())));


app.get("/", function (req, res) {
    let view = "index";
    if (req.query.view) {
        view = req.query.view;
    }
    res.render(view, {data: {view: view}});
});

http.createServer(app).listen(9999);

console.error("http://localhost:9999");
