const log = require('../../function/log.js')
const fs = require("fs")
const Discord = require('discord.js');
const prefix = fs.readFileSync("./config/prefix", "utf-8")
var https = require('follow-redirects').https;



exports.run = async (message, client) =>{
    if (message.content.startsWith(prefix + "hug")){
        log.log("[JeuxGate : Chug] hug command received from " + message.author.username + " - " + message.author.id, "hug", message.guild.id + "/commands")
        var optionskiss = {
            'method': 'GET',
            'hostname': 'api.giphy.com',
            'path': '/v1/gifs/search?q=hug+anime&api_key=eYzXE0mU9zRCBLEiO0QVoom1ofMNYv2u&limit=5&offset=' + Math.floor(Math.random() * 50),
            'maxRedirects': 20
        };
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
                
                
                var kiss_embed = new Discord.RichEmbed()
                    .setColor('RANDOM')
                    .setTitle(`Tu viens de faire un câlin  :`)
                    .setImage(parsed["data"][Math.floor(Math.random() * parsed["pagination"].count)].images.fixed_height_small.url)
                    .setTimestamp()
                    .setFooter("JeuxGate - Powered by giphy")
                message.channel.send(kiss_embed);

        
            });
        
            res.on("error", function (error) {
              console.error(error);
            });
        }).end()
    }
}