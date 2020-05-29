const fs = require('fs');
exports.run = (guildid, userid) => {
    
    if (fs.existsSync("./config/guild/" + guildid + "/banned.jgform")){
        if(fs.readFileSync("./config/guild/" + guildid + "/banned.jgform", "utf-8") !== ""){
            return true
        }
    }else{
        if(fs.existsSync("./config/guild/" + guildid + "/")){
            fs.writeFileSync("./config/guild/" + guildid + "/banned.jgform", "")
        }else{
            fs.mkdirSync("./config/guild/" + guildid + "/")
            fs.writeFileSync("./config/guild/" + guildid + "/banned.jgform", "")
        }
    }

    if (fs.existsSync("./config/user/" + userid + "/banned.jgform")){
        if(fs.readFileSync("./config/user/" + userid + "/banned.jgform", "utf-8") !== ""){
            return true
        }
    }else{
        if(fs.existsSync("./config/user/" + userid + "/")){
            fs.writeFileSync("./config/user/" + userid + "/banned.jgform", "")
        }else{
            fs.mkdirSync("./config/user/" + userid + "/")
            fs.writeFileSync("./config/user/" + userid + "/banned.jgform", "")
        }
    }
    return false
}