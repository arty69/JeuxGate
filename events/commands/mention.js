const log = require('../../function/log.js')
const fs = require("fs")
const Discord = require('discord.js');
const prefix = fs.readFileSync("./config/prefix", "utf-8")

exports.run = async (message, client) =>{
    
    if(message.content.startsWith(prefix + "mention")){
        log.log("[JeuxGate : Cmention] mention command received from " + message.author.username + " - " + message.author.id, "mention", message.guild.id + "/commands")
        if(message.guild.roles.filter(role => role.name === "🔇Ne pas mentionner🔇").size === 0) return message.channel.send("Il n'y a pas de role ne pas mentionner sur ce serveur !")
        if (message.member.roles.some(role => role.name === "🔇Ne pas mentionner🔇")) {
            message.member.removeRole(message.guild.roles.filter(r => r.name === "🔇Ne pas mentionner🔇").first()).then(z => {
                message.channel.send("le rôle \"ne pas mentionner\" vous a été retiré !")
                message.member.setNickname(message.member.displayName.replace(/ \|\🔇/gi, "")).catch(O_o => message.channel.send("Impossible de changer vôtre pseudo, vous devrez le changer vous même."))
            }).catch(O_o => {
                message.channel.send("Une erreur est survenue, peut être que je ne peux pas changer vôter pseudo !")
            })
        } else {
            message.member.addRole(message.guild.roles.filter(r => r.name === "🔇Ne pas mentionner🔇").first()).then(z => {
                message.channel.send("le rôle \"ne pas mentionner\" vous a été ajouté !")
                message.member.setNickname(message.member.displayName + ' |🔇').catch(O_o => message.channel.send("Impossible de changer vôtre pseudo, vous devrez le changer vous même."))
            }).catch(O_o => {
                message.channel.send("Une erreur est survenue, peut être que je ne peux pas changer vôter pseudo !")
            })
        }
    }
    
}