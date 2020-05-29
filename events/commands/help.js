const log = require('../../function/log.js')
const fs = require("fs")
const Discord = require('discord.js');
const prefix = fs.readFileSync("./config/prefix", "utf-8")

exports.run = async (message, client) =>{
    if(message.content.startsWith(prefix + "help")){
        log.log("[JeuxGate : Chelp] help command received from " + message.author.username + " - " + message.author.id, "help", message.guild.id + "/commands")
        
        var help_embed = new Discord.RichEmbed()
            .setColor("18d67e")
            .setTitle("Tu as besoin d'aide ?")
            .setThumbnail(message.author.avatarURL)
            .setDescription("Je suis là pour vous aider.")
            .addField("Aides", `voicis de l'aide !`)
            .addBlankField()
            .addField(":kiss: Kiss", "Fais `" + prefix + "kiss @quelqu'un` pour faire un bisous à `@quelqu'un` !")
            .addField(":hugging: Hug", "Fais `" + prefix + "hug @quelqu'un` pour faire un câlin à `@quelqu'un` !")
            .addField(":white_circle: Pile ou face", "Fais `" + prefix + "pf` pour faire un pile ou face !")
            .addField(":frame_photo: Avatar", "Fais `" + prefix + "avatar @quelqu'un` pour voir la photo de profil de `@quelqu'un` !")
            .addField(":8ball: Boule magique", "Fais `" + prefix + "8ball <vôtre question>` pour que la boule magique vous réponde") 
            .addField(":keyboard: Niveau", "Fais `" + prefix + "stats` pour connaître vôtre niveau") 
            .addField(":envelope: Serveur", "Fais `" + prefix + "serveur` pour obtenir le serveur du bot !")
            .addField(":door: Invitation", "Fais `" + prefix + "invite` pour obtenir le lien pour inviter le bot dans votre serveur !")
            .addBlankField()
            .addField(":no_bell: Mute", "Fais `" + prefix + "mute @quelqu'un` pour mute `@quelqu'un` !")
            .addField(":bell: Unmute", "Fais `" + prefix + "unmute @quelqu'un` pour unmute `@quelqu'un` !")
            .addField(":timer: Ping", "Fais `" + prefix + "ping` pour savoir le ping du bot!")
            .addField(":no_bell: Antimention", "Fais `" + prefix + "mention` pour recevoir le role d'antimention !")
            .addField(":abcd: Trouveur d'id", "Fais `" + prefix + "id <id d'une personne>` pour potentiellement savoir le nom à qui l'id est !")
            .addField(":skull_crossbones: purge", "Fais `" + prefix + "purge <un nombre>` pour supprimer <un nombre> de message(s) !")
            .addField("Bot infos", "Fais `" + prefix + "binfo` pour avoir des infos du bot !")
            .addField("Serveur infos", "Fais `" + prefix + "sinfo` pour avoir des infos du serveur !")
            .setTimestamp()
            .setFooter("JeuxGate")
        message.channel.send(help_embed);
    } 
}