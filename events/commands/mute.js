const log = require('../../function/log.js')
const fs = require("fs")
const Discord = require('discord.js');
const prefix = fs.readFileSync("./config/prefix", "utf-8")

exports.run = async (message, client) =>{
    if(message.content.startsWith(prefix + "mute")){
        log.log("[JeuxGate : Cmute] mute command received from " + message.author.username + " - " + message.author.id, "mute", message.guild.id + "/commands")
        
        if (!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("**Hey ...** Vous n'avez pas la permission nécessaire pour effectuer cette action.");
        if (!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("**Hey ...** Je n'ai pas les permissions nécessaire pour faire cette action.");

        if (message.mentions.users.size === 0) {
            return message.reply("Tu dois mentionner quelqu'un pour faire cette commande");
        }
        var mute = message.guild.member(message.mentions.users.first());
        if (!mute) {
            message.reply("Je n'ai pas trouvé l'utilisateur ou il n'existe pas !");
			return
        }
        if (message.content.substr(prefix.length + 4) === " <@!515891064721244162>") {
            return message.reply("Je ne peux pas me mute !");
        }
        if(mute.roles.filter(role => role.name === "muted").size !== 0) {
            return message.reply("Cette personne est déjà mute.")
        }

        if (message.guild.roles.filter(role => role.name.toLowerCase() === "muted").size !== 0) {
            mute.addRole(message.guild.roles.filter(role => role.name.toLowerCase() === "muted").first()).then(member => {
                message.channel.send(`${mute.user.username} a été mute par ${message.author.username} !`);
            }).catch(e => message.reply("Impossibilité d'appliquer le role : vérifier l'ordre des roles, jeuxgate doit être au dessus de la personne à mute."))
        } else {
            message.reply("Aucun role \"muted\" trouvé.")
        }
        
    } 
}