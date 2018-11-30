const Discord = require('discord.js');
const client = new Discord.Client();

client.login(process.env.TOKEN);

var prefix = "jg/";
var vers = "Alpha (probablement buggé) 0.9.1";

client.on('ready', ()=>{
    console.log(`connecté : ${client.user.tag}!`)
    client.user.setStatus('dnd');
    client.user.setActivity("Démarrage . . .");
    setTimeout(game1, 5000);
})

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


client.on(`message`, message =>{
    if(message.author.bot) return;
    if(message.author.tag === "JeuxGate#6723") return;
    if(message.system) return;
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
        console.log(`${message.author.tag} a utilisé la commande `+ prefix +`help dans ${message.guild}`)
    }
    //helpf
    if(message.content.startsWith(prefix + "fun")){
        var helpf_embed = new Discord.RichEmbed()
        .setColor("18d67e")
        .setTitle("Tu souhaites les commandes de fun ?")
        .setThumbnail(message.author.avatarURL)
        .setDescription("Je suis là pour vous aider.")
        .addField("- - - ","...")
        .addField(":kiss: Kiss", "Fais `" + prefix + "kiss @quelqu'un` pour faire un bisous à `@quelqu'un` !")
        .addField(":hugging: Hug", "Fais `" + prefix + "hug @quelqu'un` pour faire un calin à `@quelqu'un` !")
        .addField(":white_circle: Pile ou face", "Fais `" + prefix + "pf` pour faire un pile ou face !")
        message.channel.send(helpf_embed);
        console.log(`${message.author.tag} a utilisé la commande `+ prefix +`helpf dans ${message.guild}`)
    }
    //helpm
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
        .addField(":door: Kick", "Fais `" + prefix + "kick @quelqu'un` pour kick `@quelqu'un` !")
        .addField(":hammer: ban", "Fais `" + prefix + "ban @quelqu'un` pour ban `@quelqu'un` !")
        .addField(":skull_crossbones: purge", "Fais `" + prefix + "purge <un pnombre>` pour supprimer un certain nombre de message !")
        .addField("Bot infos", "Fais `" + prefix + "binfo` pour avoir des infos du bot !")
        .addField("Serveur infos", "Fais `" + prefix + "sinfo` pour avoir des infos du serveur !")
        message.channel.send(helpm_embed);
        console.log(`${message.author.tag} a utilisé la commande `+ prefix +`helm dans ${message.guild}`)
    }

//FUN

    //kiss
    if(message.content.startsWith(prefix + "kiss")) {

        var kiss = [

            "https://media.giphy.com/media/108M7gCS1JSoO4/giphy.gif",
            "https://media.giphy.com/media/nyGFcsP0kAobm/giphy.gif",
            "https://media.giphy.com/media/N3IuFaIanEs6I/giphy.gif",
            "https://media.giphy.com/media/KH1CTZtw1iP3W/giphy.gif"
        ];

        var gif = kiss[Math.floor(Math.random() * kiss.length)];

        var kiss_embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle(`Tu viens d'embrasser :`)
        .setImage(gif)
        .setTimestamp()
        message.channel.send(kiss_embed);
        console.log(`${message.author.tag} a utilisé la commande `+ prefix +`kiss dans ${message.guild}`)

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
        console.log(`${message.author.tag} a utilisé la commande `+ prefix +`hug dans ${message.guild}`)

    }

    //Commande pile ou face :
    if(message.content.startsWith(prefix + "pf")) {
        randnum2 = Math.floor(Math.random() * (2 - 0) + 0)

        if(randnum2 === 0){
            message.channel.send("Tu viens d'obtenir un : **Pile** !")
        }else{
            message.channel.send("tu viens d'obtenir un : **Face** !")
        }

        console.log(`${message.author.tag} a utilisé la commande `+ prefix +`pf dans ${message.guild}`);
    }

