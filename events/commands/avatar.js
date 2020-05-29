const log = require('../../function/log.js')
const fs = require("fs")
const Discord = require('discord.js');
const prefix = fs.readFileSync("./config/prefix", "utf-8")

exports.run = async (message, client) =>{
    if(message.content.startsWith(prefix + "avatar")){
        log.log("[JeuxGate : CAvatar] avatar command received from " + message.author.username + " - " + message.author.id, "avatar", message.guild.id + "/commands")
        
        if (message.guild.member(message.mentions.users.first())) {
            var user = message.mentions.users.first()
        } else {
            var user = message.author
        }
        var avatar_embed = new Discord.RichEmbed()
            .setColor("18d67e")
            .setTitle("Voici la photo de profil de " + user.username)
            .setImage(user.avatarURL)
            .setURL(user.avatarURL)
            .setTimestamp()
            .setFooter("JeuxGate")
        message.channel.send(avatar_embed);

        
    } 
}