const log = require('../../function/log.js')
const fs = require("fs")
const Discord = require('discord.js');
const prefix = fs.readFileSync("./config/prefix", "utf-8")

exports.run = async (message) =>{
    log.log("[JeuxGate : Cbinfo] binfo command received from " + message.author.username + " - " + message.author.id, "binfo", message.guild.id + "/commands")
    
    var binfo_embed = new Discord.MessageEmbed()
        .setColor("18d67e")
        .setTitle(`Infos sur le bot : ${message.client.user.tag}`)
        .addField("Propriétaire du bot", `Jéhèndé#2054 et Skalefou#8605`)
        .addField("Bot crée le ", `25/11/2018`)
        .addField("Nombre total de personnes ", message.client.users.cache.size)
        .addField("Nombre total de serveur", message.client.guilds.cache.size)
        .addField("Log Version", `Version : test !`)
        .setTimestamp()
        .setFooter("JeuxGate")
    message.channel.send(binfo_embed)
    
}