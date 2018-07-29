const url = "mongodb://localhost:27017";
const dbName = "zlz";

let mongodbClient = require("mongodb").MongoClient;
mongodbClient.connect(url, function (err, client) {
    if (err) {
        console.error("connect mongodb error : ", err);
    } else {
        let db = client.db(dbName);

        console.log(db);
    }
});

