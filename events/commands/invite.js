const log = require('../../function/log.js')
const fs = require("fs")
const Discord = require('discord.js');
const prefix = fs.readFileSync("./config/prefix", "utf-8")

exports.run = async (message) =>{
    log.log("[JeuxGate : Cbinfo] invite command received from " + message.author.username + " - " + message.author.id, "binfo", message.guild.id + "/commands")
    var invite_embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Voici le lien pour inviter le bot : ')
        .setDescription(`https://discordapp.com/api/oauth2/authorize?client_id=515891064721244162&permissions=8&scope=bot`)
        .setURL(`https://discordapp.com/api/oauth2/authorize?client_id=515891064721244162&permissions=8&scope=bot`)
        .setTimestamp()
        .setFooter("JeuxGate")
    message.channel.send(invite_embed);
}