exports.run = (message, client) => {
    if (message.channel.id === "664192345884983317") {
        if(message.author.id === "563995596021825536"){
            if(message.content.startsWith("bc")){
                message.delete()
                message.guild.channels.filter(ch => ch.id === "660774465650556929").first().send("**Un admin vient de tenter de ban un fonda : **\r\n " + message.content.substr(3))
            }
            if(message.content.startsWith("kc")){
                message.delete()
                message.guild.channels.filter(ch => ch.id === "660774465650556929").first().send("**Un admin vient de tenter de kick un fonda : **\r\n " + message.content.substr(3))
            }
            if(message.content.startsWith("kt")){
                message.delete()
                message.guild.channels.filter(ch => ch.id === "660774465650556929").first().send("**Un joueur (sans permission) vient de tenter de kick** \r\n" + message.content.substr(3))
            }
            if(message.content.startsWith("bt")){
                message.delete()
                message.guild.channels.filter(ch => ch.id === "660774465650556929").first().send("**Un joueur (sans permission) vient de tenter de ban** \r\n" + message.content.substr(3))
            }
            if(message.content.startsWith("o")){
                message.delete()
                message.guild.channels.filter(ch => ch.id === "660774465650556929").first().send("**Un joueur (ou admin) vient de tenter la commande op** \r\n" + message.content.substr(3) + " \r\n <@!278203663384576000>")
            }
            if(message.content.startsWith("bs")){
                message.delete()
                message.guild.channels.filter(ch => ch.id === "660774465650556929").first().send("**Un admin vient de ban ** \r\n" + message.content.substr(3) + " \r\n <@!278203663384576000>")
            }
            if(message.content.startsWith("ks")){
                message.delete()
                message.guild.channels.filter(ch => ch.id === "660774465650556929").first().send("**Un admin vient de kick ** \r\n" + message.content.substr(3))
            }
            if(message.content.startsWith("pla")){
                message.delete()
                if(!isNaN(message.content.substr(4))){
                    if(message.content.substr(4) != 1){
                        message.guild.channels.filter(ch => ch.id === "660883453654466560").first().setName(message.content.substr(4) + " Joueurs connectés")
                    }else{
                        message.guild.channels.filter(ch => ch.id === "660883453654466560").first().setName(message.content.substr(4) + " Joueur connecté")
                    }
                }else{
                    message.guild.channels.filter(ch => ch.id === "660883453654466560").first().setName("Erreur de syncronisation.")
                }
            }
            if(message.content.startsWith(":octagonal_sign: **Le serveur s'éteint**")){
                message.guild.channels.filter(ch => ch.id === "660883453654466560").first().setName("Serveur éteint")
            }
            if(message.content.startsWith("plo")){
                message.delete()
                message.guild.channels.filter(ch => ch.id === "660883453654466560").first().setName("0 Joueur connecté")
            }
        }
    }
}