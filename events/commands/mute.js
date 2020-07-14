const log = require('../../function/log.js')
const fs = require("fs")
const Discord = require('discord.js');
const prefix = fs.readFileSync("./config/prefix", "utf-8")

exports.run = async (message, service) =>{
    log.log("[JeuxGate : Cmute] mute command received from " + message.author.username + " - " + message.author.id, "mute", message.guild.id + "/commands")
    
	if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply("Je suis désolé, or, vous n'avez pas la permission d'utiliser cette fonction.")
	if (!message.guild.member(message.client.user).hasPermission("MANAGE_ROLES")) return message.reply("Je suis désolé, or, je n'ai pas la permission d'utiliser cette fonction.");

    if (message.mentions.users.size === 0) {
		return message.reply("Vous devez mentionner quelqu'un pour faire cette commande");
    }
    var mute = message.guild.member(message.mentions.users.first());
    if (!mute) {
        message.reply("Je n'ai pas trouvé l'utilisateur ou il n'existe pas !");
        return
    }
    if (mute.id === message.client.user.id) {
        return message.reply("Je ne peux pas me mute !");
    }
    if(mute.roles.cache.filter(role => role.name === "muted").size !== 0) {
        return message.reply("Cette personne est déjà mute.")
    }

    if (message.guild.roles.cache.filter(role => role.name.toLowerCase() === "muted").size !== 0) {
        mute.roles.add(message.guild.roles.cache.filter(role => role.name.toLowerCase() === "muted").first()).then(member => {
            if (service && service !== true){
                message.channel.send(`<@!${message.author.id}>, effectué sans problème. \r\n${mute.displayName} a été mute par ${message.member.displayName} !`);
            }else{
                message.channel.send(`${mute.displayName} a été mute par ${message.member.displayName} !`);
            }
        }).catch(e => {message.reply("Impossibilité d'appliquer le role : vérifier l'ordre des roles, jeuxgate doit être au dessus de la personne à mute."); console.log(e)})
    } else {
        message.reply("Aucun role \"muted\" trouvé.")
    }
    
}