const Discord = require('discord.js');
const client = new Discord.Client();
client.login(process.env.TOKEN);

//ANCHOR Variable globales
var launched = 0;
var prefix = "jt/";
var vers = "1.2.8";
var fryourperm = "⚠️**Hey ...** Je suis désolé or, vous n'avez pas la permission d'exécuter celà !"
var frmyperm = "⚠️**Hey ...** Je suis désolé or, je n'ai pas la permission d'exécuter celà !"

//ANCHOR pro verification
function pro(iduser){
    if(iduser === "iduser") return false;
    if(!client.users.get(iduser)) return false;
    if(client.guilds.get("517372982268657684").members.get(iduser)){
        if(client.guilds.get("517372982268657684").members.get(iduser).roles.some(role => role.name === "JeuxGate pro" || role.name === "JeuxGate GOLD")){
            return true;
        }else{
            return false;
        }
    }else{
        return false
    }
}
function gold(iduser){
    if(iduser === "iduser") return false;
    if(!client.users.get(iduser)) return false;
    if(client.guilds.get("517372982268657684").members.get(iduser)){
        if(client.guilds.get("517372982268657684").members.get(iduser).roles.some(role => role.name === "JeuxGate GOLD")){
            return true;
        }else{
            return false;
        }
    }else{
        return false
    }
}

//ANCHOR log function
function log(event, serveur, version) {
    if(!event) return;
    if(!serveur) return;
    console.log(`${event} dans ${serveur}`)
    if(version === 1 || version === "version"){
        const log_embed = new Discord.RichEmbed()
        .setColor(`RANDOM`)
        .addField("LOG : ", event + " dans " + serveur )
        .setTimestamp()
        .setFooter("JeuxGate")
        const log = client.channels.filter(c => c.name === "log" || c.name === "jg-log" || c.name === "logs" || c.name === "jg-logs" && c.guild.member(client.user).hasPermission("EMBED_LINKS") && c.type === "text");
        log.map(z => z.send(log_embed).catch(O_o=>{}))
    }else if(version === 2){
        const log_embed = new Discord.RichEmbed()
        .setColor(`RANDOM`)
        .addField("LOG : ", event )
        .setTimestamp()
        .setFooter("JeuxGate")
        const log = client.channels.filter(c => c.name === "log" || c.name === "jg-log" || c.name === "logs" || c.name === "jg-logs" && c.guild.member(client.user).hasPermission("EMBED_LINKS") && c.type === "text");
        log.map(z => z.send(log_embed).catch(O_o=>{}))
    }
}

//ANCHOR state
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

