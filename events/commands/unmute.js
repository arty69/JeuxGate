const log = require('../../function/log.js')
const fs = require("fs")
const Discord = require('discord.js');
const prefix = fs.readFileSync("./config/prefix", "utf-8")

exports.run = async (message, client) =>{
    if(message.content.startsWith(prefix + "unmute")){
        log.log("[JeuxGate : Cunmute] unmute command received from " + message.author.username + " - " + message.author.id, "unmute", message.guild.id + "/commands")
        if(message.mentions.size !==0){
            if (fs.existsSync("./config/guild/" + message.guild.id + "/temp muted/" + message.mentions.members.first().id)){
                if (fs.readFileSync("./config/guild/" + message.guild.id + "/temp muted/" + message.mentions.members.first().id, "utf-8") === message.author.id.toString()){
                    message.reply("La personne a bien été démute !")
                    fs.unlinkSync("./config/guild/" + message.guild.id + "/temp muted/" + message.mentions.members.first().id)
                    message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.filter(role => role.name.toLowerCase() === "muted").first()).then(member => {
                        message.channel.send(`${mute.user.username} a été dé-mute par ${message.author.username} !`);
                    }).catch(e => message.reply("Impossibilité d'appliquer le role : vérifier l'ordre des roles, jeuxgate doit être au dessus de la personne à mute."))
                    return
                }
            }
        }
        if (!message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return message.channel.send("**Hey ...** Vous n'avez pas la permission nécessaire pour effectuer cette action.");
        if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return message.channel.send("**Hey ...** Je n'ai pas les permissions nécessaire pour faire cette action.");

        if (message.mentions.users.size === 0) {
            return message.reply("Tu dois mentionner quelqu'un pour faire cette commande");
        }
        var mute = message.guild.member(message.mentions.users.first());
        if (!mute) {
            message.reply("Je n'ai pas trouvé l'utilisateur ou il l'existe pas !");
			return
        }
        if (message.content.substr(prefix.length + 6) === " <@!515891064721244162>") {
            return message.reply("Je ne peux pas me unmute !")
        }
        if(mute.roles.filter(role => role.name === "muted").size === 0){
            return message.reply("Cette personne n'est pas mute !")
        }
        if (message.guild.roles.filter(role => role.name.toLowerCase() === "muted").size !== 0) {
            mute.removeRole(message.guild.roles.filter(role => role.name.toLowerCase() === "muted").first()).then(member => {
                message.channel.send(`${mute.user.username} a été dé-mute par ${message.author.username} !`);
            }).catch(e => message.reply("Impossibilité d'appliquer le role : vérifier l'ordre des roles, jeuxgate doit être au dessus de la personne à mute."))
        } else {
            message.reply("Aucun role \"muted\" trouvé.")
        }
    } 
}