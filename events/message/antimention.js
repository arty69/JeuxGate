const log = require('../../function/log.js')
const fs = require("fs")
const Discord = require('discord.js');
const prefix = fs.readFileSync("./config/prefix", "utf-8")

exports.run = async (message, client) =>{
    if (message.mentions.members.size !== 0) {
        if (message.member.roles.cache.filter(roles => roles.name === "muted").size !== 0) {
            var mentionned = ""
            message.mentions.members.forEach(mention => {
                mentionned = mentionned + mention.displayName + ", " 
            });
            return message.channel.send(mentionned + "vous avez été mentionné par <@" + message.author.id + ">")
        }
        if (message.guild.roles.cache.filter(ro => ro.name === "🔇Ne pas mentionner🔇").size === 0) return
        if (message.mentions.members.filter(mentionned => mentionned.roles.cache.filter(role => role.name === "🔇Ne pas mentionner🔇").size !==0).size !==0) {
            log.log("[JeuxGate : Eantimention] Triggered gid" + message.guild.id + message.guild.name + " uid" + message.author.id + " u mentionned" + message.mentions.members.filter(mentionned => mentionned.roles.cache.filter(role => role.name === "🔇Ne pas mentionner🔇").size !== 0).size + message.mentions.members.filter(mentionned => mentionned.roles.cache.filter(role => role.name === "🔇Ne pas mentionner🔇").size !==0).first().displayName + message.mentions.members.filter(mentionned => mentionned.roles.cache.filter(role => role.name === "🔇Ne pas mentionner🔇").size !==0).first().roles, "antimention"  , message.guild.id + "/auto" )
            if (!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.channel.send("**Hey ...** Je n'ai pas les permissions nécessaire pour faire cette action.");
            if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.channel.send("**Hey ...** Je n'ai pas les permissions nécessaire pour faire cette action.");
            message.delete().catch(O_o => {
                return message.channel.send('erreur 505 : permission insufissante : suppression message')
            })
            if(!fs.existsSync("./config/guild/" + message.guild.id + "/")) fs.mkdirSync("./config/guild/" + message.guild.id + "/")
            if(!fs.existsSync("./config/guild/" + message.guild.id + "/temp muted/")) fs.mkdirSync("./config/guild/" + message.guild.id + "/temp muted/")
            fs.writeFileSync("./config/guild/" + message.guild.id + "/temp muted/" + message.author.id, message.mentions.members.filter(mentionned => mentionned.roles.cache.filter(role => role.name === "🔇Ne pas mentionner🔇").size !==0).first().id.toString())
            const re = new Discord.MessageEmbed()
                .setTitle("Vous avez tenté de mentionner quelqu'un qu'on ne doit pas mentionner !")
                .addField("message :", message.content)
                .setTimestamp()
                .setFooter("JeuxGate")
                .setAuthor(message.guild.members.cache.get(message.author.id).displayName, message.author.avatarURL({ size: 1024 }));
            const mentionnopembed = new Discord.MessageEmbed()
                .setTitle("Vous avez tenté de mentionner quelqu'un qu'on ne doit pas mentionner !")
                .addField("message :", message.content)
                .addField('​', '​')
                .addField(message.mentions.members.filter(mentionned => mentionned.roles.cache.filter(role => role.name === "🔇Ne pas mentionner🔇").size !==0).first().displayName + " Si tu penses qu'il ne devrait pas être mute", "tape `jg/unmute @" + message.member.displayName + "` et il sera demute !")
                .addField('​', '​')
                .addField(message.guild.members.cache.get(message.author.id).displayName, "Tu seras mute pendant 30 seconde !")
                .setTimestamp()
                .setFooter("JeuxGate")
                .setAuthor(message.guild.members.cache.get(message.author.id).displayName, message.author.avatarURL({ size: 1024 }))
            message.channel.send(mentionnopembed).then(y => {
                message.member.roles.add(message.guild.roles.cache.filter(role => role.name.toLowerCase() === "muted").first().id).catch(O_o => {
                    y.edit(re).catch(O_o => {
                        return message.channel.send('erreur 501 : erreur sans nom : impossibilité d\'éditer le message \+ erreur 500 : permission insuffisante')
                    })
                    return message.channel.send('erreur 500 : permission insuffisante : impossibilité d\'aplliquer un role')
                })
                setTimeout(function () {
                    y.edit(re).catch(O_o => {
                        return message.channel.send('erreur 501 : erreur sans nom : impossibilité d\'éditer le message')
                    })
                    if(fs.existsSync("./config/guild/" + message.guild.id + "/temp muted/" + message.author.id)) fs.unlinkSync("./config/guild/" + message.guild.id + "/temp muted/" + message.author.id)
                    message.member.roles.remove(message.guild.roles.cache.filter(role => role.name.toLowerCase() === "muted").first().id).catch(O_o => {
                        y.edit(re).catch(O_o => {
                            return message.channel.send('erreur 501 : erreur sans nom : impossibilité d\'éditer le message \+ erreur 500 : permission insuffisante')
                        })
                        return message.channel.send('erreur 500 : permission insuffisante : impossibilité d\'aplliquer un role')
                    })

                }, 30000)
            })
            return "don't go on"
        }
    }
}