// ANCHOR commandes
client.on(`message`, message =>{
    //anti kikoo
    if(message.author.bot) return;
    if(message.system) return;
    if(message.channel.type === "dm") return message.channel.send(`Vous ne pouvez pas intéragir avec moi avec des mp. Vous devez intéragir avec moi dans un serveur !`);

    //commandes
    if(message.content.startsWith(prefix)){
//HELP
        if(message.content.startsWith(prefix + "pro?")){
            if(pro(message.author.id)){
                message.reply("yup")
            }else{
                message.reply("non")
            }
        }
        //REVIEW help
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

            
            log(`utilisation de la commande help par ${message.author.username}`, message.guild.name, 1)
        }

        //REVIEW fun
        if(message.content.startsWith(prefix  + "fun")){
            var helpf_embed = new Discord.RichEmbed()
            .setColor("18d67e")
            .setTitle("Tu souhaites les commandes de fun ?")
            .setThumbnail(message.author.avatarURL)
            .setDescription("Je suis là pour vous aider.")
            .addBlankField()
            .addField(":kiss: Kiss", "Fais `" + prefix + "kiss @quelqu'un` pour faire un bisous à `@quelqu'un` !")
            .addField(":hugging: Hug", "Fais `" + prefix + "hug @quelqu'un` pour faire un câlin à `@quelqu'un` !")
            .addField(":white_circle: Pile ou face", "Fais `" + prefix + "pf` pour faire un pile ou face !")
            .addField(":frame_photo: Avatar", "Fais `" + prefix + "avatar @quelqu'un` pour voir la photo de profil de `@quelqu'un` !")
            .addField(":8ball: Boule magique", "Fais `" + prefix + "8ball <vôtre question>` pour que la boule magique vous réponde") // c à la troisième personne kono
            .addField(":envelope: Serveur", "Fais `" + prefix + "serveur` pour obtenir le serveur du bot !")
            .addField(":door: Invitation", "Fais `" + prefix + "invite` pour obtenir le lien pour inviter le bot dans votre serveur !")
            .setTimestamp()
            .setFooter("JeuxGate")
            message.channel.send(helpf_embed);

            
            log(`utilisation de la commande fun par ${message.author.username}`, message.guild.name, 1)
        }

        //REVIEW mod
        if(message.content.startsWith(prefix  + "mod")){
            var helpm_embed = new Discord.RichEmbed()
            .setColor("18d67e")
            .setTitle("Tu souhaites les commandes de modération ?")
            .setThumbnail(message.author.avatarURL)
            .setDescription("Je suis là pour vous aider.")
            .addField("Aides", `voici de l'aide !`)
            .addBlankField()
            .addField(":no_bell: Mute", "Fais `" + prefix + "mute @quelqu'un` pour mute `@quelqu'un` !")
            .addField(":bell: Unmute", "Fais `" + prefix + "unmute @quelqu'un` pour unmute `@quelqu'un` !")
            .addField(":timer: Ping", "Fais `" + prefix + "ping` pour savoir le ping du bot!")
            .addField(":abcd: Trouveur d'id", "Fais `" + prefix + "id <id d'une personne>` pour potentiellement savoir le nom à qui l'id est !")
            .addField(":skull_crossbones: purge", "Fais `" + prefix + "purge <un nombre>` pour supprimer <un nombre> de message(s) !")
            .addField("Bot infos", "Fais `" + prefix + "binfo` pour avoir des infos du bot !")
            .addField("Serveur infos", "Fais `" + prefix + "sinfo` pour avoir des infos du serveur !")
            .addField("Salons", "Fais `" + prefix + "channels` permet de faire les salons dédié à jeuxgate en une une commande !")
            .setTimestamp()
            .setFooter("JeuxGate")
            message.channel.send(helpm_embed);

            
            log(`utilisation de la commande mod par ${message.author.username}`, message.guild.name, 1)
        }

//ANCHOR FUN COMMANDES

        //REVIEW kiss
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

            
            log(`utilisation de la commande kiss par ${message.author.username}`, message.guild.name, 1)

        }

        //REVIEW hug
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
            .setTitle(`Tu viens de faire un câlin :`)
            .setImage(gif)
            .setTimestamp()
            .setFooter("JeuxGate")
            message.channel.send(hug_embed);

            
            log(`utilisation de la commande hug par ${message.author.username}`, message.guild.name, 1)
        }

        //REVIEW pile face
        if(message.content.startsWith(prefix + "pf")) {
            pileface = Math.floor(Math.random() * 2 + 0)
            if(pileface === 0){
                message.channel.send("Vous venez d'obtenir : **Pile** !")
            }else{
                message.channel.send("Vous venez d'obtenir : **Face** !")
            }

            
            log(`utilisation de la commande pf par ${message.author.username}`, message.guild.name, 1)
        }

        //REVIEW avatar
        if(message.content.startsWith(prefix + "avatar")){
            if(message.guild.member(message.mentions.users.first())){
                var user = message.mentions.users.first()
            }else{
                var user = message.author
            }
            var avatar_embed = new Discord.RichEmbed()
            .setColor("18d67e")
            .setTitle("Voici la photo de profil de " + user.username)
            .setImage(user.avatarURL)
            .setURL(user.avatarURL)
            .setTimestamp()
            .setFooter("JeuxGate")
            message.channel.send(avatar_embed);

            
            log(`utilisation de la commande d'avatar par ${message.author.username}`, message.guild.name, 1)
        }

        //REVIEW 8ball
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
                    "Je dirais que non",

                    //autres
                    "Actuellement, je ne peux le prédire ...",
                    "Impossible à prédire ..."
                ];
                var ansball = ball[Math.floor(Math.random() * ball.length)];
                var ball_embed = new Discord.RichEmbed()
                .setColor('4f0982')
                .addField(`Voici la réponse à vôtre question :`, ansball)
                .setTimestamp()
                .setFooter("JeuxGate")
                message.channel.send(ball_embed);

                
                log(`utilisation de la commande 8ball par ${message.author.username}`, message.guild.name, 1)
            }else{
                message.channel.send("Si vous voulez que la boule magique vous réponde, vous devez déjà poser la question !")
            }
        }


        //REVIEW serveur
        if(message.content.startsWith(prefix + "serveur")){
            var serveur_embed = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setTitle('Voici le serveur du bot : ')
            .setDescription(`https://discord.gg/BSEGc9D`)
            .setURL(`https://discord.gg/BSEGc9D`)
            .setTimestamp()
            .setFooter("JeuxGate")
            message.channel.send(serveur_embed);
        }

        //REVIEW invite
        if(message.content.startsWith(prefix + "invite")){
            var invite_embed = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setTitle('Voici le lien du bot : ')
            .setDescription(`https://discordapp.com/api/oauth2/authorize?client_id=515891064721244162&permissions=8&scope=bot`)
            .setURL(`https://discordapp.com/api/oauth2/authorize?client_id=515891064721244162&permissions=8&scope=bot`)
            .setTimestamp()
            .setFooter("JeuxGate")
            message.channel.send(invite_embed);
        }

        //REVIEW id finder
        if(message.content.startsWith(prefix + "id")){
            var idserched = message.content.substr(prefix.length + 3)
            if (!idserched || idserched === 0 || idserched === 1) {
                return message.reply("**Hey ...**Tu as oublié de mettre un id !");
            }
            if(client.users.get(idserched)){
                message.channel.send('Utilisateur avec id `' + idserched + '` trouvé, voici son nom d\'utilisateur : `' + client.users.get(idserched).username + '`')
                message.channel.send("***Pour des raisons de confidentialitées, le discriminant*** `#----` ***n'est pas cité***")
                log(`recherche d'id de la part de ${message.author.username}`, message.guild.name, 1)
            }else{
                message.channel.send('Aucun utilisateur avec id `' + idserched + '` Trouvé !')
            }
        }

