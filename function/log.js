const fs = require('fs');

exports.log = (log, file, dir) => {
    if (!log) return
    let ts = Date.now();
    let date_ob = new Date(ts);
    start = fs.readFileSync('./config/now', "utf-8")
    if (!file) file = "GLOBAL"
    if(!dir) dir = start +"/GLOBAL"
    var form = date_ob.getHours() + ":" + date_ob.getMinutes()
    if(file !== "GLOBAL" && dir !== start + "/GLOBAL"){
        if(!fs.existsSync('./config/log/GLOBAL/')){
            fs.mkdirSync('./config/log/GLOBAL/')
        }
        
        if(!fs.existsSync('./config/log/GLOBAL/GLOBAL.log') ){
            fs.writeFileSync(`./config/log/GLOBAL/GLOBAL.log`, `${form} [JeuxGate : logs] creating log file\r\n${form} ${log}`)
        }else{
            fs.writeFileSync(`./config/log/GLOBAL/GLOBAL.log`, fs.readFileSync(`./config/log/GLOBAL/GLOBAL.log`, "utf-8") + "\r\n" + form +" "+ log, "utf-8")
        }

    }
    if(!fs.existsSync('./config/log/' + dir + '/')){
        if((dir+"").split("/").length <= 1){
            fs.mkdirSync('./config/log/' + dir + '/')
        }else{
            var nowdir = ""
            dir.split("/").forEach(u => {
                if(!fs.existsSync("./config/log/" + nowdir + u + "/")) fs.mkdirSync("./config/log/" + nowdir + u + "/")
                
                nowdir = nowdir + u + "/" 
            })
        }
    }
    if(!fs.existsSync('./config/log/'  + dir + "/" + file + '.log') ){
        fs.writeFileSync(`./config/log/${dir}/${file}.log`, `${form} [JeuxGate : logs] creating log file\r\n${form} ${log}`)
    }else{
        fs.writeFileSync(`./config/log/${dir}/${file}.log`, fs.readFileSync(`./config/log/${dir}/${file}.log`, "utf-8") + "\r\n" + form +" "+ log, "utf-8")
    }
}