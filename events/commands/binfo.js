const log = require('../../function/log.js')
const fs = require("fs")
const Discord = require('discord.js');
const prefix = fs.readFileSync("./config/prefix", "utf-8")

exports.run = async (message, client) =>{
    if(message.content.startsWith(prefix + "binfo")){
        log.log("[JeuxGate : Cbinfo] binfo command received from " + message.author.username + " - " + message.author.id, "binfo", message.guild.id + "/commands")
        
        var binfo_embed = new Discord.MessageEmbed()
            .setColor("18d67e")
            .setTitle(`Infos sur le bot : ${client.user.tag}`)
            .addField("Propriétaire du bot", `Jéhèndé#2054 et Skalefou#8605`)
            .addField("Bot crée le ", `25/11/2018`)
            .addField("Nombre total de personnes ", client.users.cache.size)
            .addField("Nombre total de serveur", client.guilds.cache.size)
            .addField("Log Version", `Version : test !`)
            .setTimestamp()
            .setFooter("JeuxGate")
        message.channel.send(binfo_embed)
    }else if(message.content.startsWith(prefix + "serveur")) {
        log.log("[JeuxGate : Cbinfo] server command received from " + message.author.username + " - " + message.author.id, "binfo", message.guild.id + "/commands")
        var serveur_embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Voici le serveur du bot : ')
            .setDescription(`https://discord.gg/BSEGc9D`)
            .setURL(`https://discord.gg/BSEGc9D`)
            .setTimestamp()
            .setFooter("JeuxGate")
        message.channel.send(serveur_embed);
    }else if (message.content.startsWith(prefix + "invite")) {
        log.log("[JeuxGate : Cbinfo] invite command received from " + message.author.username + " - " + message.author.id, "binfo", message.guild.id + "/commands")
        var invite_embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Voici le lien du bot : ')
            .setDescription(`https://discordapp.com/api/oauth2/authorize?client_id=515891064721244162&permissions=8&scope=bot`)
            .setURL(`https://discordapp.com/api/oauth2/authorize?client_id=515891064721244162&permissions=8&scope=bot`)
            .setTimestamp()
            .setFooter("JeuxGate")
        message.channel.send(invite_embed);
    }
}