const log = require('../../function/log.js')
const fs = require("fs")
const Discord = require('discord.js');
const prefix = fs.readFileSync("./config/prefix", "utf-8")
const Lunicode = require('../../function/lunicode'); //https://github.com/combatwombat/Lunicode.js
const insulte = JSON.parse(fs.readFileSync('./insulte.json', 'utf-8'));

function sizeofobj(obj) {
    var count = 0;
    for (var property in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, property)) {
            count++;
        }
    }
    return count;
}

function swap(text) {
    if (text === "text") return text
    var textreplaced = Lunicode.tools.creepify.decode(text)
    var textreplaced = Lunicode.tools.bubbles.decode(textreplaced)
    var textreplaced = Lunicode.tools.squares.decode(textreplaced)
    var textreplaced = Lunicode.tools.roundsquares.decode(textreplaced)
    var textreplaced = textreplaced.replace(/A|à|4|â|@|ã|ä|Д|ค/gi, "a")
    var textreplaced = textreplaced.replace(/B|8|ᱠ/gi, "b")
    var textreplaced = textreplaced.replace(/८|C|\(|<|\{|\[|ç/gi, "c")
    var textreplaced = textreplaced.replace(/δ|D/gi, "d")
    var textreplaced = textreplaced.replace(/Σ|E|€|3|è|é|ê|ë|£/gi, "e")
    var textreplaced = textreplaced.replace(/∱|F/gi, "f")
    var textreplaced = textreplaced.replace(/૬|G|6/gi, "g")
    var textreplaced = textreplaced.replace(/ђ|H/gi, "h")
    var textreplaced = textreplaced.replace(/ɨ|I|1|!|\||\}|เ/gi, "i")
    var textreplaced = textreplaced.replace(/ſ|J|\]/gi, "j")
    var textreplaced = textreplaced.replace(/ʞ|K|к/gi, "k")
    var textreplaced = textreplaced.replace(/⎳|L|7|ɭ/gi, "l")
    var textreplaced = textreplaced.replace(/Π|M|๓/gi, "m")
    var textreplaced = textreplaced.replace(/ה|N/gi, "n")
    var textreplaced = textreplaced.replace(/O|0|°|¤|#/gi, "o")
    var textreplaced = textreplaced.replace(/ᚹ|P|%/gi, "p")
    var textreplaced = textreplaced.replace(/Զ|Q|9/gi, "q")
    var textreplaced = textreplaced.replace(/ř|R/gi, "r")
    var textreplaced = textreplaced.replace(/ร|S|2|\$|&|§|\?/gi, "s")
    var textreplaced = textreplaced.replace(/ƚ|T/gi, "t")
    var textreplaced = textreplaced.replace(/մ|U|µ|ù|û/gi, "u")
    var textreplaced = textreplaced.replace(/ɤ|V|\^/gi, "v")
    var textreplaced = textreplaced.replace(/ᗯ|W/gi, "w")
    var textreplaced = textreplaced.replace(/Ӿ|X/gi, "x")
    var textreplaced = textreplaced.replace(/¥|Y/gi, "y")
    var textreplaced = textreplaced.replace(/ʓ|Z/gi, "z")
    var textreplaced = textreplaced.replace(/plutonium|pluttonium/gi, "pu")
    var textreplaced = textreplaced.replace(/tellure|telure|tellur|telur/gi, "te")
    return textreplaced
}

function dwords(text) {
    if (text === "text") return text;
    var textreplaced = swap(text)
    var i = 1;
    while (i <= parseInt(sizeofobj(insulte))) {
        if (textreplaced.includes(insulte[i].a.toString())) {
            return true
        }
        i++;
    }
    return false
}

function nobadwords(text) {
    if (text === "text") return text;
    var textreplaced = swap(text)
    var i = 1;
    while (i <= parseInt(sizeofobj(insulte))) {
        while (textreplaced.includes(insulte[i].a.toString())) {
            var textreplaced = textreplaced.replace(insulte[i].a.toString(), "**°°°**")
        }
        i++;
    }
    return textreplaced
}

exports.run = async (message) => {
    if (message.guild.roles.cache.filter(ro => ro.name === "jg insulte").size !== 0) {
        if (dwords(message.content)) {
            if (!message.member.hasPermission("ADMINISTRATOR")) {
                if(message.member.roles.cache.filter(role => role.name === "muted").size !== 0) return 
                log.log("[JeuxGate : Eantiinsulte] Triggered gid" + message.guild.id + " uid" + message.author.id, "antiinsulte", message.guild.id + "/auto" )
                if (!message.guild.member(message.client.user).hasPermission("ADMINISTRATOR")) {
                    if (!message.guild.member(message.client.user).hasPermission("MANAGE_MESSAGES") || !message.guild.member(message.client.user).hasPermission("MANAGE_ROLES")) return message.channel.send("**Hey ...** Je n'ai pas les permissions nécessaire pour faire cette action.");
                }
                message.delete({reason: "Anti insulte enclenché."}).catch(O_o => {
                    return message.channel.send('erreur 505 : permission insufissante : suppression message')
                })
                const re = new Discord.MessageEmbed()
                    .setTitle("Vous avez tenté de dire une insulte !")
                    .addField("message :", nobadwords(message.content))
                    .setTimestamp()
                    .setFooter("JeuxGate ")
                    .setAuthor(message.member.displayName, message.author.avatarURL({ size: 1024 }));
                const mentionnopembed = new Discord.MessageEmbed()
                    .setTitle("Vous avez tenté de dire une insulte !")
                    .addField("message :", nobadwords(message.content))
                    .addField(message.member.displayName, "Tu seras mute pendant 30 seconde !")
                    .setTimestamp()
                    .setFooter("JeuxGate ")
                    .setAuthor(message.member.displayName, message.author.avatarURL({ size: 1024 }));
                message.channel.send(mentionnopembed).then(y => {
                    message.member.roles.add(message.guild.roles.cache.filter(role => role.name.toLowerCase() === "muted").first().id, "Anti insulte enclenché.").catch(O_o => {
                        y.edit(re).catch(O_o => {
                            return message.channel.send('erreur 501 : erreur sans nom : impossibilité d\'éditer le message \+ erreur 500 : permission insuffisante')
                        })
                        return message.channel.send('erreur 500 : permission insuffisante : impossibilité d\'apliquer un rôle')
                    })
                    setTimeout(function () {
                        y.edit(re).catch(O_o => {
                            return message.channel.send('erreur 501 : erreur sans nom : impossibilité d\'éditer le message')
                        })
                        message.member.roles.remove(message.guild.roles.cache.filter(role => role.name.toLowerCase() === "muted").first().id, "Anti insulte enclenché.").catch(O_o => {
                            y.edit(re).catch(O_o => {
                                return message.channel.send('erreur 501 : erreur sans nom : impossibilité d\'éditer le message \+ erreur 500 : permission insuffisante')
                            })
                            return message.channel.send('erreur 500 : permission insuffisante : impossibilité de retirer un rôle')
                        })
                    }, 30000)
                })
            }
        }
    }
}
exports.isthereamotherfuckingbadword = async(text) => {
    if(dwords(text) === true)
        return true
    else
        return false
}
