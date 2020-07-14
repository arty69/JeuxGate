const discord = require("discord.js")
const fs = require("fs")

exports.run = async (message) =>{
    if (message.guild.members.cache.get(message.client.user.id).hasPermission("MANAGE_ROLES")) {

        if (message.guild.roles.cache.filter(role => role.name.toLowerCase() === "muted").size === 0) {
            
            message.guild.roles.create({
                data:{
                    name: 'muted',
                    color: 'LIGHT_GREY',
                },
                reason: "création du rôles muted"
            }).then(y => {
                message.guild.channels.cache.map(channel => channel.overwritePermissions(message.guild.roles.cache.filter(role => role.name.toLowerCase() === "muted").first(), {
                    'SEND_MESSAGES': false
                }).catch(O_o => {}))
        }).catch(O_o => {})
        }
        if (message.guild.roles.cache.filter(role => role.name === "🔇Ne pas mentionner🔇").size === 0) {
            
            message.guild.roles.create({
                data:{
                    name: '🔇Ne pas mentionner🔇',
                    color: 'DARK_RED',
                },
                reason: "création du rôles ne pas mentionner"
            }).catch(O_o => {
                message.reply(O_o + "erreur").catch(err => {
                    message.reply("erreur trop longue : impossibilité de créer le role ne pas mentionner et / ou muted")
                })
            })
        }
    }
}