const log = require('../../function/log.js')
const fs = require("fs")
const Discord = require('discord.js');
const prefix = fs.readFileSync("./config/prefix", "utf-8")

exports.run = async (message, client) =>{
    if(message.content.startsWith(prefix + "id")){
        log.log("[JeuxGate : Cid] id command received from " + message.author.username + " - " + message.author.id, "id", message.guild.id + "/commands")
        
        
        var idserched = message.content.substr(prefix.length + 3)
        if (!idserched || idserched === 0 || idserched === 1 || isNaN(idserched)) {
            return message.reply("**Hey ...** Tu as oublié de mettre un id !");
        }
        if (client.users.get(idserched)) {
            message.channel.send('Utilisateur avec id `' + idserched + '` trouvé, voici son nom d\'utilisateur : `' + client.users.get(idserched).username + '`.\r\n***Pour des raisons de confidentialitées, le discriminant*** `#----` ***n\'est pas cité.***')
            
        } else {
            var search_embed = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setTitle('Aucun utilisateur trouvé pour')
                .setDescription(`l'id ` + idserched +` désolé.`)
                .setTimestamp()
                .setFooter("JeuxGate")
            message.channel.send(search_embed);
            //merci à antoine62 pour m'avoir fait remarqué qu'on pouvait mentionner @everyone
        }
    } 
}