const log = require('../../function/log.js')
const fs = require("fs")
const Discord = require('discord.js');
const prefix = fs.readFileSync("./config/prefix", "utf-8")

exports.run = async (message, client) =>{
    
    if(message.member.roles.cache.filter(role => role.name === "muted").size !== 0){
        log.log("[JeuxGate : Emuted] try to speak while muted gid" + message.guild.id + " uid" + message.author.id, "muted", message.guild.id + "/auto" )
        message.delete().catch(O_o => {
            message.channel.send("Je ne peux pas supprimer de message, merci de me donner les permissions nécessaire.")
        })
        message.reply("**Hey ...** Tu es mute, il t'es inutile de parler, tes messages seront supprimés.").then (y =>{
            setTimeout(() => {
                y.delete().catch(O_o => {
                    message.channel.send("Je ne peux pas supprimer de message, merci de me donner les permissions nécessaire.")
                })
            }, 1500)
        })
        return "don't go on"
    }
    
}