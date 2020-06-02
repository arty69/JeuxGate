
const fs = require("fs")

exports.run = async (message, client) =>{
    if (message.guild.members.get(client.user.id).hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) {

        if (message.guild.roles.filter(role => role.name.toLowerCase() === "muted").size === 0) {
            
            message.guild.createRole({
                name: 'muted',
                color: 'LIGHT_GREY',
            }).then(y => {
                message.guild.channels.map(channel => channel.overwritePermissions(message.guild.roles.filter(role => role.name.toLowerCase() === "muted").first(), {
                    'SEND_MESSAGES': false
                }).catch(O_o => {}))
        }).catch(O_o => {})
        }
        if (message.guild.roles.filter(role => role.name === "🔇Ne pas mentionner🔇").size === 0) {
            
            message.guild.createRole({
                name: '🔇Ne pas mentionner🔇',
                color: 'DARK_RED',
            }).catch(O_o => {
                message.reply(O_o + "erreur").catch(err => {
                    message.reply("erreur trop longue : impossibilité de créer le role ne pas mentionner et / ou muted")
                })
            })
        }
    }
    if(!fs.existsSync("./config/guild/" + message.guild.id + "/lastupdated") || (fs.readFileSync("./config/guild/" + message.guild.id + "/lastupdated", "utf-8") !== fs.readFileSync("./config/now", 'utf-8'))){
        
        message.guild.channels.map(channel => channel.overwritePermissions(message.guild.roles.filter(role => role.name.toLowerCase() === "muted").first(), {
            'SEND_MESSAGES': false
        }).catch(O_o => {}))
        fs.writeFileSync("./config/guild/" + message.guild.id + "/lastupdated", fs.readFileSync("./config/now", 'utf-8'))
    }
}