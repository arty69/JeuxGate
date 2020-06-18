const log = require('../../function/log.js')
const fs = require("fs")
const Discord = require('discord.js');

exports.run = async (oldMember, newMember, client) => {
    if (fs.existsSync("./config/guild/" + oldMember.guild.id + "/banned.jgform")){
        if(fs.readFileSync("./config/guild/" + oldMember.guild.id + "/banned.jgform", "utf-8") !== ""){
            
            return 
        }
    }else{
        if(fs.existsSync("./config/guild/" + oldMember.guild.id + "/")){
            fs.writeFileSync("./config/guild/" + oldMember.guild.id + "/banned.jgform", "")
        }else{
            fs.mkdirSync("./config/guild/" + oldMember.guild.id + "/")
            fs.writeFileSync("./config/guild/" + oldMember.guild.id + "/banned.jgform", "")
        }
    }
    if (oldMember.roles.cache.filter(ro => ro.name === "muted").size !== 0 && newMember.roles.cache.filter(ro => ro.name === "muted").size === 0){
        const fetchedLogs = await oldMember.guild.fetchAuditLogs({
            limit: 1,
            type: 'MEMBER_ROLE_UPDATE',
        }).catch( O_o => {
            log("[JeuxGate : EAnti self Démute] filed to get audit logs from " + oldMember.guild.name + "-" + oldMember.guild.id, "anti self demute", oldMember.guild.id + "/auto")
        })
        const roles = fetchedLogs.entries.first();

        if (!roles) return console.log("failed to get auditlog")

        const { executor, target } = roles;

        if (target.id === oldMember.id) {
            if (executor.id === oldMember.id){
                if (newMember.guild.roles.cache.filter (ro => ro.name === "muted").size !== 0) newMember.roles.add(newMember.guild.roles.cache.filter (ro => ro.name === "muted").first(), "Tentative de self-démute.")
                oldMember.user.send(" **Hey ...** ne tente pas de t'unmute tout seul (sur "+oldMember.guild.name+"), attend que quelqu'un d'autre te démute ....").catch(()=> {
                    oldMember.guild.systemChannel.send("<@!"+ oldMember.id +"> **Hey ...** ne tente pas de t'unmute tout seul, attend que quelqu'un d'autre te démute ....").then(mess => {
                        setTimeout(()=> {
                            mess.delete({reason: "Message à autodestruction."})
                        }, 10000)
                    })
                })
            }
        } 
    }
}