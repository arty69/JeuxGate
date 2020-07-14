const log = require('../../function/log.js')
const fs = require("fs")
const Discord = require('discord.js');
const prefix = fs.readFileSync("./config/prefix", "utf-8")

function treereload(base){
    fs.readdirSync(base).forEach(obj => {
        if (fs.existsSync(base + obj) && fs.lstatSync(base + obj).isDirectory()){
            treereload(base + obj)
        }else if (obj.endsWith(".js")){
            
            try {
                delete require.cache[require.resolve("../../" + base.replace("./", "") +"/"+ obj)];
            } catch (error) {
                message.reply(`une erreure s'est produite à la suppression de la commande ${base +"/"+ obj} du cache`)
            }

            try {
                require("../../" + base.replace("./", "") +"/"+ obj)
            } catch (error) {
                message.reply(`une erreure s'est produite à la réintrocution de la commande ${base +"/"+ obj}`)
            }
        }
    })
}

exports.run = async (message, statut) =>{
    log.log("[JeuxGate : Creload] reload  command received from " + message.author.username + " - " + message.author.id, "help", message.guild.id + "/commands")
    
    

    if (message.author.id !== "474113083506425861" && message.author.id !== "471669236859928586") return 
    var command = "." + message.content.replace(/jg\/reload |jgt\/reload |reload /g, "")
    if (command === ".*"){
        treereload("./events/")
        return message.reply("ok")

    }
    if(!fs.existsSync(command)) return message.reply ("commande à reload inconnue")
    message.channel.send(`tentative de reload de .${command}`)

    delete require.cache[require.resolve("../../" + command)];
    try {
        require("../../" + command)
        message.reply("Réintrodution effectué")
    } catch (error) {
        message.reply(`une erreure s'est produite à la réintrocution de la commande.`)
    }
}