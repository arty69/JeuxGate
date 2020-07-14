const log = require('../../function/log.js')
const fs = require("fs")
const Discord = require('discord.js');
const prefix = fs.readFileSync("./config/prefix", "utf-8")
var https = require('follow-redirects').https;


exports.run = async (message, service) => {
    if(!service) return
    if(fs.readFileSync("./config/giphykey", 'utf-8') === "") return message.reply ("Je suis désolé, or la clé d'authorisation giphy est manquante, contacter le propriétaire.")
    var optionskiss = {
        'method': 'GET',
        'hostname': 'api.giphy.com',
        'path': '/v1/gifs/search?q=anime+food&api_key='+fs.readFileSync("./config/giphykey", 'utf-8')+'&limit=5&offset=' + Math.floor(Math.random() * 50),
        'maxRedirects': 20
    };
    
    message.channel.send("<@!" + message.author.id +"> Recherche de gif en cours ...").then(y =>{
        https.request(optionskiss, function (res) {
            var chunks = [];
        
            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
        
            res.on("end", function (chunk) {
                var body = Buffer.concat(chunks);
                try{
                var parsed = JSON.parse(body.toString())
                }catch{
                    return message.reply("Une erreure s'est produite, désolé, réessayez plus tard.")
                }
                var eat_embed = ""

                eat_embed = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle(`vous venez de manger :`)
                    .setImage(parsed["data"][Math.floor(Math.random() * parsed["pagination"].count)].images.fixed_height_small.url)
                    .setTimestamp()
                    .setFooter("JeuxGate - Powered by giphy")

                y.edit(eat_embed).then(u => {
                y.edit("")
                })

        
            });
        
            res.on("error", function (error) {
            y.edit("Une erreure s'est produite, veuillez réessayer plus tard")
            });
        }).end()
    })
}