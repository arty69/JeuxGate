const log = require('../../function/log.js')
const fs = require("fs")
const Discord = require('discord.js');
const prefix = fs.readFileSync("./config/prefix", "utf-8")

exports.run = async (message) =>{
    log.log("[JeuxGate : CAvatar] avatar command received from " + message.author.username + " - " + message.author.id, "avatar", message.guild.id + "/commands")
    
    if (message.guild.member(message.mentions.users.first())) {
        var avatar = message.mentions.users.first()
    } else {
        var avatar = message.author
    }
    var avatar_embed = new Discord.MessageEmbed()
        .setColor("18d67e")
        .setTitle("Voici la photo de profil de " + avatar.username)
        .setImage(avatar.avatarURL({ format: 'png', dynamic: true, size: 1024 }))
        .setURL(avatar.avatarURL({ format: 'png', dynamic: true, size: 1024 }))
        .setTimestamp()
        .setFooter("JeuxGate")
    message.channel.send(avatar_embed);

    
}