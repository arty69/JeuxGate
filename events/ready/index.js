const log = require('../../function/log.js')
const Discord = require('discord.js');
exports.run = (client) =>{
    log.log(`[JeuxGate : ready] connecté : ${client.user.tag}!`, "GLOBAL")

    const fulllog_embed = new Discord.MessageEmbed()
        .setColor(`RANDOM`)
        .addField("launch time : ", Date.now())
        .addField("guilds : ", client.guilds.cache.size)
        .addField("users : ", client.users.cache.size)
        .setTimestamp()
        .setFooter("JeuxGate");
    client.guilds.cache.get('509748831374802954').channels.cache.filter(cha => cha.name == "launching").map(ch => ch.send(fulllog_embed))

    client.user.setPresence({
        game: {
            name: `⚠️ ping potentiellement élevé`,
            type: `WATCHING`
        },
        status: 'dnd'
    });
    setInterval(function () {

        var statut = [
            `⚠️ ${client.guilds.cache.array().length} serveurs | ${client.users.cache.filter(u => !u.bot).size} utilisateurs`,
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
            activity: {
                name: statut[random],
                type: view[random]
            },
            status: 'dnd'
        });
    }, 15000);
}