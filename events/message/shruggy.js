exports.run = (message, client) => {
    if (message.channel.id === "428569427718438933") {
        if (message.author.id === client.user.id) return
        if (message.content.toLowerCase() === "ok") {

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
}