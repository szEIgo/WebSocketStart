var express = require("express");
var app = express();

var voting = {
    results: [0, 0],
    title: "Do you like beer?",
    yesTxt: "yes",
    noTxt: "No"
}

app.use(express.static(__dirname + "/public"));

var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 9876;

var server = app.listen(port, ip, ()=> {
    //console.log(`Server started, listening on port: ${port}, bound to ${ip}`)
});

var io = require("socket.io")(server);



io.on('connection', function (socket) {
    console.log("A User connected");
    socket.emit("setup", voting);

    socket.on("disconnect", ()=> {
        console.log("User disconnected")
    });

    socket.on("vote", (vote) => {
        console.log("get a vote");

        vote.value ? voting.results[0]++ : voting.results[1]++;
        io.emit("update", voting.results);

    })

});