//ANCHOR MOD COMMANDES

        //REVIEW ping
        if (message.content.startsWith(prefix + 'ping')) {
            message.channel.send('Pong! ping :`' + `${Date.now() - message.createdTimestamp}` + ' ms`');
            log(`Ping de ${message.author.username}`, message.guild.name, 1)
        }

        //REVIEW purge
        if(message.content.startsWith(prefix + "purge")) {
            if(!message.author.id === "244874298714619904" || !message.author.id === "471669236859928586"){
                if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send(fryourperm);
            }
            if(!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.channel.send(frmyperm);

            var suppression = message.content.substr(prefix.length + 6);
            if (suppression < 2 || suppression > 101) {
                return message.reply("**Hey ...**La valeur que vous avez entrée est invalide, merci de choisir une valeur comprise entre 2 et 100");
            }

            message.channel.bulkDelete(suppression, true).then(ok => {
                message.reply("**Suppression de " + "" + suppression + "" + " messages**")
                .then(message => setTimeout(function(){message.delete()}, 10000))
                .catch(err => console.log(err));
            
            })
            
            log(`utilisation de la commande de purge par ${message.author.username}`, message.guild.name, 1)
        }

        //REVIEW mute
        if(message.content.startsWith(prefix + "mute")) {
            if(!message.author.id === "244874298714619904" || !message.author.id === "471669236859928586"){
                if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send(fryourperm);
            }
            if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send(frmyperm);

            if(message.mentions.users.size === 0) {
                return message.reply("Tu dois mentionner quelqu'un pour faire cette commande");
            }
            var mute = message.guild.member(message.mentions.users.first());
            if(!mute) {
                return message.reply("Je n'ai pas trouvé l'utilisateur ou il n'existe pas !");
            }
            if(message.content.substr(prefix.length + 4) === " <@515891064721244162>"){
                return message.reply("Je ne peux pas me mute !");
            }

            message.channel.overwritePermissions(mute, { SEND_MESSAGES: false}).then(member => {
                message.channel.send(`${mute.user.username} a été mute par ${message.author.username} !`);
                
                
                log(`utilisation de la commande mute par ${message.author.username}`, message.guild.name, 1)
            })
        }

        //REVIEW unmute
        if(message.content.startsWith(prefix + "unmute")) {
            if(!message.author.id === "244874298714619904" || !message.author.id === "471669236859928586"){
                if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("**Hey ...**Vous n'avez pas la permissions d'éxécuter cela !");
            }
            if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission !");

            if(message.mentions.users.size === 0) {
                return message.reply("Tu dois mentionner quelqu'un pour faire cette commande");
            }
            var mute = message.guild.member(message.mentions.users.first());
            if(!mute) {
                return message.reply("Je n'ai pas trouvé l'utilisateur ou il l'existe pas !");
            }
            if(message.content.substr(prefix.length + 6) === " <@515891064721244162>"){
                return message.reply("Je ne peux pas me unmute !")
            }
    
            message.channel.overwritePermissions(mute, { SEND_MESSAGES: true}).then(member => {
                message.channel.send(`${mute.user.username} a été unmute par ${message.author.username} !`);

                
                log(`utilisation de la commande unmute par ${message.author.username}`, message.guild.name, 1)
            })
        }

        //REVIEW sinfo
        if(message.content.startsWith(prefix + "sinfo")) {
            var info_embed = new Discord.RichEmbed()
            .setColor("18d67e")
            .setTitle(`Infos sur le serveur : ${message.guild.name}`)
            .addField("Propriétaire du serveur", message.guild.owner.user.tag)
            .addField("Serveur crée le ", message.guild.createdAt)
            .addField("Tu as rejoin le ", message.member.joinedAt)
            .addField("Nombre total de personnes", message.guild.members.size)
            .addField("Nombre de membres", message.guild.members.size - message.guild.members.filter(member => member.user.bot).size)
            .addField("Nombre de bots", message.guild.members.filter(member => member.user.bot).size)
            .setTimestamp()
            .setFooter("JeuxGate")
            message.channel.send(info_embed)

            
            log(`utilisation de la commande sinfo par ${message.author.username}`, message.guild.name, 1)
        }

        //REVIEW binfo
        if(message.content.startsWith(prefix + "binfo")){
            if(message.author.id === "244874298714619904" || !message.author.id === "471669236859928586"){
                var binfos_embed = new Discord.RichEmbed()
                .setColor("18d67e")
                .setTitle(`Infos sur le bot : ${client.user.tag}`)
                .addField("Propriétaire du bot", `jéhèndé#3800 et Skalefou#8605`)
                .addField("Bot crée le ", `25/11/2018`)
                .addField("Nombre total de personnes ", client.users.size)
                .addField("Nombre total de serveur", client.guilds.array().length)
                .addField("Nom des serveurs", client.guilds.map(r =>`${r.name} | ${r.id} / ${r.memberCount} membres / ${r.region} `))
                .addField("Log Version", `Version : `+ vers +` Complète, et réservées !`)
                .setTimestamp()
                .setFooter("JeuxGate")
                message.channel.send(binfos_embed)

                
            }else{
                var binfo_embed = new Discord.RichEmbed()
                .setColor("18d67e")
                .setTitle(`Infos sur le bot : ${client.user.tag}`)
                .addField("Propriétaire du bot", `jéhèndé#3800 et Skalefou#8605`)
                .addField("Bot crée le ", `25/11/2018`)
                .addField("Nombre total de personnes ", client.users.size)
                .addField("Nombre total de serveur", client.guilds.array().length)
                .addField("Log Version", `Version : `+ vers +` !`)
                .setTimestamp()
                .setFooter("JeuxGate")
                message.channel.send(binfo_embed)

                log(`utilisation de la commande binfo par ${message.author.username}`, message.guild.name, 1)
            }
        }

        //REVIEW channels
        if(message.content.startsWith(prefix + "channel")){
            if(!message.author.id === "244874298714619904" || !message.author.id === "471669236859928586"){
                if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send(fryourperm);
            }
            if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send(frmyperm);
            if(message.guild.channels.filter(c => c.name === "jeuxgate-chat").size !== 0) return message.reply("Vous avez déjà les salons crées, après, si ils ne fonctionnent pas, merci de vérifier vous-même.")
            if(message.guild.channels.filter(c => c.name === "jeuxgate-chat").size === 0){
                const jgembed = new Discord.RichEmbed()
                .setColor(`RANDOM`)
                .setTimestamp()
                .setFooter("JeuxGate")
                .setDescription("*Le message*")
                .addField("Jeuxgate chat provided", "Nom du serveur")
                .setAuthor("Nom de la personne", client.user.avatarURL)
                message.guild.createChannel('jeuxgate-chat', 'text', [{
                    id: message.guild.id,
                    deny: ['MANAGE_MESSAGES'],
                    allow: ['SEND_MESSAGES']
                }])
                .then(channel => channel.send(jgembed))
                .catch(console.error);
                
            }
            if(message.guild.channels.filter(c => c.name === "log").size === 0){
                message.guild.createChannel('log', 'text', [{
                    id: message.guild.id,
                    deny: ['MANAGE_MESSAGES', 'SEND_MESSAGES']
                }])
                .catch(console.error);
            
            }
            log(`Création des salons de JG par ${message.author.tag}`, message.guild.name, 1)
        }

        //REVIEW Guild with log and jeuxgatechat
        if(message.content.startsWith(prefix + "dedisalons")){
            if(!message.author.id === "244874298714619904" || !message.author.id === "471669236859928586"){
                message.channel.send("Vous ne pouvez PAS executer cette commande")
            }
            const jg = client.channels.filter(c => c.name === "log" || c.name === "jg-log" || c.name === "logs" || c.name === "jg-logs" && c.guild.member(client.user).hasPermission("EMBED_LINKS") && c.type === "text");
            jg.map(jg => message.channel.send(jg.guild.name + " ||log"))

            const c1 = client.channels.filter(c => c.name === "jeuxgate-chat" && c.guild.member(client.user).hasPermission("EMBED_LINKS") && c.type === "text");
            c1.map(jg => message.channel.send(jg.guild.name + " ||jgchat"))
            log(`regard des salons log / jeuxgatechat dans tous les serveurs ${message.author.tag}`, message.guild.name, 1)
        }

        //REVIEW aaa
        if(message.content.startsWith(prefix + "serveurlist")){
            if(!message.author.id === "244874298714619904" || !message.author.id === "471669236859928586"){
                message.channel.send("Vous ne pouvez PAS executer cette commande")
            }
            client.guilds.map(jg => message.channel.send(jg.name + "| " + jg.id + "| " + jg.region + "| " + jg.memberCount + "membres"))
        }
    }else{

        //REVIEW jeuxgatechat
        if(message.channel.name === "jeuxgate-chat"){
            if(message.content.length >= 2048) return message.reply("⚠️ Vôtre message est trop long, sois, plus de 2048 caractères")
            if(message.attachments.size === 0){
                if(gold(message.author.id)){
                    var usernamejg = `:dvd: ${message.author.tag}  *membre gold*`
                }else if(pro(message.author.id)){
                    var usernamejg = `:cd: ${message.author.tag}  *membre pro*`
                }
                const chembed = new Discord.RichEmbed()
                .setColor(`RANDOM`)
                .setTimestamp()
                .setFooter("JeuxGate")
                .setDescription(message.content)
                .addField("Jeuxgate chat provided", message.guild.name)
                .setAuthor(usernamejg, message.author.avatarURL)
                const c1 = client.channels.filter(c => c.name === "jeuxgate-chat" && c.guild.member(client.user).hasPermission("EMBED_LINKS") && c.type === "text" && c.id !== message.channel.id);
                c1.map(z => z.send(chembed).catch(O_o=>{}))
                message.react('👌')
            }else{
                message.react('❌')
                message.channel.send("⚠️ **Votre message ne doit pas contenir d'image ou de fichier, ou celui-ci ne sera pas envoyé**")
            }
            return
        }
        if(pro(message.author.id)){
            if(message.content.includes("adriaayl")){
                message.channel.send ("adriaaaaaaaaaaaaaaaaaaaaaaaayl play despacito")
                log(`adriaaaaaaaaaaaaaaaaaaaaaaaayl`, message.guild.name, 2)
            }

            if(message.content.startsWith("system calls") || message.content.startsWith("system call") || message.content.startsWith("systeme calls") || message.content.startsWith("systeme call")){
                message.channel.send("To access commands, execute `" + prefix + "` and to access the help just do `" + prefix + "help`  !")
            }
        }

    }
})

