const log = require('../../function/log.js')
const fs = require("fs")
const Discord = require('discord.js');
const prefix = fs.readFileSync("./config/prefix", "utf-8")

exports.run = async (message, client) =>{
    if(message.content.startsWith(prefix + "stats")){
        log.log("[JeuxGate : Cstats] stats command received from " + message.author.username + " - " + message.author.id, "stats", message.guild.id + "/commands")
        
        var stat = message.content.substr(prefix.length + 6);
        if(stat){
            var sstat = stat.replace(/</gi, "").replace(/@/gi, "").replace(/>/gi, "").replace(/!/gi, "")
        }else{
            var sstat = message.author.id
        }
        if (fs.existsSync("./config/guild/" + message.guild.id + "/lvl/" + sstat + " lvl.json", "utf-8")){
            var lvlu = JSON.parse(fs.readFileSync("./config/guild/" + message.guild.id + "/lvl/" + sstat + " lvl.json", "utf-8"))
            var lvl = JSON.parse(fs.readFileSync("./config/lvl.json", "utf-8"))
            
            if(client.users.filter(u => u.id == sstat).size != 0){
                uname = client.users.filter(u => u.id == sstat).first().username
            }else{
                uname = "Pseudo inconnu."
            }
            
            var lvl_embed = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setTitle('Niveau de ' + uname + ' :')
                .addField('Vous avez envoyé **' + lvlu["messagesend"] + '** messages !', `Pour passer de niveau vous devez envoyer `+ (lvl[`${lvlu['level'] + 1}`] - lvlu["messagesend"]).toString()  + ` messages !`)
                .setDescription('voici vôtre niveau :' + lvlu['level'])
            message.channel.send(lvl_embed);
        }else{
            message.reply("L'utilisateur n'a pas de niveau. " + sstat)
        }
        
    } 
}