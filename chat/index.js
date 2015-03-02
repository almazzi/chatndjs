/**
 * Created by Almaz on 28.02.2015.
 */
var app = require('express')();
var http = require('http').Server(app);
var socket =require('socket.io')(http);

var people = {};

app.get('/',function(req, res){
    res.sendFile(__dirname+'/index.html');
});

http.listen(8080, function () {
    console.log("Connected to server");
});




socket.on('connection', function (client) {

    client.on('chat message', function (msg) {
       var nickname = client.nickname;
       client.broadcast.emit('chat message',nickname+': '+msg);
       client.emit('chat message',nickname+': '+msg);
    });

    client.on('join',function(name){
        client.nickname = name;
    });

    client.on('disconnect', function(name){
        console.log(client.nickname+'  disconnected');
    });


});