//ANCHOR add/remove serveur
client.on("guildCreate", guild => {
    if(guild.member(client.user).hasPermission("ADMINISTRATOR")){
        if(guild.channels.filter(c => c.name === "jeuxgate-chat").size === 0){
            const jgembed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setTimestamp()
            .setFooter("JeuxGate")
            .setDescription("*Le message*")
            .addField("Jeuxgate chat provided", "Nom du serveur")
            .setAuthor("Nom de la personne", client.user.avatarURL)
            guild.createChannel('jeuxgate-chat', 'text', [{
                id: guild.id,
                deny: ['MANAGE_MESSAGES'],
                allow: ['SEND_MESSAGES']
            }])
            .catch(console.error)
            .then(channel => channel.send(jgembed)).catch(console.error);
        }
        if(guild.channels.filter(c => c.name === "log" || c.name === "logs").size === 0){
            guild.createChannel('log', 'text', [{
                id: guild.id,
                deny: ['MANAGE_MESSAGES', 'SEND_MESSAGES']
            }])
            .catch(console.error);
        }
    }else if(guild.channels.filter(c => c.name === "log").size === 0 || guild.channels.filter(c => c.name === "jeuxgate-chat").size === 0){
        const gd = guild.channels.filter(c => c.name === "general" || c.name === "général")
        gd.filter(c => c.send("⚠️ Merci de bien vouloir me donner des droits administrateurs, ou créer les salons vous même").catch(O_o=>{}))
    }   
    log(`Un nouveau serveur a été ajouté, le voici : ` + guild.name, guild.name, 2)
    if(guild.region !== "eu-central"){
        const gd = guild.channels.filter(c => c.name === "general" || c.name === "général")
        gd.filter(c => c.send("⚠️ I'm a french bot, and I don't support english or any language !").catch(O_o=>{}))
    }
});
client.on("guildDelete", guild => {
    log(`Un nouveau serveur a été retiré, le voici : `+ guild.name, guild.name, 2)
});
