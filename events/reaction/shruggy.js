exports.run = async (reaction, user) => {
    if (reaction.message.id === "503157906116575273") {
        if (reaction.emoji.name === "0⃣") {
            if (message.client.guilds.cache.get(reaction.message.guild.id).members.cache.get(user.id).roles.cache.some(z => z.id === "503157947052982283")) {
                message.client.guilds.cache.get(reaction.message.guild.id).members.cache.get(user.id).roles.remove(reaction.message.guild.roles.cache.find(m => m.id === "503157947052982283"))
                reaction.message.channel.send("<@!" + user.id + ">, rôle retiré").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            } else {
                message.client.guilds.cache.get(reaction.message.guild.id).members.cache.get(user.id).roles.add(reaction.message.guild.roles.cache.find(m => m.id === "503157947052982283"))
                reaction.message.channel.send("<@!" + user.id + ">, rôle ajouté").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            }
        }
        if (reaction.emoji.name === "1⃣") {
            if (message.client.guilds.cache.get(reaction.message.guild.id).members.cache.get(user.id).roles.cache.some(z => z.id === "503164870254919680")) {
                message.client.guilds.cache.get(reaction.message.guild.id).members.cache.get(user.id).roles.remove(reaction.message.guild.roles.cache.find(m => m.id === "503164870254919680"))
                reaction.message.channel.send("<@!" + user.id + ">, rôle retiré").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            } else {
                message.client.guilds.cache.get(reaction.message.guild.id).members.cache.get(user.id).roles.add(reaction.message.guild.roles.cache.find(m => m.id === "503164870254919680"))
                reaction.message.channel.send("<@!" + user.id + ">, rôle ajouté").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            }
        }
        if (reaction.emoji.name === "2⃣") {
            if (message.client.guilds.cache.get(reaction.message.guild.id).members.cache.get(user.id).roles.cache.some(z => z.id === "503175463296827423")) {
                message.client.guilds.cache.get(reaction.message.guild.id).members.cache.get(user.id).roles.remove(reaction.message.guild.roles.cache.find(m => m.id === "503175463296827423"))
                reaction.message.channel.send("<@!" + user.id + ">, rôle retiré").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            } else {
                message.client.guilds.cache.get(reaction.message.guild.id).members.cache.get(user.id).roles.add(reaction.message.guild.roles.cache.find(m => m.id === "503175463296827423"))
                reaction.message.channel.send("<@!" + user.id + ">, rôle ajouté").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            }
        }
        if (reaction.emoji.name === "3⃣") {
            if (message.client.guilds.cache.get(reaction.message.guild.id).members.cache.get(user.id).roles.cache.some(z => z.id === "503169151020564490")) {
                message.client.guilds.cache.get(reaction.message.guild.id).members.cache.get(user.id).roles.remove(reaction.message.guild.roles.cache.find(m => m.id === "503169151020564490"))
                reaction.message.channel.send("<@!" + user.id + ">, rôle retiré").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            } else {
                message.client.guilds.cache.get(reaction.message.guild.id).members.cache.get(user.id).roles.add(reaction.message.guild.roles.cache.find(m => m.id === "503169151020564490"))
                reaction.message.channel.send("<@!" + user.id + ">, rôle ajouté").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            }
        }
        reaction.remove(user)
    } else if (reaction.message.id === "507220691783909376") {
        if (reaction.emoji.name === "0⃣") {
            if (message.client.guilds.cache.get(reaction.message.guild.id).members.cache.get(user.id).roles.cache.some(z => z.id === "507211890917638154")) {
                message.client.guilds.cache.get(reaction.message.guild.id).members.cache.get(user.id).roles.remove(reaction.message.guild.roles.cache.find(m => m.id === "507211890917638154"))
                reaction.message.channel.send("<@!" + user.id + ">, rôle retiré").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            } else {
                message.client.guilds.cache.get(reaction.message.guild.id).members.cache.get(user.id).roles.add(reaction.message.guild.roles.cache.find(m => m.id === "507211890917638154"))
                reaction.message.channel.send("<@!" + user.id + ">, rôle ajouté").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            }
        }
        if (reaction.emoji.name === "1⃣") {
            if (message.client.guilds.cache.get(reaction.message.guild.id).members.cache.get(user.id).roles.cache.some(z => z.id === "507242461652058114")) {
                message.client.guilds.cache.get(reaction.message.guild.id).members.cache.get(user.id).roles.remove(reaction.message.guild.roles.cache.find(m => m.id === "507242461652058114"))
                reaction.message.channel.send("<@!" + user.id + ">, rôle retiré").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            } else {
                message.client.guilds.cache.get(reaction.message.guild.id).members.cache.get(user.id).roles.add(reaction.message.guild.roles.cache.find(m => m.id === "507242461652058114"))
                reaction.message.channel.send("<@!" + user.id + ">, rôle ajouté").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            }
        }
        if (reaction.emoji.name === "2⃣") {
            if (message.client.guilds.cache.get(reaction.message.guild.id).members.cache.get(user.id).roles.cache.some(z => z.id === "507239960399839232")) {
                message.client.guilds.cache.get(reaction.message.guild.id).members.cache.get(user.id).roles.remove(reaction.message.guild.roles.cache.find(m => m.id === "507239960399839232"))
                reaction.message.channel.send("<@!" + user.id + ">, rôle retiré").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            } else {
                message.client.guilds.cache.get(reaction.message.guild.id).members.cache.get(user.id).roles.add(reaction.message.guild.roles.cache.find(m => m.id === "507239960399839232"))
                reaction.message.channel.send("<@!" + user.id + ">, rôle ajouté").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            }
        }
        if (reaction.emoji.name === "3⃣") {
            if (message.client.guilds.cache.get(reaction.message.guild.id).members.cache.get(user.id).roles.cache.some(z => z.id === "507246940895969294")) {
                message.client.guilds.cache.get(reaction.message.guild.id).members.cache.get(user.id).roles.remove(reaction.message.guild.roles.cache.find(m => m.id === "507246940895969294"))
                reaction.message.channel.send("<@!" + user.id + ">, rôle retiré").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            } else {
                message.client.guilds.cache.get(reaction.message.guild.id).members.cache.get(user.id).roles.add(reaction.message.guild.roles.cache.find(m => m.id === "507246940895969294"))
                reaction.message.channel.send("<@!" + user.id + ">, rôle ajouté").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            }
        }
        reaction.remove(user)
    } else if (reaction.message.id === "503265807854469134") {
        if (reaction.emoji.name === "0⃣") {
            if (message.client.guilds.cache.get(reaction.message.guild.id).members.cache.get(user.id).roles.cache.some(z => z.id === "503263996036513803")) {
                message.client.guilds.cache.get(reaction.message.guild.id).members.cache.get(user.id).roles.remove(reaction.message.guild.roles.cache.find(m => m.id === "503263996036513803"))
                reaction.message.channel.send("<@!" + user.id + ">, rôle retiré").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            } else {
                message.client.guilds.cache.get(reaction.message.guild.id).members.cache.get(user.id).roles.add(reaction.message.guild.roles.cache.find(m => m.id === "503263996036513803"))
                reaction.message.channel.send("<@!" + user.id + ">, rôle ajouté").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            }
        }
        reaction.remove(user)
    }
};
