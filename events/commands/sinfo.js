const log = require('../../function/log.js')
const fs = require("fs")
const Discord = require('discord.js');
const prefix = fs.readFileSync("./config/prefix", "utf-8")

exports.run = async (message, client) =>{
    if(message.content.startsWith(prefix + "sinfo")){
        log.log("[JeuxGate : Cbinfo] sinfo command received from " + message.author.username + " - " + message.author.id, "binfo", message.guild.id + "/commands")
        
        var info_embed = new Discord.MessageEmbed()
            .setColor("18d67e")
            .setTitle(`Infos sur le serveur : ${message.guild.name}`)
            .addField("Propriétaire du serveur", message.guild.owner.user.tag)
            .addField("Serveur crée le ", message.guild.createdAt)
            .addField("Tu as rejoin le ", message.member.joinedAt)
            .addField("Nombre total de personnes", message.guild.members.cache.size)
            .addField("Nombre de membres", message.guild.members.cache.size - message.guild.members.cache.filter(member => member.user.bot).size)
            .addField("Nombre de bots", message.guild.members.cache.filter(member => member.user.bot).size)
            .setTimestamp()
            .setFooter("JeuxGate")
        message.channel.send(info_embed)
    }
}