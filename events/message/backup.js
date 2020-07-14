const log = require('../../function/log.js')
const fs = require("fs")
const Discord = require('discord.js');
const prefix = fs.readFileSync("./config/prefix", "utf-8")

exports.run = async (message) =>{

    if(message.guild.name.includes(" Backup")) return 
    if(message.client.guilds.cache.filter(guild => guild.name === message.guild.name + " Backup").size === 1){
        guildbackup = message.client.guilds.cache.filter(guild => guild.name === message.guild.name + " Backup").first()
        if(guildbackup.channels.cache.filter(channel => channel.type === message.channel.type && channel.name === message.channel.name).size !== 0){
            
            if (message.client.guilds.cache.get(message.guild.id).members.cache.get(message.author.id).nickname) {
                var user = message.client.guilds.cache.get(message.guild.id).members.cache.get(message.author.id).nickname
            } else {
                var user = message.author.username
            }
            const embed = new Discord.MessageEmbed()
            .setTimestamp()
            .setFooter(message.client.user.tag + " - Jéhèndé#2054")
            .setDescription(message.content + "-")
            .setAuthor(user + " : ", message.author.avatarURL({ size: 1024 }))
            guildbackup.channels.cache.filter(channel => channel.type === message.channel.type && channel.name === message.channel.name).first().send(embed)
        }else{
            guildbackup.channels.create(message.channel.name, message.channel.type).then(cha => cha.setParent(guildbackup.channels.cache.filter(chan => chan.type === "category" && chan.name === message.guild.channels.cache.filter(chann => chann.type === "category" && chann.name === message.channel.parent.name).first().name).first())).then(ch =>{
                
                
            if (message.client.guilds.cache.get(message.guild.id).members.cache.get(message.author.id).nickname) {
                var user = message.client.guilds.cache.get(message.guild.id).members.cache.get(message.author.id).nickname
            } else {
                var user = message.author.username
            }
            const embed = new Discord.MessageEmbed()
            .setTimestamp()
            .setFooter(message.client.user.tag + " - Jéhèndé#2054")
            .setDescription(message.content + "-")
            .setAuthor(user + " : ", message.author.avatarURL({ size: 1024 }))
            ch.send(embed)
            })
        }
    }
    
}