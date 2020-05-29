const fs = require('fs');
jgnb = JSON.parse(fs.readFileSync('jgnb.json', 'utf-8'));

exports.run = async (message, client) => {
    if (message.channel.id === "517373451577589781") {
        if (message.author.id === client.user.id) return
        if(jgnb[message.author.id].number === "banned"){
            message.author.send(":warning: Vous avez été banni définitivement du serveur, vous avez aussi été report à l'équipe de sécurité Jeuxgate.").then(y => {
                message.guild.members.filter(u => u.id === message.author.id).first().ban("3 délit de règles")
                client.guilds.filter(g => g.id == "517372982268657684").first().channels.filter(c => c.id == "652599989691875368").first().send("Mesure de sécurité : ban " + message.author.username + "\r\nTrop de tentative pour accepter les règles")
            }).catch(y => {
                message.guild.members.filter(u => u.id === message.author.id).first().ban("3 délit de règles")
                client.guilds.filter(g => g.id == "517372982268657684").first().channels.filter(c => c.id == "652599989691875368").first().send("Mesure de sécurité : ban " + message.author.username + "\r\nTrop de tentative pour accepter les règles")
            })
        }
        if (message.content.toLowerCase() === "ok") {

            message.delete().catch(z =>{})

            let user = message.guild.member(message.author);
            user.addRole(message.guild.roles.find(m => m.id === "517373542560432142")).catch(err => {
                message.channel.send(err).then(message => setTimeout(function () {
                    message.delete()
                }, 5000))
            });
            message.reply(`**Bravo, tu as accepté le règlement**`).then(message => setTimeout(function () {
                message.delete().catch(z =>{})
            }, 2000));

        } else {
            if(jgnb[message.author.id].number === "3"){
                message.author.send(":warning: Vous avez été banni définitivement du serveur, vous avez aussi été report à l'équipe de sécurité Jeuxgate.").then(y => {
                    message.guild.members.filter(u => u.id === message.author.id).first().ban("3 délit de règles")
                    client.guilds.filter(g => g.id == "517372982268657684").first().channels.filter(c => c.id == "652599989691875368").first().send("Mesure de sécurité : ban " + message.author.username + "\r\nTrop de tentative pour accepter les règles")
                }).catch(y => {
                    message.guild.members.filter(u => u.id === message.author.id).first().ban("3 délit de règles")
                    client.guilds.filter(g => g.id == "517372982268657684").first().channels.filter(c => c.id == "652599989691875368").first().send("Mesure de sécurité : ban " + message.author.username + "\r\nTrop de tentative pour accepter les règles")
                })
                jgnb[message.author.id] = {
                    number: "banned"
                }
                
                fs.writeFile('jgnb.json', JSON.stringify(jgnb), err =>{
                    if(!err) return 
                    message.channel.send(err).then(message => setTimeout(function () {
                        message.delete().catch(z =>{})
                    }, 5000))
                })
            }
            if(message.mentions.size !== 0){
                message.author.send(":warning: Vous avez été kick du serveur à cause de vôtre non co-opération, vous pouvez re-rejoindre, de plus vous avez mentionné quelqu'un, **mais sachez une chose, la prochaine fois, un bannissement permanent sera établit.**").then(y => {
                    message.guild.members.filter(u => u.id === message.author.id).first().kick("2 délit de règles")
                }).catch(y => {
                    message.guild.members.filter(u => u.id === message.author.id).first().kick("2 délit de règles")
                })
                jgnb[message.author.id] = {
                    number: "3"
                }
                    
                fs.writeFile('jgnb.json', JSON.stringify(jgnb), err =>{
                    if(!err) return 
                    message.channel.send(err).then(message => setTimeout(function () {
                        message.delete().catch(z =>{})
                    }, 5000))
                })
            }
            if(!jgnb[message.author.id]){
                jgnb[message.author.id] = {
                    number: "1"
                }
                    
                fs.writeFile('jgnb.json', JSON.stringify(jgnb), err =>{
                    if(!err) return 
                    message.channel.send(err).then(message => setTimeout(function () {
                        message.delete().catch(z =>{})
                    }, 5000))
                })
            }else{
                if(jgnb[message.author.id].number === "2"){
                    message.author.send(":warning: Vous avez été kick du serveur à cause de vôtre non co-opération, vous pouvez re-rejoindre, **mais sachez une chose, la prochaine fois, un bannissement permanent sera établit.**").then(y => {
                        message.guild.members.filter(u => u.id === message.author.id).first().kick("2 délit de règles")
                    }).catch(y => {
                        message.guild.members.filter(u => u.id === message.author.id).first().kick("2 délit de règles")
                    })
                    jgnb[message.author.id] = {
                        number: "3"
                    }
                    
                    fs.writeFile('jgnb.json', JSON.stringify(jgnb), err =>{
                        if(!err) return 
                        message.channel.send(err).then(message => setTimeout(function () {
                            message.delete().catch(z =>{})
                        }, 5000))
                    })
                }else if(jgnb[message.author.id].number === "1"){
                    jgnb[message.author.id] = {
                        number: "2"
                    }
                    
                    fs.writeFile('jgnb.json', JSON.stringify(jgnb), err =>{
                        if(!err) return 
                        message.channel.send(err).then(message => setTimeout(function () {
                            message.delete().catch(z =>{})
                        }, 5000))
                    })
                }
            }
        
            message.delete().catch(z =>{})

            message.reply("Veuillez envoyé `ok` dans le salon, et non autre chose").then(message => setTimeout(function () {
                message.delete().catch(z =>{})
            }, 3000))
        }
    }

};