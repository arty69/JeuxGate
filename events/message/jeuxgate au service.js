/*
            /\               █████╗ ████████╗████████╗███████╗███╗   ██╗████████╗██╗ ██████╗ ███╗   ██╗
           /  \             ██╔══██╗╚══██╔══╝╚══██╔══╝██╔════╝████╗  ██║╚══██╔══╝██║██╔═══██╗████╗  ██║
          /  | \            ███████║   ██║      ██║   █████╗  ██╔██╗ ██║   ██║   ██║██║   ██║██╔██╗ ██║
         /   |  \           ██╔══██║   ██║      ██║   ██╔══╝  ██║╚██╗██║   ██║   ██║██║   ██║██║╚██╗██║
        /    |   \          ██║  ██║   ██║      ██║   ███████╗██║ ╚████║   ██║   ██║╚██████╔╝██║ ╚████║
       /          \         ╚═╝  ╚═╝   ╚═╝      ╚═╝   ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
      /      O     \        
     /______________\       


     Je ne recommence à personne d'utiliser ceci en production.

     Pour désactivé ce module, il suffit soit de le supprimé soit
     de le renommé et ne peux aps mettre .js à la fin.

     à utilisé que dans environnment contrôlé.
*/


const log = require('../../function/log.js')
const fs = require("fs")
const Discord = require('discord.js');
const prefix = fs.readFileSync("./config/prefix", "utf-8")
var https = require('follow-redirects').https;

