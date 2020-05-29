const fs = require('fs');
const Discord = require('discord.js');
const log = require('./function/log.js')
const client = new Discord.Client();
const events = {
    MESSAGE_REACTION_ADD: 'messageReactionAdd',
    MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};
const prefix = fs.readFileSync("./config/prefix", "utf-8")

let ts = Date.now();
let date_ob = new Date(ts);
let minute = date_ob.getMinutes();
let hour = date_ob.getHours();
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();
const start = year + "-" + month + "-" + date + " " + hour + "-" + minute

require("./setup.js").run(start)

client.on("raw", async event => {
    if (!events.hasOwnProperty(event.t)) return;

    const {
        d: data
    } = event;
    const user = client.users.get(data.user_id);
    const channel = client.channels.get(data.channel_id) || await user.createDM();

    if (channel.messages.has(data.message_id)) return;

    const message = await channel.fetchMessage(data.message_id);
    const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
    let reaction = message.reactions.get(emojiKey);

    if (!reaction) {
        const emoji = new Discord.Emoji(client.guilds.get(data.guild_id), data.emoji);
        reaction = new Discord.MessageReaction(message, emoji, 1, data.user_id === client.user.id);
    }

    client.emit(events[event.t], reaction, user);
});

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
    //administrator
    if (message.guild.members.filter(u => u.id == 426843374163722240).size !== 0) return
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

    console.log(message.guild.name)
    fs.readdirSync("./events/message/").forEach(u => {
        if(u.endsWith(".js")) {
            if (require("./events/message/" + u).run(message, client) === "don't go on") return
        }
    })
    
    if(message.content.startsWith("!") || message.content.startsWith("?") || message.content.startsWith("/") || message.content.startsWith(".") || message.content.startsWith("-") || message.content.startsWith("+")) return 
    if(message.member.roles.filter(role => role.name === "muted").size !== 0) return
    if(message.content.startsWith(prefix)) return fs.readdirSync("./events/commands/").forEach(u => {
        if(u.endsWith(".js")) {
            if (require("./events/commands/" + u).run(message, client) === "don't go on") return
        }
    })
    
})

client.on("messageReactionAdd", async (reaction, user) => fs.readdirSync("./events/reaction/").forEach(u => require("./events/reaction/"+u).run(reaction, user, client)))