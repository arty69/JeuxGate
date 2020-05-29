const log = require('../../function/log.js')
const fs = require("fs")
const Discord = require('discord.js');
const prefix = fs.readFileSync("./config/prefix", "utf-8")

exports.run = async (message, client) =>{
    if(message.content.startsWith(prefix + "ping")){
        log.log("[JeuxGate : Cping] ping command received from " + message.author.username + " - " + message.author.id, "ping", message.guild.id + "/commands")
        
        message.channel.send('Pong! ping :`' + `${Date.now() - message.createdTimestamp}` + ' ms`');
        
    } 
}