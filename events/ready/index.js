const log = require('../../function/log.js')
const Discord = require('discord.js');
const io = require('@pm2/io')
const fs = require("fs")
const service = io.metric({
    name: 'service',
    type: 'histogram',
    measurement: 'p75'
});
const commandes = io.metric({
    name: 'commandes',
    type: 'histogram',
    measurement: 'p75'
});
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
            name: `ping potentiellement élevé`,
            type: `WATCHING`
        },
        status: 'dnd'
    });
    
    process.send('ready');
    
    var statut = [
        `${client.guilds.cache.array().length} serveurs | ${client.users.cache.filter(u => !u.bot).size} utilisateurs`,
        `être fait par jéhèndé#2054`,
        "le site : https://jeuxgate-priv.herokuapp.com/"
    ];
    var view = [
        `WATCHING`,
        `WATCHING`,
        `PLAYING`,
        `WATCHING`
    ];

    service.set(parseInt(fs.readFileSync("./config/metric/service", 'utf-8')))
    commandes.set(parseInt(fs.readFileSync("./config/metric/commande", 'utf-8')))

    setInterval(function () {


        service.set(parseInt(fs.readFileSync("./config/metric/service", 'utf-8')))
    
        commandes.set(parseInt(fs.readFileSync("./config/metric/commande", 'utf-8')))
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