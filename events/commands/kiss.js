const log = require('../../function/log.js')
const fs = require("fs")
const Discord = require('discord.js');
const prefix = fs.readFileSync("./config/prefix", "utf-8")
var https = require('follow-redirects').https;



exports.run = (message, client) =>{
    if (message.content.startsWith(prefix + "kiss")){
        log.log("[JeuxGate : Ckiss] Kiss command received from " + message.author.username + " - " + message.author.id, "kiss", message.guild.id + "/commands")
        if(fs.readFileSync("./config/giphykey", 'utf-8') === "") return message.reply ("Je suis désolé, or la clé d'authorisation giphy est manquante, contacter le propriétaire.")
        var optionskiss = {
            'method': 'GET',
            'hostname': 'api.giphy.com',
            'path': '/v1/gifs/search?q=kiss+anime&api_key='+fs.readFileSync("./config/giphykey", 'utf-8')+'&limit=5&offset=' + Math.floor(Math.random() * 50),
            'maxRedirects': 20
        };
        message.channel.send("<@!" + message.author.id +"> Recherche en cours de gif ...").then(y =>{
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
                
                
                var kiss_embed = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle(`Tu viens d'embrasser :`)
                    .setImage(parsed["data"][Math.floor(Math.random() * parsed["pagination"].count)].images.fixed_height_small.url)
                    .setTimestamp()
                    .setFooter("JeuxGate - Powered by giphy")
                y.edit(kiss_embed).then(u => {
                y.edit("")
                })

        
            });
        
            res.on("error", function (error) {
              y.edit("Une erreure s'est produite, veuillez réessayer plus tard")
            });
        }).end()
        })
    }
}