function replacenoise(text) {
    var txt = text.toLowerCase()
    var txt = txt.replace(/s'il te plait/gi, "")
    var txt = txt.replace(/stp/gi, "")
    var txt = txt.replace(/s /gi, " ")
    var txt = txt.replace(/bot /gi, "b")
    var txt = txt.replace(/bot/gi, "b")
    var txt = txt.replace(/serveur /gi, "s")
    var txt = txt.replace(/serveur/gi, "s")
    var txt = txt.replace(/information/gi, "info")
    var txt = txt.replace(/infob/gi, "binfo")
    var txt = txt.replace(/info b/gi, "binfo")
    var txt = txt.replace(/infos/gi, "sinfo")
    var txt = txt.replace(/info s/gi, "sinfo")
    var txt = txt.replace(/  /gi, "")
    return txt
}

function maintextutility(text, message) {
    var txt = text.toLowerCase()
    var txt = txt.replace(/ait/gi, "ai")

    var txt = txt.replace(/tu sert/gi, 'tu ser')

    var txt = txt.replace(/à/gi, 'a')

    var txt = txt.replace(/quoa/gi, 'quoi')
    var txt = txt.replace(/koa/gi, 'quoi')
    var txt = txt.replace(/koi/gi, 'quoi')

    var txt = txt.replace(/prévi1/gi, 'prévien')

    var txt = txt.replace(/\br[éeè]p[éeè]te apr[éeè] moi|\bdi(s|t|\b)/gi, 'répète')

    var txt = txt.replace(/fai un calin|caline|calin/gi, 'hug')

    var txt = txt.replace(/kis(s|\b)|embra(ss|s|c)e/gi, 'kiss')

    var txt = txt.replace(/mange|mordille/gi, 'eat')

    var txt = txt.replace(/rigole|moque/gi, 'laugh')

    //--  **  --  **  --  **  --  **  --  **  --

    if (txt.replace(/\?| \?/gi, "") === "tu ser a quoi") {
        return require("../commands/help").run(message, true)
    }
    if (txt.startsWith("prévien")) {
        return "Cette fonctionnalité n'a pas encore implanté."
    }
    if (txt.startsWith("répète")) {
        var reg = /\br[éeè]p[éeè]te apr[éeè] moi|\bdi(s|t|\b)/gi
        if (message.content.replace(reg, '') !== ""){
            if (message.content.replace(reg, '').replace(/ /gi, "") !== "camion"){
                var insulte = Boolean(require("./antiinsulte").isthereamotherfuckingbadword(message.content.replace(reg, '')))
                if(insulte === true || message.content.match(/<@[!|?|&]?[0-9]*>/gi) || message.content.includes("@everyone") || message.content.includes("@here")){
                    return "Je ne préfère pas."
                }else{
                    console.log(insulte)
                    return message.channel.send(message.content.replace(reg, ''))
                }
            }else{
                return "non"
            }
        }else{
            return "je ne trouve pas quoi répèté"
        }
    }
    if (txt.startsWith("hug")) {
        return require('../commands/hug').run(message, true)
    }
    if (txt.startsWith("kiss")) {
        return require('../commands/kiss').run(message, true)
    }
    if (txt === "rien") {
        return "ok"
    }
    if (txt.startsWith("eat")) {
        return require("../commands/eat").run(message, true)
    }
    if (txt.startsWith("laugh")) {
        return require("../commands/laugh").run(message, true)
    }


    return conversationhandler(txt, message)
}

function conversationhandler(text, message) {
    var txt = text
    var txt = txt.replace(/es-ce|est ce|e ce/gi, "est-ce")

    var txt = txt.replace(/bjr/gi, "bonjour")
    var txt = txt.replace(/slt/gi, "salut")
    var txt = txt.replace(/salut/gi, "bonjour")

    var txt = txt.replace(/sa va/gi, "ça va")
    var txt = txt.replace(/ca va/gi, "ça va")

    var txt = txt.replace(/tu fai quoi/gi, "tfk")
    var txt = txt.replace(/tu fai quoa/gi, "tfk")
    var txt = txt.replace(/tu fai koi/gi, "tfk")
    var txt = txt.replace(/tu fai koa/gi, "tfk")

    var txt = txt.replace(/pourquoi/gi, "pk")
    
    var txt = txt.replace(/est-ce que je devrai/gi, "devrai-je")
    var txt = txt.replace(/devrai je/gi, "devrai-je")
    if(txt.startsWith("devrai") && message.content.endsWith("?"))
        var txt = txt.replace(/devrai/gi , "devrai-je")

    var txt = txt.replace(/\.|!|;|:|\?|,/gi, "")
    var txt = txt.replace(/  /gi, "")
    console.log(txt)

    if (txt === "bonjour") {
        return "Bonjour. "
    }
    if (txt.split(" ")[0] === "bonjour") {
        if (txt.replace(/\.|!|;|:|\?|,/gi, "") === "bonjour ça va" || txt.replace(/\.|!|;|:|\?|,/gi, "") === "bonjour ça va ") {
            return "Bien."
        }
    }
    if (txt === "ça va" || txt === "ça va ") {
        return "Bien"
    }
    if (txt.startsWith("pk")) {
        if(txt.replace(/\.|!|;|:|\?|,/gi, "").split(" ").length === 1) return "Pourquoi quoi ? "
        var pk = [
            "Par ce que.",
            "Car c'est logique voyons.",
            "Car ce serait nuls sinon.",
            "J'en ai aucune idée.",
            "Pourquoi pas.",
            "42.",
            "Pour la même raison que Justin bieber est devenu populaire.",
            "à cause de la sélection naturelle."
        ];
        var anspk = pk[Math.floor(Math.random() * pk.length)];
        return anspk
    }
    if (txt === "tfk" || txt === "tfk ") {
        var tfk = [
            "Je joue.",
            "Je sais pas quoi faire.",
            "Je m'ennuie.",
            "Je fait de la modération sur certains serveur",
            "Rien."
        ];
        var anstfk = tfk[Math.floor(Math.random() * tfk.length)];
        return anstfk
    }
    if (txt === "sah") {
        return "Quel plaisir."
    }
    if (txt.startsWith("devrai-je")){
        return require("../commands/8ball").run(message, true)
    }


    return "J'ai pas trouvé d'action pour vôtre requête.\r\n\r\nPour rappel, cette fonctionnalité est en bêta et vient à peine de commencer."
}

exports.run = async (message) => {

    
    if (fs.existsSync("./config/user/" + message.author.id + "/" + message.guild.id + " service")) {
        
        setTimeout(() => {
            if (message.deleted) return
            log.log(message.content, "jeuxgate au service")
            fs.writeFileSync("./config/metric/service", parseInt(fs.readFileSync("./config/metric/service", 'utf-8')) + 1)
            if (fs.readFileSync("./config/user/" + message.author.id + "/" + message.guild.id + " service", 'utf-8') === "") {
                console.log(replacenoise(message.content).split(" "))
    
                if (fs.existsSync("./events/commands/" + replacenoise(message.content).split(" ")[0] + ".js")) {
    
                    require("../commands/" + replacenoise(message.content).split(" ")[0]).run(message, Boolean(true))
                } else {
                    var rep = maintextutility(replacenoise(message.content), message)
                    if (typeof (rep) === "string") message.reply(rep)
                }
                
                if (fs.readFileSync("./config/user/" + message.author.id + "/" + message.guild.id + " service", 'utf-8') === "") fs.unlinkSync("./config/user/" + message.author.id + "/" + message.guild.id + " service")
                return
            }else if (fs.existsSync("./events/commands/" + replacenoise(fs.readFileSync("./config/user/" + message.author.id + "/" + message.guild.id + " service", 'utf-8')).split(" ")[0] + ".js")){
                console.log(replacenoise(message.content).split(" ") + "2nd pass")
                require("../commands/" + replacenoise(fs.readFileSync("./config/user/" + message.author.id + "/" + message.guild.id + " service", 'utf-8')).split(" ")[0]).run(message, Boolean(true))
            }
            if (fs.existsSync("./config/user/" + message.author.id + "/" + message.guild.id + " service")) console.log(replacenoise(fs.readFileSync("./config/user/" + message.author.id + "/" + message.guild.id + " service", 'utf-8')).split(" "))
        }, 500 + Math.random() * 100);
    } else {
        if (message.content.toLowerCase() === "jeuxgate ?" || message.content.toLowerCase() === "jeuxgate") {
            
            setTimeout(() => {
                if (message.deleted) return
                fs.writeFileSync("./config/user/" + message.author.id + "/" + message.guild.id + " service", "")
                message.reply("Que puis-je faire pour vous ?")
            }, 500 + Math.random() * 100);
        }
    }

}

exports.noisequestionmarknone = (text) => {
    var txt = replacenoise(text)
    return txt.toString()
}