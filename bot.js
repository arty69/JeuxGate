const Discord = require('discord.js');
const client = new Discord.Client();

client.login(process.env.TOKEN);

var prefix = "jg/";
var vers = "1.2";

//log function
function log(event, serveur) {
    if(!event) return;
    if(!serveur) return;
    console.log(`${event} dans ${serveur}`)
    const embed = new Discord.RichEmbed()
    .setColor(`RANDOM`)
    .addField("LOG : ", event + " dans " + serveur )
    .setTimestamp()
    .setFooter("JeuxGate")
    const log = client.channels.filter(c => c.name === "log" && c.name ==="logs" && c.guild.member(client.user).hasPermission("EMBED_LINKS") && c.guild.member(client.user).hasPermission("SEND_MESSAGES"));
    log.map(z => z.send(embed))
}

//stat
client.on('ready', ()=>{
    console.log(`connecté : ${client.user.tag}!`)
    client.user.setPresence({
        game: { 
            name: `les gens taper ${prefix}help | version : ${vers}`,
            type: 'WATCHING' 
        },
        status: 'dnd' 
    })
})

//début commandes
client.on(`message`, message =>{
    //anti kikoo
    if(message.author.bot) return;
    if(message.system) return;
    if(message.channel.type === "dm"){
        return message.channel.send(`Vous ne pouvez pas intéragir avec moi avec des mp. Vous devez intéragir avec moi dans un serveur !`);
    }
    //commandes
    if(message.content.startsWith(prefix)){
//HELP

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
            .setTimestamp()
            .setFooter("JeuxGate")
            message.channel.send(help_embed);

            
            log(`utilisation de la commande help par ${message.author.username}`, message.guild.name)
        }

        //fun
        if(message.content.startsWith(prefix  + "fun")){
            var helpf_embed = new Discord.RichEmbed()
            .setColor("18d67e")
            .setTitle("Tu souhaites les commandes de fun ?")
            .setThumbnail(message.author.avatarURL)
            .setDescription("Je suis là pour vous aider.")
            .addField("- - - ","...")
            .addField(":kiss: Kiss", "Fais `" + prefix + "kiss @quelqu'un` pour faire un bisous à `@quelqu'un` !")
            .addField(":hugging: Hug", "Fais `" + prefix + "hug @quelqu'un` pour faire un calin à `@quelqu'un` !")
            .addField(":white_circle: Pile ou face", "Fais `" + prefix + "pf` pour faire un pile ou face !")
            .addField(":frame_photo: Avatar", "Fais `" + prefix + "avatar @quelqu'un` pour voir la photo de profile de `@quelqu'un` !")
            .addField(":8ball: Boule magique", "Fais `" + prefix + "8ball <vôtre question>` pour que la boule magive vous répondes")
            .addField(":keyboard: Statistiques", "Fais `" + prefix + "stats` pour obtenir vos statistiques (niveau(x) + message(s) envoyé) !")
            .addField(":envelope: Serveur", "Fais `" + prefix + "serveur` pour obtenir le serveur du bot !")
            .addField(":door: Invitation", "Fais `" + prefix + "invite` pour obtenir le lien pour inviter le bot dans votre serveur !")
            .setTimestamp()
            .setFooter("JeuxGate")
            message.channel.send(helpf_embed);

            
            log(`utilisation de la commande fun par ${message.author.username}`, message.guild.name)
        }

        //mod
        if(message.content.startsWith(prefix  + "mod")){
            var helpm_embed = new Discord.RichEmbed()
            .setColor("18d67e")
            .setTitle("Tu souhaites les commandes de modération ?")
            .setThumbnail(message.author.avatarURL)
            .setDescription("Je suis là pour vous aider.")
            .addField("Aides", `voicis de l'aide !`)
            .addField("- - - ","...")
            .addField(":no_bell: Mute", "Fais `" + prefix + "mute @quelqu'un` pour mute `@quelqu'un` !")
            .addField(":bell: Unmute", "Fais `" + prefix + "unmute @quelqu'un` pour unmute `@quelqu'un` !")
            .addField(":skull_crossbones: purge", "Fais `" + prefix + "purge <un nombre>` pour supprimer un certain nombre de message !")
            .addField("Bot infos", "Fais `" + prefix + "binfo` pour avoir des infos du bot !")
            .addField("Serveur infos", "Fais `" + prefix + "sinfo` pour avoir des infos du serveur !")
            .setTimestamp()
            .setFooter("JeuxGate")
            message.channel.send(helpm_embed);

            
            log(`utilisation de la commande mod par ${message.author.username}`, message.guild.name)
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
            .setFooter("JeuxGate")
            message.channel.send(kiss_embed);

            
            log(`utilisation de la commande kiss par ${message.author.username}`, message.guild.name)

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
            .setFooter("JeuxGate")
            message.channel.send(hug_embed);

            
            log(`utilisation de la commande hug par ${message.author.username}`, message.guild.name)
        }

        //Commande pile ou face :
        if(message.content.startsWith(prefix + "pf")) {
            pileface = Math.floor(Math.random() * 2 + 0)
            if(pileface === 0){
                message.channel.send("Tu viens d'obtenir un : **Pile** !")
            }else{
                message.channel.send("tu viens d'obtenir un : **Face** !")
            }

            
            log(`utilisation de la commande pf par ${message.author.username}`, message.guild.name)
        }

        //avatar
        if(message.content.startsWith(prefix + "avatar")){
            if(message.guild.member(message.mentions.users.first())){
                var user = message.mentions.users.first()
            }else{
                var user = message.author
            }
            var avatar_embed = new Discord.RichEmbed()
            .setColor("18d67e")
            .setTitle("Voici la photo de profile de " + user.username)
            .addBlankField()
            .setImage(user.avatarURL)
            .setURL(user.avatarURL)
            .setTimestamp()
            .setFooter("JeuxGate")
            message.channel.send(avatar_embed);

            
            log(`utilisation de la commande d'avatar par ${message.author.username}`, message.guild.name)
        }

        //magic ball
        if(message.content.startsWith(prefix + "8ball")) {
            if(message.content.substr(prefix.length + + 5)){
                var ball = [
                    //oui
                    "Plutôt, oui",
                    "Oui.",
                    "Bien sûr.",
                    "Faites ainsi.",

                    //non
                    "Non",
                    "Mes sources disent non.",
                    "Les signes disent que non.",
                    "C'est incertain.",

                    //autres
                    "Actuellement, je ne peux prédire ...",
                    "Impossible à prédire ..."
                ];
                var ansball = ball[Math.floor(Math.random() * ball.length)];
                var ball_embed = new Discord.RichEmbed()
                .setColor('4f0982')
                .addField(`Voic la éponse à vôtre question :`, ansball)
                .setTimestamp()
                .setFooter("JeuxGate")
                message.channel.send(ball_embed);

                
                log(`utilisation de la commande 8ball par ${message.author.username}`, message.guild.name)
            }else{
                message.channel.send("Si vous voulez que la boule magique vous répondes, vous devez déjà poser la question !")
            }
        }


        //serveur
        if(message.content.startsWith(prefix + "serveur")){
            var serveur_embed = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setTitle('Voici le serveur du bot : ')
            .addField('Si vous accèdez au serveur, merci de bien vouloir me pardonner de la faible présentation de celui-ci !', `https://discord.gg/BSEGc9D`)
            .setTimestamp()
            .setFooter("JeuxGate")
            message.channel.send(serveur_embed);
        }

        //invite
        if(message.content.startsWith(prefix + "invite")){
            var invite_embed = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setTitle('Voici le lien du bot : ')
            .addField('Si vous voulez ajouter JeuxGate à vôtre serveur, merci de lui donner un rôle administrateur (le rôle par défaut est censé êtres admin) !', `https://discordapp.com/api/oauth2/authorize?client_id=515891064721244162&permissions=8&scope=bot`)
            .setTimestamp()
            .setFooter("JeuxGate")
            message.channel.send(invite_embed);
        }

//MOD
        //ping
        if (message.content.startsWith(prefix + 'ping')) {
            message.channel.sendMessage('Pong! ping :`' + `${Date.now() - message.createdTimestamp}` + ' ms`');
        }

        //purge
        if(message.content.startsWith(prefix + "purge")) {
            if(!message.author.id === "244874298714619904"){
                let myrole = message.guild.member(client.user).hasPermission("MANAGE_MESSAGES"); 
                let yourole = message.guild.member(message.author).hasPermission("MANAGE_MESSAGES"); 
            
                if (!myrole) {
                    return message.reply("**Hey ...**Je n'ai pas la permissions d'éxécuter cela !");
                }
                if (!yourole) {
                    return message.reply("**Hey ...**Vous n'avez pas la permissions d'éxécuter cela !");
                }
            }
            var suppression = message.content.substr(prefix.length + 6);
            if (suppression < 2 || suppression > 101) {
                return message.reply("**Hey ...**La valeur que vous avez entré est invalide, merci de choisir une valeur comprise entre 2 et 100");
            }

            message.channel.bulkDelete(suppression, true).then(ok => {
                message.reply("**Suppression de " + "" + suppression + "" + " messages**")
                .then(message => setTimeout(function(){message.delete()}, 1000))
                .catch(err => console.log(err));
            
            })
            
            log(`utilisation de la commande de purge par ${message.author.username}`, message.guild.name)
        }

        //mute
        if(message.content.startsWith(prefix + "mute")) {
            if(!message.author.id === "244874298714619904"){
                if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("**Hey ...**Vous n'avez pas la permissions d'éxécuter cela !");
            }

            if(message.mentions.users.size === 0) {
                return message.reply("Tu dois mentionner quelqu'un pour faire cette commande");
            }
            var mute = message.guild.member(message.mentions.users.first());
            if(!mute) {
                return message.reply("Je n'ai pas trouvé l'utilisateur ou il l'existe pas !");
            }
            if(message.content.substr(prefix.length + 4) === " <@515891064721244162>"){
                return message.reply("Je ne peux me mute !")
            }

            if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission !");
            message.channel.overwritePermissions(mute, { SEND_MESSAGES: false}).then(member => {
                message.channel.send(`${mute.user.username} a été mute par ${message.author.username} !`);
                
                
                log(`utilisation de la commande mute par ${message.author.username}`, message.guild.name)
            })
        }

        //unmute
        if(message.content.startsWith(prefix + "unmute")) {
            if(!message.author.id === "244874298714619904"){
                if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("**Hey ...**Vous n'avez pas la permissions d'éxécuter cela !");
            }

            if(message.mentions.users.size === 0) {
                return message.reply("Tu dois mentionner quelqu'un pour faire cette commande");
            }
            var mute = message.guild.member(message.mentions.users.first());
            if(!mute) {
                return message.reply("Je n'ai pas trouvé l'utilisateur ou il l'existe pas !");
            }
            if(message.content.substr(prefix.length + 6) === " <@515891064721244162>"){
                return message.reply("Je ne peux me unmute !")
            }
    
            if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission !");
            message.channel.overwritePermissions(mute, { SEND_MESSAGES: true}).then(member => {
                message.channel.send(`${mute.user.username} a été unmute par ${message.author.username} !`);

                
                log(`utilisation de la commande unmute par ${message.author.username}`, message.guild.name)
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
            .setTimestamp()
            .setFooter("JeuxGate")
            message.channel.send(info_embed)

            
            log(`utilisation de la commande sinfo par ${message.author.username}`, message.guild.name)
        }

        //Commande d'information bot :
        if(message.content.startsWith(prefix + "binfo")){
            if(message.author.id === "244874298714619904"){
                var binfos_embed = new Discord.RichEmbed()
                .setColor("18d67e")
                .setTitle(`Infos sur le bot : ${client.user.tag}`)
                .addField("Propriétaire du bot", `jeuxdictator#3800`)
                .addField("bot crée le ", `25/11/2018`)
                .addField("nombre total de personnes ", client.users.size)
                .addField("Nombre total de serveur", client.guilds.array().length)
                .addField("nom des serveurs", client.guilds.map(r =>`${r.name} | ${r.id} / ${r.memberCount} membres / ${r.region} `))
                .addField("log Version", `Version : `+ vers +` Complète, et réservées !`)
                .setTimestamp()
                .setFooter("JeuxGate")
                message.channel.send(binfos_embed)

                
                log(`utilisation de la commande binfo VERSION ABSOLUE par ${message.author.username}`, message.guild.name)
            }else{
                var binfo_embed = new Discord.RichEmbed()
                .setColor("18d67e")
                .setTitle(`Infos sur le bot : ${client.user.tag}`)
                .addField("Propriétaire du bot", `jeuxdictator#3800`)
                .addField("Bot crée le ", `25/11/2018`)
                .addField("Nombre total de personnes ", client.users.size)
                .addField("Nombre total de serveur", client.guilds.array().length)
                .addField("log Version", `Version : `+ vers +` !`)
                .setTimestamp()
                .setFooter("JeuxGate")
                message.channel.send(binfo_embed)

                log(`utilisation de la commande binfo par ${message.author.username}`, message.guild.name)
            }
        }

        //salons
        if(message.content.startsWith(prefix + "channel")){
            if(!message.author.id === "244874298714619904"){
                let yourole = message.guild.member(message.author).hasPermission("ADMINISTATOR"); 
                if (!yourole) {
                    return message.reply("**Hey ...**Vous n'avez pas la permissions d'éxécuter cela !");
                }
            }
            if(message.guild.channels.filter(c => c.name === "jeuxgate-chat").size !== 0) return message.reply("Vous avez déjà les salons crées, après, si ils ne fonctionnent pas, merci de vérifier vous-même.")
            if(message.guild.member(client.user).hasPermission("ADMINISTRATOR")){
                if(message.guild.channels.filter(c => c.name === "jeuxgate-chat").size === 0){
                    message.guild.createChannel('jeuxgate-chat', 'text', [{
                        id: message.guild.id,
                        deny: ['MANAGE_MESSAGES'],
                        allow: ['SEND_MESSAGES']
                    }])
                    .catch(console.error);
                    const jgembed = new Discord.RichEmbed()
                    .setColor(`RANDOM`)
                    .setTimestamp()
                    .setFooter("JeuxGate")
                    .setDescription(message.content)
                    .addField("Jeuxgate chat provided", message.guild.name)
                    .setAuthor(message.author.tag, message.author.avatarURL)
                    const cc1 = message.guild.channels.filter(c => c.name === "jeuxgate-chat" && c.guild.member(client.user).hasPermission("ADMINISTRATOR") && c.type === "text");
                    cc1.map(z => z.send(jgembed))
                    
                }
                if(message.guild.channels.filter(c => c.name === "log").size === 0){
                    message.guild.createChannel('log', 'text', [{
                        id: message.guild.id,
                        deny: ['MANAGE_MESSAGES', 'SEND_MESSAGES']
                    }])
                    .catch(console.error);
                }
            }else if(message.guild.channels.filter(c => c.name === "log").size === 0 || message.guild.channels.filter(c => c.name === "jeuxgate-chat").size === 0){
                const gd = message.guild.channels.filter(c => c.name === "general" || c.name === "général")
                gd.filter(c => c.send("⚠️ Merci de bien vouloir me donner des droits administrateurs, ou créer les salons vous mêmes"))
            }
            log(`création des salons de JG par ${message.author.tag}`, message.guild.name)
        }
    }else{

        if(message.channel.name === "jeuxgate-chat"){
            if(message.content.length >= 2048) return message.reply("⚠️ Vôtre message est trop long, sois, plus de 2048 caractères")
            const embed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setTimestamp()
            .setFooter("JeuxGate")
            .setDescription(message.content)
            .addField("Jeuxgate chat provided", message.guild.name)
            .setAuthor(message.author.tag, message.author.avatarURL)
            const c1 = client.channels.filter(c => c.name === "jeuxgate-chat" && c.guild.member(client.user).hasPermission("ADMINISTRATOR") && c.type === "text" && c.id !== message.channel.id);
            c1.map(z => z.send(embed))
            return
        }
        if(message.content.includes("natsuka") || message.content.includes("nocta") && message.content.includes("moche")){
            message.delete()
            message.channel.send("Natsuka et moche ne vont pas dans le même message... wait hmmm ah si enfait ...")
        }

        if(message.content.includes("adriaayl")){
            message.channel.send ("adriaaaaaaaaaaaaaaaaaaaaaaaayl play despacito")
        }

        if(message.content.startsWith("system calls") || message.content.startsWith("system call") || message.content.startsWith("systeme calls") || message.content.startsWith("systeme call")){
            message.channel.send("To access command, execute `" + prefix + "` and to access the help just do `" + prefix + "help`  !")
        }

    }
})

//selflog
client.on("guildCreate", guild => {
    if(guild.member(client.user).hasPermission("ADMINISTRATOR")){
        if(guild.channels.filter(c => c.name === "jeuxgate-chat").size === 0){
            guild.createChannel('jeuxgate-chat', 'text', [{
                id: guild.id,
                deny: ['MANAGE_MESSAGES'],
                allow: ['SEND_MESSAGES']
            }])
            .catch(console.error);
        }
        if(guild.channels.filter(c => c.name === "log").size === 0){
            guild.createChannel('log', 'text', [{
                id: guild.id,
                deny: ['MANAGE_MESSAGES', 'SEND_MESSAGES']
            }])
            .catch(console.error);
        }
    }else if(guild.channels.filter(c => c.name === "log").size === 0 || guild.channels.filter(c => c.name === "jeuxgate-chat").size === 0){
        const gd = guild.channels.filter(c => c.name === "general" || c.name === "général")
        gd.filter(c => c.send("⚠️ Merci de bien vouloir me donner des droits administrateurs, ou créer les salons vous mêmes"))
    }
    log(`Un nouveau serveur a été ajouté, le voici :`, guild.name)
    if(guild.region !== "eu-central"){
        const gd = guild.channels.filter(c => c.name === "general" || c.name === "général")
        gd.filter(c => c.send("⚠️ I'm a french bot, and I don't have any english or any language !"))
    }
});
client.on("guildDelete", guild => {
    log(`Un nouveau serveur a été retiré, le voici :`, guild.name)
});