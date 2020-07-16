const log = require('../../function/log.js')
const fs = require("fs")
const Discord = require('discord.js');
const prefix = fs.readFileSync("./config/prefix", "utf-8")

exports.run = async (message, service) =>{
    log.log("[JeuxGate : Cmute] mute command received from " + message.author.username + " - " + message.author.id, "mute", message.guild.id + "/commands")
    
	if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply("Je suis désolé, or, vous n'avez pas la permission d'utiliser cette fonction.")
	if (!message.guild.member(message.client.user).hasPermission("MANAGE_ROLES")) return message.reply("Je suis désolé, or, je n'ai pas la permission d'utiliser cette fonction.");

    if(service){
        if(fs.readFileSync("./config/user/" + message.author.id + "/" + message.guild.id + " service", 'utf-8') === ""){
            if(message.mentions.users.size !== 1){
                if(message.mentions.users.size === 0){
                    fs.unlinkSync("./config/user/" + message.author.id + "/" + message.guild.id + " service")
                    return message.reply("Vous devez mentionner quelqu'un pour faire cette commande")
                } else if(message.mentions.users.size >= 2 && message.mentions.users.size <= 20) {
                    console.log(1112)
                    var tomute = ""
                    message.content.match(/<@[!]?[0-9]*>/gi).map(men => {
                        var idmen = men.replace(/<@[!]?|>/gi, "")

                        tomute = tomute + ", " + message.guild.member(idmen).displayName
                    })
                    message.reply("Voulez vous que je mute " + tomute.replace(", ", "") + " soit " + message.content.match(/<@[!]?[0-9]*>/gi).length + " personnes ?")
                    fs.writeFileSync("./config/user/" + message.author.id + "/" + message.guild.id + " service", message.content)
                    return
                }else{
                    fs.unlinkSync("./config/user/" + message.author.id + "/" + message.guild.id + " service")
                    message.reply("Je ne peux mute qu'un maximum de 20 personnes")
                    return
                }
            }
        }else if(fs.readFileSync("./config/user/" + message.author.id + "/" + message.guild.id + " service", 'utf-8').match(/<@[!]?[0-9]*>/gi).length != 0){
            if (require("../message/jeuxgate au service").noisequestionmarknone(message.content).replace(/ /gi, "") !== "oui") {
                fs.unlinkSync("./config/user/" + message.author.id + "/" + message.guild.id + " service")
                return message.reply("Commande annulé")
            }
            var nummuted = 0 
            var msg = ""
            message.channel.send("Action en cours : ").then (msgs => {
                var msg = msgs.content
                if(message.guild.roles.cache.filter(ro => ro.name === "muted").first().comparePositionTo(message.guild.member(message.client.user.id).roles.highest) >= 0) return msgs.edit(msg + "Le rôle muted est au dessus du mien, merci de le mettre en dessous, ou de mettre au dessus de lui !")
                var ments = fs.readFileSync("./config/user/" + message.author.id + "/" + message.guild.id + " service", 'utf-8').match(/<@[!]?[0-9]*>/gi)
                var done =" "
                for (var i = 0; i < ments.length; i++) {
                    var men = ments[i] 
                    var idmen = men.replace(/<@[!]?|>/gi, "")
                    if(done.includes(idmen)) return
                    var mute = message.guild.member(idmen)
                    console.log()
                    if (!mute) {
                        msg = msg + "\r\nJe n'ai pas trouvé l'utilisateur ou il n'existe pas ! id : " + idmen + "."
                        continue
                    }

                    if (mute.id === message.client.user.id) {
                        msg = msg + "\r\nJe ne peux pas me mute !"
                        continue
                    }

                    if(mute.roles.cache.filter(role => role.name === "muted").size !== 0) {
                        msg = msg + "\r\n" + mute.displayName +" est déjà mute."
                        continue
                    }
                
                    if (message.guild.roles.cache.filter(role => role.name.toLowerCase() === "muted").size !== 0) {
                        var msg = msg 
                        try {
                            mute.roles.add(message.guild.roles.cache.filter(role => role.name.toLowerCase() === "muted").first()).then (u => {}).catch(error => {
                                throw error;
                            })
                        } catch (error) {
                            return msg = msg + "\r\nImpossibilité d'appliquer le role à " + mute.displayName + " !"
                        }
                        nummuted = nummuted + 1
                        msg = msg + "\r\n" + mute.displayName + " a bien été mute !"
                        console.log(mute.displayName + "muted")
                    } else {
                        return message.reply("Aucun role \"muted\" trouvé.")
                    }
                }
                fs.unlinkSync("./config/user/" + message.author.id + "/" + message.guild.id + " service")
                msg = msg + "\r\nJ'ai rendu muet " + nummuted + " personne(s) sur les " + i + " détect(é) *(les doublon(s) ont été retiré)*"
                msgs.edit(msg)
            })
            return
        }
    }

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