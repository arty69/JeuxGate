const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

client.login(process.env.TOKEN);

var prefix = "jg/";
var vers = "Alpha (probablement buggé) 0.9.3";


function log(event, guild, serveur) {
    console.log(`${event} dans ${serveur}`)
    if(!guild) return;
    const embed = new Discord.RichEmbed()
    .setColor(`RANDOM`)
    .addField("LOG : ", event)
    guild.send({embed});
}

client.on('ready', ()=>{
    console.log(`connecté : ${client.user.tag}!`)
    client.user.setStatus('dnd');
    client.user.setActivity("Démarrage . . .");
    setTimeout(game1, 5000);
})

//game statue
function game1(){
    client.user.setActivity("Besoin d'aide, faites : " + prefix + "help");
    setTimeout(game2, 30000);
};
function game2(){
    client.user.setActivity(`Version : ` + vers +` !`);
    setTimeout(game3, 30000);
};
function game3(){
    client.user.setActivity(`Servir ${client.guilds.array().length} serveurs`);
    setTimeout(game4, 30000);
};
function game4(){
    client.user.setActivity(`Ouvert au public ! Ceci est un test le bot est donc peu complet !`);
    setTimeout(game1, 30000);
};

client.on(`message`, message=>{
})

//début commandes
client.on(`message`, message =>{
    if(message.author.bot) return;
    if(message.system) return;
    if(message.channel.type === "dm"){
        return message.channel.send(`Vous ne pouvez pas intéragir avec moi avec des mp. Vous devez intéragir avec moi dans un serveur !`);
    }
    if(message.content.startsWith(prefix)){
//help
        if(message.content.startsWith(prefix + "help")){
            var help_embed = new Discord.RichEmbed()
            .setColor("18d67e")
            .setTitle("Tu as besoin d'aide ?")
            .setThumbnail(message.author.avatarURL)
            .setDescription("Je suis là pour vous aider.")
            .addField("Aides", `voicis de l'aide !`)
            .addField(":tools: Modération", "`Fais " + prefix + "mod` pour voir mes commandes de modération !")
            .addField(":tada: Fun", "`Fais " + prefix + "fun` pour voir Les commandes de fun que je possède !")
            message.channel.send(help_embed);

            const logchannel = message.guild.channels.find(m => m.name === "log");
            log(`utilisation de la commande help par ${message.author.username}`,logchannel, message.guild.name)
        }

        //fun
        if(message.content.startsWith(prefix + "fun")){
            var helpf_embed = new Discord.RichEmbed()
            .setColor("18d67e")
            .setTitle("Tu souhaites les commandes de fun ?")
            .setThumbnail(message.author.avatarURL)
            .setDescription("Je suis là pour vous aider.")
            .addField("- - - ","...")
            .addField(":kiss: Kiss", "Fais `" + prefix + "kiss @quelqu'un` pour faire un bisous à `@quelqu'un` !")
            .addField(":hugging: Hug", "Fais `" + prefix + "hug @quelqu'un` pour faire un calin à `@quelqu'un` !")
            .addField(":keyboard: Messages", "Fais `" + prefix + "msg` pour savoir le nombre de messages que tu as envoyé !")
            .addField(":white_circle: Pile ou face", "Fais `" + prefix + "pf` pour faire un pile ou face !")
            message.channel.send(helpf_embed);

            const logchannel = message.guild.channels.find(m => m.name === "log");
            log(`utilisation de la commande fun par ${message.author.username}`,logchannel, message.guild.name)
        }

        //mod
        if(message.content.startsWith(prefix + "mod")){
            var helpm_embed = new Discord.RichEmbed()
            .setColor("18d67e")
            .setTitle("Tu souhaites les commandes de modération ?")
            .setThumbnail(message.author.avatarURL)
            .setDescription("Je suis là pour vous aider.")
            .addField("Aides", `voicis de l'aide !`)
            .addField("- - - ","...")
            .addField(":no_bell: Mute", "Fais `" + prefix + "mute @quelqu'un` pour mute `@quelqu'un` !")
            .addField(":bell: Unmute", "Fais `" + prefix + "unmute @quelqu'un` pour unmute `@quelqu'un` !")
            .addField(":skull_crossbones: purge", "Fais `" + prefix + "purge <un pnombre>` pour supprimer un certain nombre de message !")
            .addField("Bot infos", "Fais `" + prefix + "binfo` pour avoir des infos du bot !")
            .addField("Serveur infos", "Fais `" + prefix + "sinfo` pour avoir des infos du serveur !")
            message.channel.send(helpm_embed);

            const logchannel = message.guild.channels.find(m => m.name === "log");
            log(`utilisation de la commande mod par ${message.author.username}`,logchannel, message.guild.name)
        }

//FUN

        //kiss
        if(message.content.startsWith(prefix + "kiss")) {
            var kiss = [
                "https://media.giphy.com/media/108M7gCS1JSoO4/giphy.gif",
                "https://media.giphy.com/media/nyGFcsP0kAobm/giphy.gif",
                "https://media.giphy.com/media/N3IuFaIanEs6I/giphy.gif",
                "https://media.giphy.com/media/KH1CTZtw1iP3W/giphy.gif",
                "https://media.giphy.com/media/wOtkVwroA6yzK/giphy.gif",
                "https://media.giphy.com/media/hnNyVPIXgLdle/giphy.gif",
                "https://media.giphy.com/media/11k3oaUjSlFR4I/giphy.gif"
            ];
            var gif = kiss[Math.floor(Math.random() * kiss.length)];
            var kiss_embed = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setTitle(`Tu viens d'embrasser :`)
            .setImage(gif)
            .setTimestamp()
            message.channel.send(kiss_embed);

            const logchannel = message.guild.channels.find(m => m.name === "log");
            log(`utilisation de la commande kiss par ${message.author.username}`,logchannel, message.guild.name)

        }

        //hug
        if(message.content.startsWith(prefix + "hug")) {
            var hug = [
                "https://media.giphy.com/media/od5H3PmEG5EVq/giphy.gif",
                "https://media.giphy.com/media/5eyhBKLvYhafu/giphy.gif",
                "https://media.giphy.com/media/lrr9rHuoJOE0w/giphy.gif",
                "https://media.giphy.com/media/svXXBgduBsJ1u/giphy.gif"
            ];
            var gif = hug[Math.floor(Math.random() * hug.length)];
            var hug_embed = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setTitle(`Tu viens de faire un calin:`)
            .setImage(gif)
            .setTimestamp()
            message.channel.send(hug_embed);

            const logchannel = message.guild.channels.find(m => m.name === "log");
            log(`utilisation de la commande hug par ${message.author.username}`,logchannel, message.guild.name)
        }

        //Commande pile ou face :
        if(message.content.startsWith(prefix + "pf")) {
            pileface = Math.floor(Math.random() * 2 + 0)
            if(pileface === 0){
                message.channel.send("Tu viens d'obtenir un : **Pile** !")
            }else{
                message.channel.send("tu viens d'obtenir un : **Face** !")
            }

            const logchannel = message.guild.channels.find(m => m.name === "log");
            log(`utilisation de la commande pf par ${message.author.username}`,logchannel, message.guild.name)
        }
        //stats
        if(message.content.startsWith(prefix + "stats")) { 
            var userData = JSON.parse(fs.readFileSync('userData.json', 'utf-8'));
            var levels = JSON.parse(fs.readFileSync('level.json', 'utf-8'));
            var lvl_embed = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setTitle('Votre niveau :')
            .addField('Vous avez envoyé **' + userData[message.author.id].messageSent + '** messages !', `.`)
            .addField('voici vôtre niveau :' + userData[message.author.id].level, `.`)
            message.channel.send(lvl_embed);
            var blackguilds = JSON.parse(fs.readFileSync('guild.json', 'utf-8'));
            if(blackguilds[message.guild.id]){
                message.channel.send(`:warning: ce serveur ne vous fait pas monté en niveau, il a été enregistrer pour ne pas pouvoir faire monter ses membres en niveaux. Désolé :disappointed_relieved: `)
            }
        }

//MOD

        //purge
        if(message.content.startsWith(prefix + "purge")) {
            let myrole = message.guild.member(client.user).hasPermission("MANAGE_MESSAGES"); //Récupère les droits nécessaires
            let yourole = message.guild.member(message.author).hasPermission("MANAGE_MESSAGES"); //Récupère les droits nécessaires
        
            if (!myrole) {
                return message.channel.send("**Hey ...**Je n'ai pas la permissions d'éxécuter cela !");
            }
            if (!yourole) {
                return message.channel.send("**Hey ...**Vous n'avez pas la permissions d'éxécuter cela !");
            }
            var suppression = message.content.substr(9);
            if (suppression < 2 || suppression > 101) {
                return message.reply("**Hey ...**La valeur que vous avez entré est invalide, merci de choisir une valeur comprise entre 2 et 100");
            }

            message.channel.bulkDelete(suppression, true).then(ok => {
                message.reply("**" + suppression + "messages ont été supprimés**");

                const logchannel = message.guild.channels.find(m => m.name === "log");
                log(`utilisation de la commande purge par ${message.author.username}`,logchannel, message.guild.name)
            })
        }

        //mute
        if(message.content.startsWith(prefix + "mute")) {
            if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("**Hey ...**Vous n'avez pas la permissions d'éxécuter cela !");
    
            if(message.mentions.users.size === 0) {
                return message.channel.send("Tu dois mentionner quelqu'un pour faire cette commande");
            }
            var mute = message.guild.member(message.mentions.users.first());
            if(!mute) {
                return message.channel.send("Je n'ai pas trouvé l'utilisateur ou il l'existe pas !");
            }
            if(message.content.substr(7) === " <@515891064721244162>"){
                return message.channel.send("Je ne peux me mute !")
            }

            if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission !");
            message.channel.overwritePermissions(mute, { SEND_MESSAGES: false}).then(member => {
                message.channel.send(`${mute.user.username} a été mute par ${message.author.username} !`);
                
                const logchannel = message.guild.channels.find(m => m.name === "log");
                log(`utilisation de la commande mute par ${message.author.username}`,logchannel, message.guild.name)
            })
        }

        //unmute
        if(message.content.startsWith(prefix + "unmute")) {
            if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("**Hey ...**Vous n'avez pas la permissions d'éxécuter cela !");
    
            if(message.mentions.users.size === 0) {
                return message.channel.send("Tu dois mentionner quelqu'un pour faire cette commande");
            }
            var mute = message.guild.member(message.mentions.users.first());
            if(!mute) {
                return message.channel.send("Je n'ai pas trouvé l'utilisateur ou il l'existe pas !");
            }
            if(message.content.substr(9) === " <@515891064721244162>"){
                return message.channel.send("Je ne peux me unmute !")
            }
    
            if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission !");
            message.channel.overwritePermissions(mute, { SEND_MESSAGES: true}).then(member => {
                message.channel.send(`${mute.user.username} a été unmute par ${message.author.username} !`);

                const logchannel = message.guild.channels.find(m => m.name === "log");
                log(`utilisation de la commande unmute par ${message.author.username}`,logchannel, message.guild.name)
            })
        }
        //Commande d'information serveur :
        if(message.content.startsWith(prefix + "sinfo")) {
            var info_embed = new Discord.RichEmbed()
            .setColor("18d67e")
            .setTitle(`Infos sur le serveur : ${message.guild.name}`)
            .addField("Propriétaire du serveur", message.guild.owner.user.tag)
            .addField("Serveur crée le ", message.guild.createdAt)
            .addField("Tu as rejoins le ", message.member.joinedAt)
            .addField("Nombre total de personnes", message.guild.members.size)
            .addField("Nombre de membres", message.guild.members.size - message.guild.members.filter(member => member.user.bot).size)
            .addField("Nombre de bots", message.guild.members.filter(member => member.user.bot).size)
            message.channel.send(info_embed)

            const logchannel = message.guild.channels.find(m => m.name === "log");
            log(`utilisation de la commande sinfo par ${message.author.username}`,logchannel, message.guild.name)
        }
        //Commande d'information bot :
        if(message.content.startsWith(prefix + "binfo")) {
            if(message.author.tag === "Jeuxdictator - . . .#3800"){
                var binfos_embed = new Discord.RichEmbed()
                .setColor("18d67e")
                .setTitle(`Infos sur le bot : ${client.user.tag}`)
                .addField("Propriétaire du bot", `jeuxdictator#3800`)
                .addField("bot crée le ", `25/11/2018`)
                .addField("nombre total de personnes ", client.users.size)
                .addField("nom des personnes", client.users.map(r =>`${r.username}`))
                .addField("Nombre total de serveur", client.guilds.array().length)
                .addField("nom des serveurs", client.guilds.map(r =>`${r.name} / ${r.memberCount} membres`))
                .addField("log Version", `Version : `+ vers +`! Complète, et réservées !`)
                message.channel.send(binfos_embed)

                const logchannel = message.guild.channels.find(m => m.name === "log");
                log(`utilisation de la commande binfo VERSION ABSOLUE par ${message.author.username}`,logchannel, message.guild.name)
            }else{
                var binfo_embed = new Discord.RichEmbed()
                .setColor("18d67e")
                .setTitle(`Infos sur le bot : ${client.user.tag}`)
                .addField("Propriétaire du bot", `jeuxdictator#3800`)
                .addField("bot crée le ", `25/11/2018`)
                .addField("nombre total de personnes ", client.users.size)
                .addField("Nombre total de serveur", client.guilds.array().length)
                .addField("log Version", `Version : `+ vers +` !`)
                message.channel.send(binfo_embed)

                const logchannel = message.guild.channels.find(m => m.name === "log");
                log(`utilisation de la commande binfo par ${message.author.username}`,logchannel, message.guild.name)
            }
        }
    }else{
//levels
        var blackguilds = JSON.parse(fs.readFileSync('guild.json', 'utf-8'));
        if(blackguilds[message.guild.id]) return;

        var userData = JSON.parse(fs.readFileSync('userData.json', 'utf-8'));
        var levels = JSON.parse(fs.readFileSync('level.json', 'utf-8'));
        if (!userData[message.author.id]){
            userData[message.author.id] = {
                messageSent: 1,
                level: 0
            };
            fs.writeFile('userData.json', JSON.stringify(userData), (err) => {
                if (err) message.channel.send(err);
            });
            if(!levels[1]){ 
                levels[1] = {
                    messages: 20
                };
                fs.writeFile('level.json', JSON.stringify(levels), (err) => {
                    if (err) message.channel.send(err);
                });
            }
            if(!levels[0]){ 
                levels[0] = {
                    messages: 0
                };
                fs.writeFile('level.json', JSON.stringify(levels), (err) => {
                    if (err) message.channel.send(err);
                });
            }
        }else{
            
            if(!message.content.startsWith(prefix)){
                userData[message.author.id].messageSent++;
                fs.writeFile('userData.json', JSON.stringify(userData), (err) => {
                    if (err) message.channel.send(err);
                });
            }

            if(userData[message.author.id].messageSent === levels[userData[message.author.id].level + 1].messages){
                userData[message.author.id].level++;
                fs.writeFile('userData.json', JSON.stringify(userData), (err) => {
                    if (err) message.channel.send(err);
                });
                message.channel.send(`**Hey ${message.author.username}, sache que tu viens de gagner un niveau, tu es désormais au niveau : ${userData[message.author.id].level} . GG à toi**`);

                var nextlvl = levels[userData[message.author.id].level].messages * 2
                if(!levels[userData[message.author.id].level + 1]) levels[userData[message.author.id].level + 1] = {
                    messages: nextlvl
                }
                fs.writeFile('level.json', JSON.stringify(levels), (err) => {
                    if (err) message.channel.send(err);
                });
            }
        }
    }
})

//selflog
client.on("guildCreate", guild => {
    console.log(`un nouveau serveur a été ajouté: ${guild.name} (id: ${guild.id}). Il contient ${guild.memberCount} membres!`);
    const server = guild.channels.find(m => m.name === "log");
    if(!server) return;
    const embed = new Discord.RichEmbed()
    .setColor(`RANDOM`)
    .addField("quelqu'un viens d'ajouter la JeuxGate sur son serveur, nom du serveur:", guild.name) 
    .addField("Propriétaire du serveur:", guild.owner.id)
    server.send({embed})
});