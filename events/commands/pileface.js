const log = require('../../function/log.js')
const fs = require("fs")
const Discord = require('discord.js');
const prefix = fs.readFileSync("./config/prefix", "utf-8")

exports.run = async (message, client) =>{
    if(message.content.startsWith(prefix + "pf") || message.content.startsWith(prefix + "pileface") || message.content.startsWith(prefix + "pileouface")){
        log.log("[JeuxGate : Cpileface] pileface command received from " + message.author.username + " - " + message.author.id, "pileface", message.guild.id + "/commands")
        
        if (Math.random() >= 50) {
            message.channel.send("Vous venez d'obtenir : **Pile** !")
        } else {
            message.channel.send("Vous venez d'obtenir : **Face** !")
        }
        
    } 
}