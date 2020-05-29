const log = require('../../function/log.js')
const Discord = require('discord.js');
exports.run = (client) =>{
    log.log(`[JeuxGate : ready] connecté : ${client.user.tag}!`, "GLOBAL")

    const fulllog_embed = new Discord.RichEmbed()
        .setColor(`RANDOM`)
        .addField("launch time : ", Date.now())
        .addField("guilds : ", client.guilds.size)
        .addField("users : ", client.users.size)
        .setTimestamp()
        .setFooter("JeuxGate");
    client.guilds.get('509748831374802954').channels.filter(cha => cha.name == "launching").map(ch => ch.send(fulllog_embed))

    client.user.setPresence({
        game: {
            name: `⚠️ ping potentiellement élevé`,
            type: `WATCHING`
        },
        status: 'dnd'
    });
    setInterval(function () {

        var statut = [
            `⚠️ ${client.guilds.array().length} serveurs | ${client.users.filter(u => !u.bot).size} utilisateurs`,
            `⚠️ être fait par jéhèndé#2054`,
            "⚠️ le site : https://jeuxgate-priv.herokuapp.com/"
        ];
        var view = [
            `WATCHING`,
            `WATCHING`,
            `PLAYING`,
            `WATCHING`
        ];

        var random = Math.floor(Math.random() * (statut.length));

        client.user.setPresence({
            game: {
                name: statut[random],
                type: view[random]
            },
            status: 'dnd'
        });
    }, 15000);
}