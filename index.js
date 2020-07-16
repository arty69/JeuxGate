const fs = require('fs');
const Discord = require('discord.js');
const log = require('./function/log.js')
const client = new Discord.Client();
const events = {
    MESSAGE_REACTION_ADD: 'messageReactionAdd',
    MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};
const prefix = fs.readFileSync("./config/prefix", "utf-8")

console.log("ok")
let ts = Date.now();
let date_ob = new Date(ts);
let minute = date_ob.getMinutes();
let hour = date_ob.getHours();
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();
const start = year + "-" + month + "-" + date + " " + hour + "-" + minute

require("./setup.js").run(start)


process.on('SIGINT', _ => {
    log.log("[JeuxGate : index] Stopping.")
    client.destroy()
	ok = "pas ok"
    fs.closeSync(0)
	process.exit(0)
});

client.login(process.env.TOKEN).catch(z =>{
    log.log(z + "\"" + process.env.TOKEN + "\"", "GLOABL")
    process.exit(1)
})

client.on("ready", async () => {
    require("./events/ready").run(client)
});

client.on("message", async (message) => {

    //anti
    //!bot
    if (message.author.bot) return;
    //join/nitro boost mess
    if (message.system) return;
    //dm
    if (message.channel.type === "dm") return message.channel.send(`Vous ne pouvez pas intéragir avec moi avec des mp. Vous devez intéragir avec moi dans un serveur !`);
    //antirule command
    if(message.channel.id == "428569427718438933" || message.channel.id == "517373451577589781") return
    //banned
    if(require("./function/banneedcheck").run(message.guild.id, message.author.id)) {
        if (message.content.includes("jeuxgate")){
            message.reply("Serveur / utilisateur banni")
        }
        return
    }
    require("./function/setupguild").run(message)

    if(!fs.existsSync("./config/guild/" + message.guild.id + "/lastupdated") || (fs.readFileSync("./config/guild/" + message.guild.id + "/lastupdated", "utf-8") !== fs.readFileSync("./config/now", 'utf-8'))){
        
        message.guild.channels.cache.map(channel => channel.overwritePermissions(message.guild.roles.cache.filter(role => role.name.toLowerCase() === "muted").first(), {
            'SEND_MESSAGES': false
        }).catch(O_o => {}))
        fs.writeFileSync("./config/guild/" + message.guild.id + "/lastupdated", fs.readFileSync("./config/now", 'utf-8'))
    }
    console.log(message.guild.name)
    fs.readdirSync("./events/message/").forEach(u => {
        if(u.endsWith(".js")) {
            if (require("./events/message/" + u).run(message) === "don't go on") return
        }
    })
    
    if(message.content.startsWith("!") || message.content.startsWith("?") || message.content.startsWith("/") || message.content.startsWith(".") || message.content.startsWith("-") || message.content.startsWith("+") || message.content.startsWith("^^") || message.content.startsWith("t!")) return 
    if(message.member.roles.cache.filter(role => role.name === "muted").size !== 0) return
    if(fs.existsSync("./config/user/" + message.author.id + "/" + message.guild.id + " service")) return
    if(message.content.startsWith(prefix)){
        if(fs.existsSync('./events/commands/'+ message.content.replace(prefix, "").split(" ")[0] + ".js")){
            
            fs.writeFileSync("./config/metric/commande", parseInt(fs.readFileSync("./config/metric/commande", 'utf-8'))+1)
            require('./events/commands/'+ message.content.replace(prefix, "").split(" ")[0] + ".js").run(message)
        }
    }
    
    
})

client.on("messageReactionAdd", async (reaction, user) => fs.readdirSync("./events/reaction/").forEach(u => require("./events/reaction/"+u).run(reaction, user)))
client.on("guildMemberUpdate", async (oldMember, newMember) => {fs.readdirSync("./events/member update/").forEach(u => require("./events/member update/"+u).run(oldMember, newMember))})