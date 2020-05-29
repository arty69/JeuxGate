exports.run = async (reaction, user, client) => {
    if (reaction.message.id === "503157906116575273") {
        if (reaction.emoji.name === "0⃣") {
            if (client.guilds.get(reaction.message.guild.id).members.get(user.id).roles.some(z => z.id === "503157947052982283")) {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).removeRole(reaction.message.guild.roles.find(m => m.id === "503157947052982283"))
                reaction.message.channel.send("<@!" + user.id + ">, rôle retiré").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            } else {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).addRole(reaction.message.guild.roles.find(m => m.id === "503157947052982283"))
                reaction.message.channel.send("<@!" + user.id + ">, rôle ajouté").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            }
        }
        if (reaction.emoji.name === "1⃣") {
            if (client.guilds.get(reaction.message.guild.id).members.get(user.id).roles.some(z => z.id === "503164870254919680")) {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).removeRole(reaction.message.guild.roles.find(m => m.id === "503164870254919680"))
                reaction.message.channel.send("<@!" + user.id + ">, rôle retiré").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            } else {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).addRole(reaction.message.guild.roles.find(m => m.id === "503164870254919680"))
                reaction.message.channel.send("<@!" + user.id + ">, rôle ajouté").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            }
        }
        if (reaction.emoji.name === "2⃣") {
            if (client.guilds.get(reaction.message.guild.id).members.get(user.id).roles.some(z => z.id === "503175463296827423")) {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).removeRole(reaction.message.guild.roles.find(m => m.id === "503175463296827423"))
                reaction.message.channel.send("<@!" + user.id + ">, rôle retiré").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            } else {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).addRole(reaction.message.guild.roles.find(m => m.id === "503175463296827423"))
                reaction.message.channel.send("<@!" + user.id + ">, rôle ajouté").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            }
        }
        if (reaction.emoji.name === "3⃣") {
            if (client.guilds.get(reaction.message.guild.id).members.get(user.id).roles.some(z => z.id === "503169151020564490")) {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).removeRole(reaction.message.guild.roles.find(m => m.id === "503169151020564490"))
                reaction.message.channel.send("<@!" + user.id + ">, rôle retiré").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            } else {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).addRole(reaction.message.guild.roles.find(m => m.id === "503169151020564490"))
                reaction.message.channel.send("<@!" + user.id + ">, rôle ajouté").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            }
        }
        reaction.remove(user)
    } else if (reaction.message.id === "507220691783909376") {
        if (reaction.emoji.name === "0⃣") {
            if (client.guilds.get(reaction.message.guild.id).members.get(user.id).roles.some(z => z.id === "507211890917638154")) {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).removeRole(reaction.message.guild.roles.find(m => m.id === "507211890917638154"))
                reaction.message.channel.send("<@!" + user.id + ">, rôle retiré").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            } else {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).addRole(reaction.message.guild.roles.find(m => m.id === "507211890917638154"))
                reaction.message.channel.send("<@!" + user.id + ">, rôle ajouté").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            }
        }
        if (reaction.emoji.name === "1⃣") {
            if (client.guilds.get(reaction.message.guild.id).members.get(user.id).roles.some(z => z.id === "507242461652058114")) {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).removeRole(reaction.message.guild.roles.find(m => m.id === "507242461652058114"))
                reaction.message.channel.send("<@!" + user.id + ">, rôle retiré").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            } else {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).addRole(reaction.message.guild.roles.find(m => m.id === "507242461652058114"))
                reaction.message.channel.send("<@!" + user.id + ">, rôle ajouté").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            }
        }
        if (reaction.emoji.name === "2⃣") {
            if (client.guilds.get(reaction.message.guild.id).members.get(user.id).roles.some(z => z.id === "507239960399839232")) {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).removeRole(reaction.message.guild.roles.find(m => m.id === "507239960399839232"))
                reaction.message.channel.send("<@!" + user.id + ">, rôle retiré").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            } else {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).addRole(reaction.message.guild.roles.find(m => m.id === "507239960399839232"))
                reaction.message.channel.send("<@!" + user.id + ">, rôle ajouté").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            }
        }
        if (reaction.emoji.name === "3⃣") {
            if (client.guilds.get(reaction.message.guild.id).members.get(user.id).roles.some(z => z.id === "507246940895969294")) {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).removeRole(reaction.message.guild.roles.find(m => m.id === "507246940895969294"))
                reaction.message.channel.send("<@!" + user.id + ">, rôle retiré").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            } else {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).addRole(reaction.message.guild.roles.find(m => m.id === "507246940895969294"))
                reaction.message.channel.send("<@!" + user.id + ">, rôle ajouté").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            }
        }
        reaction.remove(user)
    } else if (reaction.message.id === "503265807854469134") {
        if (reaction.emoji.name === "0⃣") {
            if (client.guilds.get(reaction.message.guild.id).members.get(user.id).roles.some(z => z.id === "503263996036513803")) {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).removeRole(reaction.message.guild.roles.find(m => m.id === "503263996036513803"))
                reaction.message.channel.send("<@!" + user.id + ">, rôle retiré").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            } else {
                client.guilds.get(reaction.message.guild.id).members.get(user.id).addRole(reaction.message.guild.roles.find(m => m.id === "503263996036513803"))
                reaction.message.channel.send("<@!" + user.id + ">, rôle ajouté").then(z => setTimeout(function () {
                    z.delete().catch(O_o => {})
                }, 5000))
            }
        }
        reaction.remove(user)
    }
};
