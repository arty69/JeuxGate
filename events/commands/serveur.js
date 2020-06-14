const log = require('../../function/log.js')
const fs = require("fs")
const Discord = require('discord.js');
const prefix = fs.readFileSync("./config/prefix", "utf-8")

exports.run = async (message, client) =>{
    if(message.content.startsWith(prefix + "serveur")) {
        log.log("[JeuxGate : Cbinfo] server command received from " + message.author.username + " - " + message.author.id, "binfo", message.guild.id + "/commands")
        var serveur_embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Voici le serveur du bot : ')
            .setDescription(`https://discord.gg/BSEGc9D`)
            .setURL(`https://discord.gg/BSEGc9D`)
            .setTimestamp()
            .setFooter("JeuxGate")
        message.channel.send(serveur_embed);
    }
}