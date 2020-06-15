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
    require("./function/setupguild").run(message, client)

    if(!fs.existsSync("./config/guild/" + message.guild.id + "/lastupdated") || (fs.readFileSync("./config/guild/" + message.guild.id + "/lastupdated", "utf-8") !== fs.readFileSync("./config/now", 'utf-8'))){
        
        message.guild.channels.cache.map(channel => channel.overwritePermissions(message.guild.roles.cache.filter(role => role.name.toLowerCase() === "muted").first(), {
            'SEND_MESSAGES': false
        }).catch(O_o => {}))
        fs.writeFileSync("./config/guild/" + message.guild.id + "/lastupdated", fs.readFileSync("./config/now", 'utf-8'))
    }
    console.log(message.guild.name)
    fs.readdirSync("./events/message/").forEach(u => {
        if(u.endsWith(".js")) {
            if (require("./events/message/" + u).run(message, client) === "don't go on") return
        }
    })
    
    if(message.content.startsWith("!") || message.content.startsWith("?") || message.content.startsWith("/") || message.content.startsWith(".") || message.content.startsWith("-") || message.content.startsWith("+") || message.content.startsWith("^^") || message.content.startsWith("t!")) return 
    if(message.member.roles.cache.filter(role => role.name === "muted").size !== 0) return
    
    if(fs.existsSync('./events/commands/'+ message.content.replace(prefix, "").split(" ")[0] + ".js")){
        require('./events/commands/'+ message.content.replace(prefix, "").split(" ")[0] + ".js").run(message, client)
    }
    
    
})

client.on("messageReactionAdd", async (reaction, user) => fs.readdirSync("./events/reaction/").forEach(u => require("./events/reaction/"+u).run(reaction, user, client)))
client.on("guildMemberUpdate", async (oldMember, newMember) => {
    
    if (fs.existsSync("./config/guild/" + oldMember.guild.id + "/banned.jgform")){
        if(fs.readFileSync("./config/guild/" + oldMember.guild.id + "/banned.jgform", "utf-8") !== ""){
            
            return 
        }
    }else{
        if(fs.existsSync("./config/guild/" + oldMember.guild.id + "/")){
            fs.writeFileSync("./config/guild/" + oldMember.guild.id + "/banned.jgform", "")
        }else{
            fs.mkdirSync("./config/guild/" + oldMember.guild.id + "/")
            fs.writeFileSync("./config/guild/" + oldMember.guild.id + "/banned.jgform", "")
        }
    }
    if (oldMember.roles.cache.filter(ro => ro.name === "muted").size !== 0 && newMember.roles.cache.filter(ro => ro.name === "muted").size === 0){
        const fetchedLogs = await oldMember.guild.fetchAuditLogs({
            limit: 1,
            type: 'MEMBER_ROLE_UPDATE',
        });
        const roles = fetchedLogs.entries.first();

        if (!roles) return console.log("failed to get auditlog")

        const { executor, target } = roles;

        if (target.id === oldMember.id) {
            console.log("1")
            if (executor.id === oldMember.id){
                console.log('anti self demute ')
                if (newMember.guild.roles.cache.filter (ro => ro.name === "muted").size !== 0) newMember.roles.add(newMember.guild.roles.cache.filter (ro => ro.name === "muted").first(), "Tentative de self-démute.")
                oldMember.guild.systemChannel.send("<@!"+ oldMember.id +"> **Hey ...** ne tente pas de t'unmute tout seul, attend que quelqu'un d'autre te démute ....").then(mess => {
                    setTimeout(()=> {
                        mess.delete({reason: "Message à autodestruction."})
                    }, 10000)
                })
            }
        } 
    }
})