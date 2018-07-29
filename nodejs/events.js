let events = require("events");

let eventEmitter = new events.EventEmitter();

eventEmitter.on("connection", function () {
    console.error(arguments);
    console.error(this);
});

eventEmitter.emit("connection", {student: "test"});