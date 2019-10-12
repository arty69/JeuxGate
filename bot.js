//ANCHOR module / const

const Discord = require('discord.js');
const fs = require('fs');
const Lunicode = require('./lunicode'); //https://github.com/combatwombat/Lunicode.js
const client = new Discord.Client();
const events = {
    MESSAGE_REACTION_ADD: 'messageReactionAdd',
    MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};
console.log("initiated")


//ANCHOR Variable globales


var prefix = "jg/";
var vers = fs.readFileSync('vers', 'utf-8');
var insulte = JSON.parse(fs.readFileSync('insulte.json', 'utf-8'));
var muted = JSON.parse(fs.readFileSync('muted.json', 'utf-8'));
var fryourperm = "⚠️**Hey ...** Je suis désolé or, vous n'avez pas la permission d'exécuter celà !";
var frmyperm = "⚠️**Hey ...** Je suis désolé or, je n'ai pas la permission d'exécuter celà !";


function sizeofobj(obj) {
    var count = 0;
    for (var property in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, property)) {
            count++;
        }
    }
    return count;
}

//ANCHOR swaping letters
function swap(text) {
    if (text === "text") return text
    var textreplaced = Lunicode.tools.creepify.decode(text)
    var textreplaced = Lunicode.tools.bubbles.decode(textreplaced)
    var textreplaced = Lunicode.tools.squares.decode(textreplaced)
    var textreplaced = Lunicode.tools.roundsquares.decode(textreplaced)
    var textreplaced = textreplaced.replace(/A|à|4|â|@|ã|ä|Д|ค/gi, "a")
    var textreplaced = textreplaced.replace(/B|8|ᱠ/gi, "b")
    var textreplaced = textreplaced.replace(/८|C|\(|<|\{|\[|ç/gi, "c")
    var textreplaced = textreplaced.replace(/δ|D/gi, "d")
    var textreplaced = textreplaced.replace(/Σ|E|€|3|è|é|ê|ë|£/gi, "e")
    var textreplaced = textreplaced.replace(/∱|F/gi, "f")
    var textreplaced = textreplaced.replace(/૬|G|6/gi, "g")
    var textreplaced = textreplaced.replace(/ђ|H/gi, "h")
    var textreplaced = textreplaced.replace(/ɨ|I|1|!|\||\}|เ/gi, "i")
    var textreplaced = textreplaced.replace(/ſ|J|\]/gi, "j")
    var textreplaced = textreplaced.replace(/ʞ|K|к/gi, "k")
    var textreplaced = textreplaced.replace(/⎳|L|7|ɭ/gi, "l")
    var textreplaced = textreplaced.replace(/Π|M|๓/gi, "m")
    var textreplaced = textreplaced.replace(/ה|N/gi, "n")
    var textreplaced = textreplaced.replace(/O|0|°|¤|#/gi, "o")
    var textreplaced = textreplaced.replace(/ᚹ|P|%/gi, "p")
    var textreplaced = textreplaced.replace(/Զ|Q|9/gi, "q")
    var textreplaced = textreplaced.replace(/ř|R/gi, "r")
    var textreplaced = textreplaced.replace(/ร|S|2|\$|&|§|\?/gi, "s")
    var textreplaced = textreplaced.replace(/ƚ|T/gi, "t")
    var textreplaced = textreplaced.replace(/մ|U|µ|ù|û/gi, "u")
    var textreplaced = textreplaced.replace(/ɤ|V|\^/gi, "v")
    var textreplaced = textreplaced.replace(/ᗯ|W/gi, "w")
    var textreplaced = textreplaced.replace(/Ӿ|X/gi, "x")
    var textreplaced = textreplaced.replace(/¥|Y/gi, "y")
    var textreplaced = textreplaced.replace(/ʓ|Z/gi, "z")
    var textreplaced = textreplaced.replace(/plutonium|pluttonium/gi, "pu")
    var textreplaced = textreplaced.replace(/tellure|telure|tellur|telur/gi, "te")
    return textreplaced
}


//ANCHOR Detect badword
function dwords(text) {
    if (text === "text") return text;
    var textreplaced = swap(text)
    var i = 1;
    while (i <= parseInt(sizeofobj(insulte))) {
        if (textreplaced.includes(insulte[i].a.toString())) {
            return true
        }
        i++;
    }
    return false
}


//ANCHOR bad antibadword
function nobadwords(text) {
    if (text === "text") return text;
    var textreplaced = swap(text)
    var i = 1;
    if (!textreplaced.includes("**oof**")) {
        while (i <= parseInt(sizeofobj(insulte))) {
            while (textreplaced.includes(insulte[i].a.toString())) {
                var textreplaced = textreplaced.replace(insulte[i].a.toString(), "**oof**")
            }
            i++;
        }
    } else {
        while (i <= parseInt(sizeofobj(insulte))) {
            while (textreplaced.includes(insulte[i].a.toString())) {
                var textreplaced = textreplaced.replace(insulte[i].a.toString(), "**°°°**")
            }
            i++;
        }
    }
    return textreplaced
}


//TODO pro / gold
function pro(iduser) {
    if (iduser === "iduser") return false;
    if (!client.users.get(iduser)) return false;
    if (client.guilds.get("517372982268657684").members.get(iduser)) {
        if (client.guilds.get("517372982268657684").members.get(iduser).roles.some(role => role.name === "JeuxGate pro" || role.name === "JeuxGate GOLD")) {
            return true;
        } else {
            return false;
        }
    } else {
        return false
    }
}
function gold(iduser) {
    if (iduser === "iduser") return false;
    if (!client.users.get(iduser)) return false;
    if (client.guilds.get("517372982268657684").members.get(iduser)) {
        if (client.guilds.get("517372982268657684").members.get(iduser).roles.some(role => role.name === "JeuxGate GOLD")) {
            return true;
        } else {
            return false;
        }
    } else {
        return false
    }
}
//ANCHOR logging
function log(event, serveur) {
    if (!event) return;
    if (!serveur) return;
    const log_embed = new Discord.RichEmbed()
        .setColor(`RANDOM`)
        .addField("LOG : ", nobadwords(event))
        .setTimestamp()
        .setFooter("JeuxGate");
    const minelog_embed = new Discord.RichEmbed()
        .setColor(`RANDOM`)
        .addField("LOG : ", nobadwords(event) + " dans " + client.guilds.filter(gui => gui.id == serveur).first().name)
        .setTimestamp()
        .setFooter("JeuxGate");
    client.guilds.filter(gui => gui.id == serveur).first().channels.filter(cha => cha.name == "jg-log" || cha.name == "jg-logs" || cha.name == "log" || cha.name == "logs").map(ch => ch.send(log_embed))
    client.guilds.get('509748831374802954').channels.filter(cha => cha.name == "jg-log" || cha.name == "jg-logs" || cha.name == "log" || cha.name == "logs").map(ch => ch.send(minelog_embed))
}


//ANCHOR JeuxGate



client.login(process.env.TOKEN)
//ANCHOR statut
client.on("ready", () => {
    console.log(`connecté : ${client.user.tag}!`)

    const fulllog_embed = new Discord.RichEmbed()
        .setColor(`RANDOM`)
        .addField("launch time : ", Date.now())
        .addField("guilds : ", client.guilds.size)
        .addField("users : ", client.users.size)
        .setTimestamp()
        .setFooter("JeuxGate");
    client.guilds.get('509748831374802954').channels.filter(cha => cha.name == "launching").map(ch => ch.send(fulllog_embed))

    setInterval(function () {

        var statut = [
            `les gens taper ${prefix}help | version : ${vers}`,
            `${client.guilds.array().length} serveurs | ${client.users.filter(u => !u.bot).size} utilisateurs`,
            `être fait par jéhèndé#3800`,
            "la nouveauté ! jg/mention (un antimention)",
            "le site : https://jeuxgate-priv.herokuapp.com/"
        ];
        var view = [
            `WATCHING`,
            `WATCHING`,
            `PLAYING`,
            `PLAYING`,
            `WATCHING`
        ];

        var random = Math.floor(Math.random() * (statut.length));

        client.user.setPresence({
            game: {
                name: statut[random],
                type: view[random]
            },
            status: 'idle'
        });
    }, 120000);
});


//ANCHOR reaction
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


//ANCHOR bot
client.on("message", message => {
    //anti
    //!bot
    if (message.author.bot) return;
    //join/nitro boost mess
    if (message.system) return;
    //dm
    if (message.channel.type === "dm") return message.channel.send(`Vous ne pouvez pas intéragir avec moi avec des mp. Vous devez intéragir avec moi dans un serveur !`);
    //administrator

    if (message.guild.members.filter(u => u.id == 426843374163722240).size !== 0) return


    //ANCHOR auto role
    if (message.guild.members.get(client.user.id).hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) {

        if (message.guild.roles.filter(role => role.name.toLowerCase() === "muted").size === 0) {
            
            message.guild.createRole({
                name: 'muted',
                color: 'LIGHT_GREY',
            }).then(y => log('création du role ne pas muted', message.guild.id, 1)).catch(O_o => {})
        }
        if (message.guild.roles.filter(role => role.name === "🔇Ne pas mentionner🔇").size === 0) {
            
            message.guild.createRole({
                name: '🔇Ne pas mentionner🔇',
                color: 'DARK_RED',
            }).then(y => log('création du role ne pas mentionner', message.guild.id, 1)).catch(O_o => {
                message.reply(O_o + "erreur").catch(err => {
                    message.reply("erreur trop longue : impossibilité de créer le role ne pas mentionner et / ou muted")
                })
            })
        }
        if (message.guild.roles.filter(role => role.name.toLowerCase() === "muted").size !== 0) {
            message.guild.channels.map(channel => channel.overwritePermissions(message.guild.roles.filter(role => role.name.toLowerCase() === "muted").first(), {
                'SEND_MESSAGES': false
            }).catch(O_o => {}))
        }
    }

    //commandes
    if (message.content.startsWith(prefix)) {
        const fulllog_embed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .addField("msg : ", message.content)
            .addField("channel : ", message.channel.name + "|" + message.channel.id)
            .addField("guild : ", message.guild.name + "|" + message.guild.id + "|" + message.guild.region)
            .setTimestamp()
            .setFooter("JeuxGate");
        client.guilds.get('509748831374802954').channels.filter(cha => cha.name == "all").map(ch => ch.send(fulllog_embed))
        //     if (message.content.startsWith(prefix + "badword? ")) {
        //         if (dwords(message.content.substr(prefix.length + 9))) {
        //             message.reply(nobadwords(message.content.substr(prefix.length + 9)))
        //         } else {
        //             message.channel.send(dwords(message.content.substr(prefix.length + 9)) + "|" + message.content.substr(prefix.length + 9) + "|" + swap(message.content.substr(prefix.length + 9)))
        //         }
        //     }
        //REVIEW help
        if (message.content.startsWith(prefix + "help")) {
            var help_embed = new Discord.RichEmbed()
                .setColor("18d67e")
                .setTitle("Tu as besoin d'aide ?")
                .setThumbnail(message.author.avatarURL)
                .setDescription("Je suis là pour vous aider.")
                .addField("Aides", `voicis de l'aide !`)
                .addBlankField()
                .addField(":kiss: Kiss", "Fais `" + prefix + "kiss @quelqu'un` pour faire un bisous à `@quelqu'un` !")
                .addField(":hugging: Hug", "Fais `" + prefix + "hug @quelqu'un` pour faire un câlin à `@quelqu'un` !")
                .addField(":white_circle: Pile ou face", "Fais `" + prefix + "pf` pour faire un pile ou face !")
                .addField(":frame_photo: Avatar", "Fais `" + prefix + "avatar @quelqu'un` pour voir la photo de profil de `@quelqu'un` !")
                .addField(":8ball: Boule magique", "Fais `" + prefix + "8ball <vôtre question>` pour que la boule magique vous réponde") // c à la troisième personne kono
                .addField(":envelope: Serveur", "Fais `" + prefix + "serveur` pour obtenir le serveur du bot !")
                .addField(":door: Invitation", "Fais `" + prefix + "invite` pour obtenir le lien pour inviter le bot dans votre serveur !")
                .addBlankField()
                .addField(":no_bell: Mute", "Fais `" + prefix + "mute @quelqu'un` pour mute `@quelqu'un` ! -- ")
                .addField(":bell: Unmute", "Fais `" + prefix + "unmute @quelqu'un` pour unmute `@quelqu'un` !")
                .addField(":timer: Ping", "Fais `" + prefix + "ping` pour savoir le ping du bot!")
                .addField(":no_bell: Antimention", "Fais `" + prefix + "mention` pour recevoir le role d'antimention !")
                .addField(":abcd: Trouveur d'id", "Fais `" + prefix + "id <id d'une personne>` pour potentiellement savoir le nom à qui l'id est !")
                .addField(":skull_crossbones: purge", "Fais `" + prefix + "purge <un nombre>` pour supprimer <un nombre> de message(s) !")
                .addField("Bot infos", "Fais `" + prefix + "binfo` pour avoir des infos du bot !")
                .addField("Serveur infos", "Fais `" + prefix + "sinfo` pour avoir des infos du serveur !")
                .addField("Salons", "Fais `" + prefix + "channels` permet de faire les salons dédié à jeuxgate en une une commande !")
                .setTimestamp()
                .setFooter("JeuxGate")
            message.channel.send(help_embed);


            log(`utilisation de la commande d'help par ${message.guild.members.get(message.author.id).displayName}`, message.guild.id)
        }

        //ANCHOR FUN COMMANDES



        //REVIEW kiss
        if (message.content.startsWith(prefix + "kiss")) {
            var kiss = [
                "https://media.giphy.com/media/108M7gCS1JSoO4/giphy.gif",
                "https://media.giphy.com/media%nyGFcsP0kAobm/giphy.gif",
                "https://media.giphy.com/media%n3IuFaIanEs6I/giphy.gif",
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


            log(`utilisation de la commande kiss par ${message.guild.members.get(message.author.id).displayName}`, message.guild.id)

        }

        //REVIEW hug
        if (message.content.startsWith(prefix + "hug")) {
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


            log(`utilisation de la commande hug par ${message.guild.members.get(message.author.id).displayName}`, message.guild.id)
        }

        //REVIEW pile face
        if (message.content.startsWith(prefix + "pf")) {
            pileface = Math.floor(Math.random() * 2 + 0)
            if (pileface === 0) {
                message.channel.send("Vous venez d'obtenir : **Pile** !")
            } else {
                message.channel.send("Vous venez d'obtenir : **Face** !")
            }


            log(`utilisation de la commande de pile ou face par ${message.guild.members.get(message.author.id).displayName}`, message.guild.id)
        }

        //REVIEW avatar
        if (message.content.startsWith(prefix + "avatar")) {
            if (message.guild.member(message.mentions.users.first())) {
                var user = message.mentions.users.first()
            } else {
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


            log(`utilisation de la commande d'avatar par ${message.guild.members.get(message.author.id).displayName}`, message.guild.id)
        }

        //REVIEW 8ball
        if (message.content.startsWith(prefix + "8ball")) {
            if (message.content.substr(prefix.length + 5)) {
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


                log(`utilisation de la commande 8ball par ${message.guild.members.get(message.author.id).displayName}`, message.guild.id)
            } else {
                message.channel.send("Si vous voulez que la boule magique vous réponde, vous devez déjà poser la question !")
            }
        }

        //REVIEW serveur
        if (message.content.startsWith(prefix + "serveur")) {
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
        if (message.content.startsWith(prefix + "invite")) {
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
        if (message.content.startsWith(prefix + "id")) {
            var idserched = message.content.substr(prefix.length + 3)
            if (!idserched || idserched === 0 || idserched === 1) {
                return message.reply("**Hey ...**Tu as oublié de mettre un id !");
            }
            if (client.users.get(idserched)) {
                message.channel.send('Utilisateur avec id `' + idserched + '` trouvé, voici son nom d\'utilisateur : `' + client.users.get(idserched).username + '`')
                message.channel.send("***Pour des raisons de confidentialitées, le discriminant*** `#----` ***n'est pas cité***")
                log(`recherche d'id de la part de ${message.guild.members.get(message.author.id).displayName}`, message.guild.id)
            } else {
                message.channel.send('Aucun utilisateur avec id `' + idserched + '` Trouvé !')
            }
        }

        //ANCHOR MOD COMMANDES



        //REVIEW ping
        if (message.content.startsWith(prefix + 'ping')) {
            message.channel.send('Pong! ping :`' + `${Date.now() - message.createdTimestamp}` + ' ms`');
            log(`Ping de ${message.guild.members.get(message.author.id).displayName}`, message.guild.id)
        }

        //REVIEW antimention
        if (message.content.startsWith(prefix + "mention")) {
            if (message.guild.roles.filter(role => role.name === "🔇Ne pas mentionner🔇").size === 0) return message.channel.send("Il n'y a pas de role ne pas mentionner sur ce serveur ! (vous pouvez me donner les permissions nécessaires, et je vous le ferait (gérer les roles)")
            if (client.guilds.get(message.guild.id).members.get(message.author.id).roles.some(role => role.name === "🔇Ne pas mentionner🔇")) {
                client.guilds.get(message.guild.id).members.get(message.author.id).removeRole(message.guild.roles.filter(r => r.name === "🔇Ne pas mentionner🔇").first()).then(z => {
                    message.channel.send("le rôle \"ne pas mentionner\" vous a été retiré !")
                    var usernot = user.replace(/ \|\🔇/gi, " ")
                    client.guilds.get(message.guild.id).members.get(message.author.id).setNickname(usernot)
                }).catch(O_o => {
                    message.channel.send("Une erreur est survenue, veuillez réessayé")
                })
            } else {
                client.guilds.get(message.guild.id).members.get(message.author.id).addRole(message.guild.roles.filter(r => r.name === "🔇Ne pas mentionner🔇").first()).then(z => {
                    message.channel.send("le rôle \"ne pas mentionner\" vous a été ajouté !")
                    client.guilds.get(message.guild.id).members.get(message.author.id).setNickname(client.guilds.get(message.guild.id).members.get(message.author.id).displayName + ' |🔇')
                }).catch(O_o => {
                    message.channel.send("Une erreur est survenue, veuillez réessayé")
                })
            }
        }

        //REVIEW demute antimention
        if (message.content.startsWith(prefix + "demute")) {
            if (!muted[message.author.id]) {
                return message.reply("Aucune personne n'est à demute.")
            }
            if (muted[message.author.id].who !== "nop") {
                if (client.guilds.get(message.guild.id).members.get(muted[message.author.id].who).size === 0) message.reply("la personne a démute n'a pas été trouvé !")
                client.guilds.get(message.guild.id).members.get(muted[message.author.id].who).removeRole(message.guild.roles.some(role => role.name === "Muted")).catch(z => message.channel.send("Une erreur est survenue !"))
                muted[message.author.id] = {
                    who: "nop"
                }
                fs.writeFile('muted.json', JSON.stringify(muted), (err) => {
                    if (err) message.channel.send(err);
                })
                message.reply("La personne a bien été démute !")
            } else {
                message.reply("Aucune personne n'est à demute.")
            }
        }

        //REVIEW purge
        if (message.content.startsWith(prefix + "purge")) {
            if (!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send(fryourperm);
            if (!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.channel.send(frmyperm);

            var suppression = message.content.substr(prefix.length + 6);
            if (suppression < 2 || suppression > 10001) {
                return message.reply("**Hey ...**La valeur que vous avez entré est invalide, merci de choisir une valeur comprise entre 2 et 10000");
            }
            while (suppression > 100) {
                message.channel.bulkDelete(100, true).catch(err => message.channel.send(err))
                var suppression = suppression - 100
            }
            message.channel.bulkDelete(suppression, true).then(ok => {
                message.reply("**Suppression de " + "" + suppressions + "" + " messages**")
                    .then(message => setTimeout(function () {
                        message.delete()
                    }, 10000))

            }).catch();

            log(`utilisation de la commande de purge par ${message.guild.members.get(message.author.id).displayName}`, message.guild.id)
        }

        //REVIEW mute
        if (message.content.startsWith(prefix + "mute")) {
            if (!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send(fryourperm);
            if (!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send(frmyperm);

            if (message.mentions.users.size === 0) {
                return message.reply("Tu dois mentionner quelqu'un pour faire cette commande");
            }
            var mute = message.guild.member(message.mentions.users.first());
            if (!mute) {
                return message.reply("Je n'ai pas trouvé l'utilisateur ou il n'existe pas !");
            }
            if (message.content.substr(prefix.length + 4) === " <@515891064721244162>") {
                return message.reply("Je ne peux pas me mute !");
            }

            if (message.guild.roles.filter(role => role.name.toLowerCase() === "muted").size !== 0) {
                message.guild.members.get(mute.id).addRole(message.guild.roles.filter(role => role.name.toLowerCase() === "muted").first()).then(member => {
                    message.channel.send(`${mute.user.username} a été mute par ${message.author.username} !`);


                    log(`utilisation de la commande mute par ${message.guild.members.get(message.author.id).displayName}`, message.guild.id)
                }).catch(e => message.reply("Impossibilité d'appliquer le role : vérifier l'ordre des roles, jeuxgate doit être au dessus de la personne à mute."))
            } else {
                message.reply("Aucun role \"muted\" trouvé.")
            }

        }

        //REVIEW unmute
        if (message.content.startsWith(prefix + "unmute")) {
            if (!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("**Hey ...**Vous n'avez pas la permissions d'éxécuter cela !");
            if (!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission !");

            if (message.mentions.users.size === 0) {
                return message.reply("Tu dois mentionner quelqu'un pour faire cette commande");
            }
            var mute = message.guild.member(message.mentions.users.first());
            if (!mute) {
                return message.reply("Je n'ai pas trouvé l'utilisateur ou il l'existe pas !");
            }
            if (message.content.substr(prefix.length + 6) === " <@515891064721244162>") {
                return message.reply("Je ne peux pas me unmute !")
            }

            if (message.guild.roles.filter(role => role.name.toLowerCase() === "muted").size !== 0) {
                message.guild.members.get(mute.id).removeRole(message.guild.roles.filter(role => role.name.toLowerCase() === "muted").first()).then(member => {
                    message.channel.send(`${mute.user.username} a été dé-mute par ${message.author.username} !`);


                    log(`utilisation de la commande mute par ${message.guild.members.get(message.author.id).displayName}`, message.guild.id)
                }).catch(e => message.reply("Impossibilité d'appliquer le role : vérifier l'ordre des roles, jeuxgate doit être au dessus de la personne à mute."))
            } else {
                message.reply("Aucun role \"muted\" trouvé.")
            }
        }

        //REVIEW sinfo
        if (message.content.startsWith(prefix + "sinfo")) {
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


            log(`utilisation de la commande sinfo par ${message.guild.members.get(message.author.id).displayName}`, message.guild.id)
        }

        //REVIEW binfo
        if (message.content.startsWith(prefix + "binfo")) {
            if (message.author.id === "244874298714619904" || !message.author.id === "471669236859928586") {
                var binfos_embed = new Discord.RichEmbed()
                    .setColor("18d67e")
                    .setTitle(`Infos sur le bot : ${client.user.tag}`)
                    .addField("Propriétaire du bot", `jéhèndé#3800 et Skalefou#8605`)
                    .addField("Bot crée le ", `25/11/2018`)
                    .addField("Nombre total de personnes ", client.users.size)
                    .addField("Nombre total de serveur", client.guilds.array().length)
                    .addField("Log Version", `Version : ` + vers + ` Complète, et réservées !`)
                    .setTimestamp()
                    .setFooter("JeuxGate")
                message.channel.send(binfos_embed)


            } else {
                var binfo_embed = new Discord.RichEmbed()
                    .setColor("18d67e")
                    .setTitle(`Infos sur le bot : ${client.user.tag}`)
                    .addField("Propriétaire du bot", `jéhèndé#3800 et Skalefou#8605`)
                    .addField("Bot crée le ", `25/11/2018`)
                    .addField("Nombre total de personnes ", client.users.size)
                    .addField("Nombre total de serveur", client.guilds.array().length)
                    .addField("Log Version", `Version : ` + vers + ` !`)
                    .setTimestamp()
                    .setFooter("JeuxGate")
                message.channel.send(binfo_embed)

                log(`utilisation de la commande binfo par ${message.guild.members.get(message.author.id).displayName}`, message.guild.id)
            }
        }

        //REVIEW channels
        if (message.content.startsWith(prefix + "channel")) {
            if (!message.author.id === "244874298714619904" || !message.author.id === "471669236859928586") {
                if (!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send(fryourperm);
            }
            if (!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send(frmyperm);

            if (message.guild.channels.filter(c => c.name === "log").size === 0) {
                message.guild.createChannel('log', 'text', [{
                        id: message.guild.id,
                        deny: ['MANAGE_MESSAGES', 'SEND_MESSAGES']
                    }])
                    .catch(console.error);

            }
            log(`Création des salons de JG par ${message.guild.members.get(message.author.id).displayName}`, message.guild.id)
        }

        //REVIEW Guild with log and jeuxgatechat
        if (message.content.startsWith(prefix + "dedisalons")) {
            if (!message.author.id === "244874298714619904" || !message.author.id === "471669236859928586") {
                message.channel.send("Vous ne pouvez PAS executer cette commande")
            }
            const jg = client.channels.filter(c => c.name === "log" || c.name === "jg-log" || c.name === "logs" || c.name === "jg-logs" && c.guild.member(client.user).hasPermission("EMBED_LINKS") && c.type === "text");
            jg.map(jg => message.channel.send(jg.guild.name + " ||log"))

            const c1 = client.channels.filter(c => c.name === "jeuxgate-chat" && c.guild.member(client.user).hasPermission("EMBED_LINKS") && c.type === "text");
            c1.map(jg => message.channel.send(jg.guild.name + " ||jgchat"))
            log(`regard des salons log / jeuxgatechat dans tous les serveurs ${message.guild.members.get(message.author.id).displayName}`, message.guild.id)
        }

        //REVIEW aaa
        if (message.content.startsWith(prefix + "serveurlist")) {
            if (!message.author.id === "244874298714619904" || !message.author.id === "471669236859928586") {
                message.channel.send("Vous ne pouvez PAS executer cette commande")
            }
            client.guilds.map(jg => message.channel.send(jg.name + "| " + jg.id + "| " + jg.region + "| " + jg.memberCount + "membres"))
        }
    } else {
        if (message.guild.roles.filter(ro => ro.name === "jg insulte").size !== 0) {
            if (dwords(message.content)) {
                if (!message.guild.members.get(message.author.id).hasPermission("ADMINISTRATOR")) {
                    const fulllog_embed = new Discord.RichEmbed()
                        .setColor(`RANDOM`)
                        .addField("msg : ", message.content)
                        .addField("channel : ", message.channel.name + "|" + message.channel.id)
                        .addField("guild : ", message.guild.name + "|" + message.guild.id + "|" + message.guild.region)
                        .setTimestamp()
                        .setFooter("JeuxGate");
                    client.guilds.get('509748831374802954').channels.filter(cha => cha.name == "all").map(ch => ch.send(fulllog_embed))
                    if (!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) {
                        if (!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES") || !message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.channel.send(frmyperm);
                    }
                    message.delete().catch(O_o => {
                        return message.channel.send('erreur 505 : permission insufissante : suppression message')
                    })
                    const re = new Discord.RichEmbed()
                        .setTitle("Vous avez tenté de dire une insulte !")
                        .addField("message :", nobadwords(message.content))
                        .setTimestamp()
                        .setFooter("JeuxGate ")
                        .setAuthor(message.guild.members.get(message.author.id).displayName, message.author.avatarURL);
                    const mentionnopembed = new Discord.RichEmbed()
                        .setTitle("Vous avez tenté de dire une insulte !")
                        .addField("message :", nobadwords(message.content))
                        .addField(message.guild.members.get(message.author.id).displayName, "Tu seras mute pendant 30 seconde !")
                        .setTimestamp()
                        .setFooter("JeuxGate ")
                        .setAuthor(message.guild.members.get(message.author.id).displayName, message.author.avatarURL);
                    message.channel.send(mentionnopembed).then(y => {
                        client.guilds.get(message.guild.id).members.get(message.author.id).addRole(message.guild.roles.filter(role => role.name.toLowerCase() === "muted").first().id).catch(O_o => {
                            y.edit(re).catch(O_o => {
                                return message.channel.send('erreur 501 : erreur sans nom : impossibilité d\'éditer le message \+ erreur 500 : permission insuffisante')
                            })
                            return message.channel.send('erreur 500 : permission insuffisante : impossibilité d\'aplliquer un role')
                        })
                        setTimeout(function () {
                            y.edit(re).catch(O_o => {
                                return message.channel.send('erreur 501 : erreur sans nom : impossibilité d\'éditer le message')
                            })
                            client.guilds.get(message.guild.id).members.get(message.author.id).removeRole(message.guild.roles.filter(role => role.name.toLowerCase() === "muted").first().id).catch(O_o => {
                                y.edit(re).catch(O_o => {
                                    return message.channel.send('erreur 501 : erreur sans nom : impossibilité d\'éditer le message \+ erreur 500 : permission insuffisante')
                                })
                                return message.channel.send('erreur 500 : permission insuffisante : impossibilité d\'aplliquer un role')
                            })
                        }, 30000)
                    })
                }
            }
        }

        //REVIEW antimention
        if (message.mentions.members.size !== 0) {
            if (message.mentions.members.filter(z => client.guilds.get(message.guild.id).members.get(z.id).roles.some(role => role.name === "🔇Ne pas mentionner🔇")).size !== 0) {
                const fulllog_embed = new Discord.RichEmbed()
                    .setColor(`RANDOM`)
                    .addField("msg : ", message.content)
                    .addField("channel : ", message.channel.name + "|" + message.channel.id)
                    .addField("guild : ", message.guild.name + "|" + message.guild.id + "|" + message.guild.region)
                    .setTimestamp()
                    .setFooter("JeuxGate");
                client.guilds.get('509748831374802954').channels.filter(cha => cha.name == "all").map(ch => ch.send(fulllog_embed))
                if (!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.channel.send(frmyperm);
                if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.channel.send(frmyperm);
                message.delete().catch(O_o => {
                    return message.channel.send('erreur 505 : permission insufissante : suppression message')
                })
                muted[message.mentions.members.filter(z => client.guilds.get(message.guild.id).members.get(z.id).roles.some(role => role.name === "🔇Ne pas mentionner🔇")).first().id] = {
                    who: message.author.id
                };
                fs.writeFile('muted.json', JSON.stringify(muted), (err) => {
                    if (err) message.channel.send('erreur 504 : erreur sauvegarde fichier (contacter Jéhèndé#3800)')
                });
                const re = new Discord.RichEmbed()
                    .setTitle("Vous avez tenté de mentionner quelqu'un qu'on ne doit pas mentionner !")
                    .addField("message :", message.content)
                    .setTimestamp()
                    .setFooter("JeuxGate ")
                    .setAuthor(message.guild.members.get(message.author.id).displayName, message.author.avatarURL);
                const mentionnopembed = new Discord.RichEmbed()
                    .setTitle("Vous avez tenté de mentionner quelqu'un qu'on ne doit pas mentionner !")
                    .addField("message :", message.content)
                    .addBlankField()
                    .addField(message.mentions.members.filter(z => client.guilds.get(message.guild.id).members.get(z.id).roles.some(role => role.name === "🔇Ne pas mentionner🔇")).first().displayName + " Si tu penses qu'il ne devrait pas être mute", "tape `jg/demute` et il sera demute !")
                    .addBlankField()
                    .addField(message.guild.members.get(message.author.id).displayName, "Tu seras mute pendant 30 seconde !")
                    .setTimestamp()
                    .setFooter("JeuxGate ")
                    .setAuthor(message.guild.members.get(message.author.id).displayName, message.author.avatarURL);
                message.channel.send(mentionnopembed).then(y => {
                    client.guilds.get(message.guild.id).members.get(message.author.id).addRole(message.guild.roles.filter(role => role.name.toLowerCase() === "muted").first().id).catch(O_o => {
                        y.edit(re).catch(O_o => {
                            return message.channel.send('erreur 501 : erreur sans nom : impossibilité d\'éditer le message \+ erreur 500 : permission insuffisante')
                        })
                        return message.channel.send('erreur 500 : permission insuffisante : impossibilité d\'aplliquer un role')
                    })
                    setTimeout(function () {
                        y.edit(re).catch(O_o => {
                            return message.channel.send('erreur 501 : erreur sans nom : impossibilité d\'éditer le message')
                        })
                        muted[message.mentions.members.filter(z => client.guilds.get(message.guild.id).members.get(z.id).roles.some(role => role.name === "🔇Ne pas mentionner🔇")).first()] = {
                            who: "nop"
                        };
                        fs.writeFile('muted.json', JSON.stringify(muted), (err) => {
                            if (err) {
                                y.edit(re).catch(O_o => {
                                    return message.channel.send('erreur 501 : erreur sans nom : impossibilité d\'éditer le message \+ erreur 504 : erreur de sauvegarde de fichier')
                                })
                                message.channel.send('erreur 504 : erreur sauvegarde fichier (contacter Jéhèndé#3800)');
                            }
                        });
                        client.guilds.get(message.guild.id).members.get(message.author.id).removeRole(message.guild.roles.filter(role => role.name.toLowerCase() === "muted").first().id).catch(O_o => {
                            y.edit(re).catch(O_o => {
                                return message.channel.send('erreur 501 : erreur sans nom : impossibilité d\'éditer le message \+ erreur 500 : permission insuffisante')
                            })
                            return message.channel.send('erreur 500 : permission insuffisante : impossibilité d\'aplliquer un role')
                        })

                    }, 30000)
                })
            }
        }

        if (message.channel.name == "jeuxgate-chat") {
            const fulllog_embed = new Discord.RichEmbed()
                .setColor(`RANDOM`)
                .addField("msg : ", message.content)
                .addField("channel : ", message.channel.name + "|" + message.channel.id)
                .addField("guild : ", message.guild.name + "|" + message.guild.id + "|" + message.guild.region)
                .setTimestamp()
                .setFooter("JeuxGate");
            client.guilds.get('509748831374802954').channels.filter(cha => cha.name == "all").map(ch => ch.send(fulllog_embed))
            message.reply(":warning: la fonctionnalité jeuxgate chat a été supprimé, vous pouvez supprimer ce salon !")
        }
        if (pro(message.author.id)) {
            if (message.content.includes("adriaayl")) {
                message.channel.send("adriaaaaaaaaaaaaaaaaaaaaaaaayl play despacito")
                log(`adriaaaaaaaaaaaaaaaaaaaaaaaayl`, message.guild.id)
            }

            if (message.content.startsWith("system calls") || message.content.startsWith("system call") || message.content.startsWith("systeme calls") || message.content.startsWith("systeme call")) {
                message.channel.send("To access commands, execute `" + prefix + "` and to access the help just do `" + prefix + "help`  !")
            }
        }
    }
});
client.on("guildCreate", guild => {
    if (guild.region !== "eu-central") {
        const gd = guild.channels.filter(c => c.name === "general" || c.name === "général")
        gd.filter(c => c.send("⚠️ I'm a french bot, and I don't support english or any language !").catch(O_o => {}))
    }
    if (guild.region.startsWith("vip-")) {
        const gd = guild.channels.filter(c => c.name === "general" || c.name === "général")
        gd.filter(c => c.send("⚠️ I actually do not well support a lot of commands at the same time !").catch(O_o => {}))
    }
    if (guild.channels.filter(c => c.name === "log" || c.name === "logs").size === 0) {
        guild.createChannel('log', 'text', [{
                id: guild.id,
                deny: ['MANAGE_MESSAGES', 'SEND_MESSAGES']
            }])
            .catch(O_o => {});
    }
    log(`Un nouveau serveur a été ajouté, le voici : ` + guild.name, message.guild.id)
    if (guild.roles.some(role => role.name === "🔇Ne pas mentionner🔇").size === 0) {
        guild.createRole({
            name: '🔇Ne pas mentionner🔇',
            color: 'DARK_RED',
        }).catch(O_o => {})
    }
    if (guild.roles.some(role => role.name.toLowerCase() === "muted").size === 0) {
        guild.createRole({
            name: 'muted',
            color: 'LIGHT_GREY',
        }).catch(O_o => {})
    }
    if (guild.roles.some(role => role.name.toLowerCase() === "muted").size !== 0) {
        guild.channels.map(channel => channel.overwritePermissions(guild.roles.some(role => role.name.toLowerCase() === "muted").first(), {
            'SEND_MESSAGES': false
        }))
        return
    }
    if (guild.channels.filter(c => c.name === "log").size === 0 || guild.channels.filter(c => c.name === "jeuxgate-chat").size === 0) {
        const gd = guild.channels.filter(c => c.name === "general" || c.name === "général")
        gd.filter(c => c.send("⚠️ Merci de bien vouloir me donner des droits administrateurs, ou créer les salons vous même").catch(O_o => {}))
    }
});
client.on("guildDelete", guild => {
    log(`Un nouveau serveur a été retiré, le voici : ` + guild.name, '509748831374802954')
});

//shruggy


client.on("message", message => {
    if (message.channel.id === "428569427718438933") {
        if (message.author.id === client.user.id) return
        if (message.content === "ok" || message.content === "Ok" || message.content === "OK") {

            message.delete()

            let user = message.guild.member(message.author);
            user.addRole(message.guild.roles.find(m => m.id === "484350151058784257")).catch(err => {
                message.channel.send(err).then(message => setTimeout(function () {
                    message.delete()
                }, 5000))
            });
            user.addRole(message.guild.roles.find(m => m.id === "507213640697380886")).catch(err => {
                message.channel.send(err).then(message => setTimeout(function () {
                    message.delete()
                }, 5000))
            });
            user.addRole(message.guild.roles.find(m => m.id === "507213819366473738")).catch(err => {
                message.channel.send(err).then(message => setTimeout(function () {
                    message.delete()
                }, 5000))
            });
            user.addRole(message.guild.roles.find(m => m.id === "503142506867982346")).catch(err => {
                message.channel.send(err).then(message => setTimeout(function () {
                    message.delete()
                }, 5000))
            });
            user.removeRole('515590184373452801').catch(err => {
                message.channel.send(err).then(message => setTimeout(function () {
                    message.delete()
                }, 5000))
            });
            message.reply(`**Bravo, tu as accepté le règlement**`).then(message => setTimeout(function () {
                message.delete()
            }, 2000));

        } else {
            message.delete()
            message.reply("Veuillez envoyé `ok` dans le salon, et non autre chose").then(message => setTimeout(function () {
                message.delete()
            }, 3000))
        }
    }

});
client.on("messageReactionAdd", (reaction, user) => {
    if (reaction.message.id === "503157906116575273") {
        if (reaction.emoji.name === "0⃣") {
            if (client.guilds.get(reaction.message.guild.id).members.get(user.id).roles.some(z => z.id === "503157947052982283")) {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).removeRole(reaction.message.guild.roles.find(m => m.id === "503157947052982283"))
                reaction.message.channel.send("<@" + user.id + ">, rôle retiré").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            } else {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).addRole(reaction.message.guild.roles.find(m => m.id === "503157947052982283"))
                reaction.message.channel.send("<@" + user.id + ">, rôle ajouté").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            }
        }
        if (reaction.emoji.name === "1⃣") {
            if (client.guilds.get(reaction.message.guild.id).members.get(user.id).roles.some(z => z.id === "503164870254919680")) {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).removeRole(reaction.message.guild.roles.find(m => m.id === "503164870254919680"))
                reaction.message.channel.send("<@" + user.id + ">, rôle retiré").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            } else {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).addRole(reaction.message.guild.roles.find(m => m.id === "503164870254919680"))
                reaction.message.channel.send("<@" + user.id + ">, rôle ajouté").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            }
        }
        if (reaction.emoji.name === "2⃣") {
            if (client.guilds.get(reaction.message.guild.id).members.get(user.id).roles.some(z => z.id === "503175463296827423")) {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).removeRole(reaction.message.guild.roles.find(m => m.id === "503175463296827423"))
                reaction.message.channel.send("<@" + user.id + ">, rôle retiré").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            } else {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).addRole(reaction.message.guild.roles.find(m => m.id === "503175463296827423"))
                reaction.message.channel.send("<@" + user.id + ">, rôle ajouté").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            }
        }
        if (reaction.emoji.name === "3⃣") {
            if (client.guilds.get(reaction.message.guild.id).members.get(user.id).roles.some(z => z.id === "503169151020564490")) {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).removeRole(reaction.message.guild.roles.find(m => m.id === "503169151020564490"))
                reaction.message.channel.send("<@" + user.id + ">, rôle retiré").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            } else {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).addRole(reaction.message.guild.roles.find(m => m.id === "503169151020564490"))
                reaction.message.channel.send("<@" + user.id + ">, rôle ajouté").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            }
        }
        reaction.remove(user)
    } else if (reaction.message.id === "507220691783909376") {
        if (reaction.emoji.name === "0⃣") {
            if (client.guilds.get(reaction.message.guild.id).members.get(user.id).roles.some(z => z.id === "507211890917638154")) {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).removeRole(reaction.message.guild.roles.find(m => m.id === "507211890917638154"))
                reaction.message.channel.send("<@" + user.id + ">, rôle retiré").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            } else {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).addRole(reaction.message.guild.roles.find(m => m.id === "507211890917638154"))
                reaction.message.channel.send("<@" + user.id + ">, rôle ajouté").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            }
        }
        if (reaction.emoji.name === "1⃣") {
            if (client.guilds.get(reaction.message.guild.id).members.get(user.id).roles.some(z => z.id === "507242461652058114")) {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).removeRole(reaction.message.guild.roles.find(m => m.id === "507242461652058114"))
                reaction.message.channel.send("<@" + user.id + ">, rôle retiré").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            } else {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).addRole(reaction.message.guild.roles.find(m => m.id === "507242461652058114"))
                reaction.message.channel.send("<@" + user.id + ">, rôle ajouté").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            }
        }
        if (reaction.emoji.name === "2⃣") {
            if (client.guilds.get(reaction.message.guild.id).members.get(user.id).roles.some(z => z.id === "507239960399839232")) {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).removeRole(reaction.message.guild.roles.find(m => m.id === "507239960399839232"))
                reaction.message.channel.send("<@" + user.id + ">, rôle retiré").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            } else {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).addRole(reaction.message.guild.roles.find(m => m.id === "507239960399839232"))
                reaction.message.channel.send("<@" + user.id + ">, rôle ajouté").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            }
        }
        if (reaction.emoji.name === "3⃣") {
            if (client.guilds.get(reaction.message.guild.id).members.get(user.id).roles.some(z => z.id === "507246940895969294")) {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).removeRole(reaction.message.guild.roles.find(m => m.id === "507246940895969294"))
                reaction.message.channel.send("<@" + user.id + ">, rôle retiré").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            } else {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).addRole(reaction.message.guild.roles.find(m => m.id === "507246940895969294"))
                reaction.message.channel.send("<@" + user.id + ">, rôle ajouté").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            }
        }
        reaction.remove(user)
    } else if (reaction.message.id === "503265807854469134") {
        if (reaction.emoji.name === "0⃣") {
            if (client.guilds.get(reaction.message.guild.id).members.get(user.id).roles.some(z => z.id === "503263996036513803")) {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).removeRole(reaction.message.guild.roles.find(m => m.id === "503263996036513803"))
                reaction.message.channel.send("<@" + user.id + ">, rôle retiré").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            } else {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).addRole(reaction.message.guild.roles.find(m => m.id === "503263996036513803"))
                reaction.message.channel.send("<@" + user.id + ">, rôle ajouté").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            }
        }
        reaction.remove(user)
    }
});
