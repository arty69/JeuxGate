const log = require('../../function/log.js')
const fs = require("fs")
const Discord = require('discord.js');
const prefix = fs.readFileSync("./config/prefix", "utf-8")

exports.run = async (message, client) =>{
    
    if(message.content.startsWith(prefix + "mention")){
        log.log("[JeuxGate : Cmention] mention command received from " + message.author.username + " - " + message.author.id, "mention", message.guild.id + "/commands")
        if(message.guild.roles.cache.filter(role => role.name === "🔇Ne pas mentionner🔇").size === 0) return message.channel.send("Il n'y a pas de role ne pas mentionner sur ce serveur !")
        if (message.member.roles.cache.some(role => role.name === "🔇Ne pas mentionner🔇")) {
            message.member.roles.remove(message.guild.roles.cache.filter(r => r.name === "🔇Ne pas mentionner🔇").first()).then(z => {
                message.channel.send("le rôle \"ne pas mentionner\" vous a été retiré !").then(y => {
                message.member.setNickname(message.member.displayName.replace(/ \|\🔇/gi, "")).catch(O_o => y.edit("le rôle \"ne pas mentionner\" vous a été retiré !\r\n **mais** il m'a été mpossible de changer vôtre pseudo, vous devrez le changer vous même."))
                })
                
            }).catch(O_o => {
                message.channel.send("Une erreur est survenue, peut être que je ne peux pas changer vôter pseudo !")
            })
        } else {
            message.member.roles.add(message.guild.roles.cache.filter(r => r.name === "🔇Ne pas mentionner🔇").first()).then(z => {
                message.channel.send("le rôle \"ne pas mentionner\" vous a été ajouté !").then(y => {
                message.member.setNickname(message.member.displayName + ' |🔇').catch(O_o => y.edit("le rôle \"ne pas mentionner\" vous a été ajouté !\r\n **mais** il m'a été mpossible de changer vôtre pseudo, vous devrez le changer vous même."))
                })
            }).catch(O_o => {
                message.channel.send("Une erreur est survenue, peut être que je ne peux pas changer vôter pseudo !")
            })
        }
    }
    
}