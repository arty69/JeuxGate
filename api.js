const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
var http = require('http');
var list = fs.readFileSync('list.json', 'utf-8');

var vers = "1.3.3";

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
        }else if(req.url === "/guildsname"){
            res.writeHead(200, {'Content-Type': 'text/html'});
            list = ""
            fs.writeFile('list.json', list, (err) => {
                if (err) message.channel.send(err);
            });
            setTimeout(function () {}, 50)
            client.guilds.map(jg => {
                var jglist = list + "<tr><td>" + jg.name + "</td><td>" + jg.id + "</td><td>" + jg.region + "</td><td>" + jg.memberCount + "membres</td></tr>"
                
                list = jglist
                fs.writeFile('list.json', list, (err) => {
                    if (err) message.channel.send(err);
                });
                setTimeout(function () {}, 50)
            })
            res.write("<table>" + list + "</table>");
            res.end();
        }else{
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.write("404");
            res.end();
        }
    }).listen(process.env.PORT || 80); 
});


