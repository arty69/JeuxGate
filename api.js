const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
var http = require('http');
var express = require('express');
var app = express();
var list = fs.readFileSync('list.json', 'utf-8');

var vers = "1.3.3";

client.login(process.envtoken)
client.on("ready", () => {
    console.log(`connecté : ${client.user.tag}!`)
    
    // http.createServer(function (req, res) {
    //     if(req.url === "/users"){
    //         res.writeHead(200, {'Content-Type': 'text/html'});
    //         res.write("" + client.users.filter(u => !u.bot).size + " " + client.users.size);
    //         res.end();
    //     }else if(req.url === "/vers"){
    //         res.writeHead(200, {'Content-Type': 'text/html'});
    //         res.write("" + vers);
    //         res.end();
    //     }else if(req.url === "/guilds"){
    //         res.writeHead(200, {'Content-Type': 'text/html'});
    //         res.write("" + client.guilds.size);
    //         res.end();
    //     }else if(req.url === "/guildsname"){
    //         res.writeHead(200, {'Content-Type': 'text/html'});
    //         list = ""
    //         fs.writeFile('list.json', list, (err) => {
    //             if (err) message.channel.send(err);
    //         });
    //         setTimeout(function () {}, 50)
    //         client.guilds.map(jg => {
    //             var jglist = list + "<tr><td>" + jg.name + "</td><td>" + jg.id + "</td><td>" + jg.region + "</td><td>" + jg.memberCount + "membres</td></tr>"
                
    //             list = jglist
    //             fs.writeFile('list.json', list, (err) => {
    //                 if (err) message.channel.send(err);
    //             });
    //             setTimeout(function () {}, 50)
    //         })
    //         res.write("<table>" + list + "</table>");
    //         res.end();
    //     }else{
    //         res.writeHead(404, {'Content-Type': 'text/html'});
    //         res.write("404");
    //         res.end();
    //     }
    // }).listen(process.env.PORT || 80); 
    app.get('/users', function(req, res) {
        res.setHeader('Content-Type', 'text/plain');
        res.send("" + client.users.filter(u => !u.bot).size + " " + client.users.size);
    });
    
    app.get('/vers', function(req, res) {
        res.setHeader('Content-Type', 'text/plain');
        res.send(vers + "");
    });
    
    app.get('/guilds', function(req, res) {
        res.setHeader('Content-Type', 'text/plain');
        res.send(client.guilds.size + "");
    });
    
    app.get('/guildsname', function(req, res) {
        res.setHeader('Content-Type', 'text/html');
        list = "";
        fs.writeFile('list.json', list, (err) => {
            if (err) message.channel.send(err);
        });
        setTimeout(function () {}, 50);
        client.guilds.map(jg => {
            var jglist = list + "<tr><td>" + jg.name + "</td><td>" + jg.id + "</td><td>" + jg.region + "</td><td>" + jg.memberCount + "membres</td></tr>";
            
            list = jglist;
            fs.writeFile('list.json', list, (err) => {
                if (err) message.channel.send(err);
            });
            setTimeout(function () {}, 50);
        });
        res.send("<table>" + list + "</table>");
    });
    
    app.get('/guildname/:gid', function(req, res) {
        res.setHeader('Content-Type', 'text/plain');
        if(client.guilds.filter(g => g.id === req.params.gid).size !== 0){
            res.send("" + client.guilds.filter(g => g.id === req.params.gid).first().name);
        }else{
            res.send("404");
        }
    });
    
    app.use(function(req, res, next){
        res.setHeader('Content-Type', 'text/plain');
        res.status(404).send('404');
    });
    app.listen(process.env.PORT || 80);
});

