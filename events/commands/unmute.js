const log = require('../../function/log.js')
const fs = require("fs")
const Discord = require('discord.js');
const prefix = fs.readFileSync("./config/prefix", "utf-8")

exports.run = async (message, service) =>{
    log.log("[JeuxGate : Cunmute] unmute command received from " + message.author.username + " - " + message.author.id, "unmute", message.guild.id + "/commands")
    if(message.mentions.users.size !==0){
        if (fs.existsSync("./config/guild/" + message.guild.id + "/temp muted/" + message.mentions.members.first().id)){
            if (fs.readFileSync("./config/guild/" + message.guild.id + "/temp muted/" + message.mentions.members.first().id, "utf-8") === message.author.id.toString()){
                fs.unlinkSync("./config/guild/" + message.guild.id + "/temp muted/" + message.mentions.members.first().id)
                message.guild.member(message.mentions.users.first()).roles.remove(message.guild.roles.cache.filter(role => role.name.toLowerCase() === "muted").first()).then(member => {
                    if(!service)
                        message.channel.send(`${message.guild.member(message.mentions.users.first()).displayName} a été dé-mute par ${message.member.displayName} !`);
                    else
					    message.channel.send(`<@!${message.author.id}>, effectué sans problème. \r\n${message.guild.member(message.mentions.users.first()).displayName} a été dé-mute par ${message.member.displayName} !`);
                }).catch(e => {
                    if(e){
                        message.reply("Impossibilité d'appliquer le role : vérifier l'ordre des roles, jeuxgate doit être au dessus de la personne à mute.")
                        console.log(e)
                    }
                })
                return
            }
        }
    }
	if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply("Je suis désolé, or, vous n'avez pas la permission d'utiliser cette fonction.")
	if (!message.guild.member(message.client.user).hasPermission("MANAGE_ROLES")) return message.reply("Je suis désolé, or, je n'ai pas la permission d'utiliser cette fonction.");

    if (message.mentions.users.size === 0) {
        return message.reply("Vous devez mentionner quelqu'un pour faire cette commande");
    }
    var mute = message.guild.member(message.mentions.users.first());
    if (!mute) {
        message.reply("Je n'ai pas trouvé l'utilisateur ou il l'existe pas !");
        return
    }
    if (mute.id === message.client.user.id) {
        return message.reply("Je ne peux pas me unmute !")
    }
    if (message.guild.roles.cache.filter(role => role.name.toLowerCase() === "muted").size !== 0) {
        
        if(mute.roles.cache.filter(role => role.name === "muted").size === 0){
            return message.reply("Cette personne n'est pas mute !")
        }
        mute.roles.remove(message.guild.roles.cache.filter(role => role.name.toLowerCase() === "muted").first()).then(member => {
            if(!service && service !== true){
                message.channel.send(`${mute.displayName} a été dé-mute par ${message.member.displayName} !`);
            }else{
                message.channel.send(`<@!${message.author.id}>, fonction effectué sans problème. \r\n${mute.displayName} a été dé-mute par ${message.member.displayName} !`);
            }
        }).catch(e => {
            if(e){
                message.reply("Impossibilité d'appliquer le role : vérifier l'ordre des roles, jeuxgate doit être au dessus de la personne à mute.")
                console.log(e)
            }
        })
    } else {
        message.reply("Aucun role \"muted\" trouvé.")
    }
}

