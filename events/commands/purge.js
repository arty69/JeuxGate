const log = require('../../function/log.js')
const fs = require("fs")
const Discord = require('discord.js');
const prefix = fs.readFileSync("./config/prefix", "utf-8")

exports.run = async (message, client) =>{
    if(message.content.startsWith(prefix + "purge")){
        log.log("[JeuxGate : Cpurge] purge command received from " + message.author.username + " - " + message.author.id, "purge", message.guild.id + "/commands")
        
        if (!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send("**Hey ...** Vous n'avez pas la permission nécessaire pour effectuer cette action.");
        if (!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.channel.send("**Hey ...** Je n'ai pas les permissions nécessaire pour faire cette action.");

        suppression = parseInt(message.content.substr(prefix.length + 6)) + 1
        suppressiontot = parseInt(suppression)
        if(isNaN(suppression)) return message.reply("**Hey ...** La valeur que vous avez entré est invalide, merci de choisir une valeur comprise entre 1 et 10000");
        if (suppression < 2 || suppression > 10001) {
            return message.reply("**Hey ...** La valeur que vous avez entré est invalide, merci de choisir une valeur comprise entre 1 et 10000");
        }
        while (suppression > 100) {
            message.channel.bulkDelete(100, true).catch(O_o => message.reply("Il y a des messages que je ne peux pas supprimer\r\n*Par exemple s'ils ont plus de 2 semaines.*"))
            suppression = suppression - 100
        }
        message.channel.bulkDelete(suppression, true).then(ok => {
            message.reply("**Suppression de " + (suppressiontot-1).toString() + " messages**")
                .then(message => setTimeout(function () {
                    message.delete().catch()
                }, 10000)
            ).catch()

        }).catch();

        
    } 
}