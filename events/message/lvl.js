const log = require('../../function/log.js')
const fs = require("fs")
const Discord = require('discord.js');
const prefix = fs.readFileSync("./config/prefix", "utf-8")

exports.run = async (message, client) =>{
    if(message.content.includes(prefix)) return
    if(message.member.roles.filter(role => role.name === "muted").size !==0) return
    if (fs.existsSync("./config/guild/" + message.guild.id + "/lvl/" + message.author.id + " lvl.json")){
        if (!fs.existsSync("./config/guild/" + message.guild.id + "/lvl/enabled")) return fs.writeFileSync("./config/guild/" + message.guild.id + "/lvl/enabled", "off")
        if (!fs.existsSync("./config/guild/" + message.guild.id + "/lvl/enabled") || !(fs.readFileSync("./config/guild/" + message.guild.id + "/lvl/enabled", "utf-8") === "on")) return
        log.log("[JeuxGate : elvl] Created lvl ", "messages", message.guild.id + "/lvl")
        if(!fs.existsSync("./config/guild/" + message.guild.id + "/lvl/" + message.author.id + " cooldown")){
            fs.writeFileSync("./config/guild/" + message.guild.id + "/lvl/" + message.author.id + " cooldown", "on")
            var lvlu = JSON.parse(fs.readFileSync("./config/guild/" + message.guild.id + "/lvl/" + message.author.id + " lvl.json", "utf-8"))
            var lvl = JSON.parse(fs.readFileSync("./config/lvl.json", "utf-8"))
            lvlu["messagesend"]++
            if(!lvl[`${lvlu["level"] + 1}`]){
                lvl[`${lvlu["level"] + 1}`] = (lvl[lvlu["level"]] * 2)
            }
            if (lvlu["messagesend"] >= lvl[`${lvlu["level"] + 1}`]){
                lvlu["level"]++
                message.channel.send(`**Hey ${message.author.username}, sache que tu viens de gagner un niveau, tu es désormais au niveau : ${lvlu["level"]} . GG à toi**`);
            }
            fs.writeFileSync("./config/lvl.json", JSON.stringify(lvl))
            fs.writeFileSync("./config/guild/" + message.guild.id + "/lvl/" + message.author.id + " lvl.json", JSON.stringify(lvlu))
            setTimeout( () => {
                fs.unlinkSync("./config/guild/" + message.guild.id + "/lvl/" + message.author.id + " cooldown")
                
            }, 5000)
        }
    }else{
        log.log("[JeuxGate : elvl] Creating lvl ", "messages", message.guild.id + "/lvl")
        if(fs.existsSync("./config/guild/" + message.guild.id + "/lvl/")){
            fs.writeFileSync("./config/guild/" + message.guild.id + "/lvl/enabled", "off")
            fs.writeFileSync("./config/guild/" + message.guild.id + "/lvl/" + message.author.id + " lvl.json", "{\"level\": 0,\"messagesend\": 0}")
        }else{
            fs.mkdirSync("./config/guild/" + message.guild.id + "/lvl/")
            fs.writeFileSync("./config/guild/" + message.guild.id + "/lvl/enabled", "off")
            fs.writeFileSync("./config/guild/" + message.guild.id + "/lvl/" + message.author.id + " lvl.json", "{\"level\": 0,\"messagesend\": 0}")
        }
    }
    
}