const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
var http = require('http');

var vers = "1.3.2";

client.login(process.env.TOKEN)
client.on("ready", () => {
    console.log(`connecté : ${client.user.tag}!`)
    
    http.createServer(function (req, res) {
        if(req.url === "/users"){
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write("" + client.users.size);
            res.end();
        }else if(req.url === "/vers"){
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write("" + vers);
            res.end();
        }else if(req.url === "/guilds"){
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write("" + client.guilds.size);
            res.end();
        }else{
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.write("404");
            res.end();
        }
    }).listen(process.env.PORT || 80); 

});
