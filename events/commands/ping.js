const log = require('../../function/log.js')
const fs = require("fs")
const Discord = require('discord.js');
const prefix = fs.readFileSync("./config/prefix", "utf-8")

exports.run = async (message, service) =>{
    log.log("[JeuxGate : Cping] ping command received from " + message.author.username + " - " + message.author.id, "ping", message.guild.id + "/commands")
    if(service)
        var x = "Le ping est probablement faussé dû au traitement du message que jeuxgate a du faire.\r\n"
    else 
        var x =""
    message.channel.send(`${x}Pong! ping : \` ${Date.now() - message.createdTimestamp} ms (à peu près\` `).then (msg => {
        msg.edit(`${x}Pong! ping : \` ${msg.createdTimestamp - message.createdTimestamp} ms\`, Latence discord : \` ${Math.round(message.client.ws.ping)} ms\` `).catch(O_o => {})
    });
    
}