//MOD

    //kick
    if (message.content.startsWith(prefix + "kick")) {
        if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.channel.send("**Hey ...**Vous n'avez pas la permissions d'éxécuter cela !");
        
        if(message.mentions.users.size === 0) {
            return message.channel.send(`Je veux bien ${message.author.username} mais vous devez mentionner un utilisateur`)
        }

        var kick = message.guild.member(message.mentions.users.first());
        if(!kick) {
            return message.channel.send("Je ne sais si l'utilisateur existe !")
        }
        if(message.content.substr(7) === " <@515891064721244162>"){
            return message.channel.send("Je ne peux me kick !")
        }

        if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
            return message.channel.send("**Hey ...**Je n'ai pas la permissions d'éxécuter cela !");
        }

        kick.kick().then(member => {
            message.channel.send(`${member.user.username} a été kick par ${message.author.username}`);
            console.log(`${message.author.tag} a utilisé la commande `+ prefix +`kick dans ${message.guild}`)
        });
    }

    //ban
    if (message.content.startsWith(prefix + "ban")) {
        if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send("**Hey ...**Vous n'avez pas la permissions d'éxécuter cela !");
        
        if(message.mentions.users.size === 0) {
            return message.channel.send(`Je veux bien ${message.author.username} mais vous devez mentionner un utilisateur`)
        }

        var ban = message.guild.member(message.mentions.users.first());
        if(!ban) {
            return message.channel.send("Je ne sais si l'utilisateur existe !")
        }
        if(message.content.substr(7) === " <@515891064721244162>"){
            return message.channel.send("Je ne peux me ban !")
        }

        if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
            return message.channel.send("**Hey ...**Je n'ai pas la permissions d'éxécuter cela !");
        }

        ban.ban().then(member => {
            message.channel.send(`${member.user.username} a été banni par ${message.author.username}`);
            console.log(`${message.author.tag} a utilisé la commande `+ prefix +`ban dans ${message.guild}`)
        });
    }

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
            message.reply("**Suppression de " + "" + suppression + "" + " messages**");
            console.log(`${message.author.tag} a utilisé la commande `+ prefix +`purge dans ${message.guild}`)
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
            console.log(`${message.author.tag} a utilisé la commande `+ prefix +`mute dans ${message.guild}`)
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
        if(message.content.substr(7) === " <@515891064721244162>"){
            return message.channel.send("Je ne peux me unmute !")
        }
 
        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission !");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: true}).then(member => {
            message.channel.send(`${mute.user.username} a été unmute par ${message.author.username} !`);
            console.log(`${message.author.tag} a utilisé la commande `+ prefix +`unmute dans ${message.guild}`)
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
        console.log(`${message.author.tag} a utilisé la commande `+ prefix +`sinfo dans ${message.guild}`)
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
            .addField("log Version", `V.A : `+ vers +`! Complète, et réservées !`)

            message.channel.send(binfos_embed)
            console.log(`${message.author.tag} a utilisé la commande `+ prefix +`binfo absolute version dans ${message.guild}`)
        }else{
            var binfo_embed = new Discord.RichEmbed()
            .setColor("18d67e")
            .setTitle(`Infos sur le bot : ${client.user.tag}`)
            .addField("Propriétaire du bot", `jeuxdictator#3800`)
            .addField("bot crée le ", `25/11/2018`)
            .addField("nombre total de personnes ", client.users.size)
            .addField("Nombre total de serveur", client.guilds.array().length)
            .addField("log Version", `V.B : `+ vers +` !`)

            message.channel.send(binfo_embed)
            console.log(`${message.author.tag} a utilisé la commande `+ prefix +`binfo dans ${message.guild}`)
        }
    }
})

//selflog
client.on("guildCreate", guild => {
    console.log(`un nouveau serveur a été ajouté: ${guild.name} (id: ${guild.id}). Il contient ${guild.memberCount} membres!`);
    const invite = guild.defaultChannel.createInvite;
    console.log(invite.url);
    const server = guild.channels.find(m => m.name === "log");
    if(!server) return;
    const embed = new Discord.RichEmbed()
    .setColor(`RANDOM`)
    .addField("quelqu'un viens d'ajouter la JeuxGate sur son serveur, nom du serveur:", guild.name) 
    .addField("Propriétaire du serveur:", guild.owner.id)
    server.send({embed})
});