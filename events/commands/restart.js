const log = require('../../function/log.js')
const fs = require("fs")
const Discord = require('discord.js');
const prefix = fs.readFileSync("./config/prefix", "utf-8")


exports.run = async (message, statut) =>{
    
    if (message.author.id !== "474113083506425861" && message.author.id !== "471669236859928586") return 
    message.reply("Stopping in 10 seconds")
    setTimeout(y => {
        process.exit(-1)
    }, 10000)
}