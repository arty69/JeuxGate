const log = require('../../function/log.js')
const fs = require("fs")
const Discord = require('discord.js');
const prefix = fs.readFileSync("./config/prefix", "utf-8")

exports.run = async (message, client) =>{
    if(message.content.startsWith(prefix + "8ball")){
        log.log("[JeuxGate : C8balls] 8ball command received from " + message.author.username + " - " + message.author.id, "8ball", message.guild.id + "/commands")
        
        if (message.content.substr(prefix.length + 5)) {
            var ball = [
                //oui
                "Plutôt, oui",
                "Oui.",
                "Bien sûr.",
                "Faites ainsi.",

                //non
                "Non",
                "Mes sources disent non.",
                "Les signes disent que non.",
                "Je dirais que non",

                //autres
                "Actuellement, je ne peux le prédire ...",
                "Impossible à prédire ..."
            ];
            var ansball = ball[Math.floor(Math.random() * ball.length)];
            var ball_embed = new Discord.MessageEmbed()
                .setColor('4f0982')
                .addField(`Voici la réponse à vôtre question :`, ansball)
                .setTimestamp()
                .setFooter("JeuxGate")
            message.channel.send(ball_embed);


        } else {
            message.reply("Si vous voulez que la boule magique vous réponde, vous devez déjà poser la question !")
        }
        
    } 
}