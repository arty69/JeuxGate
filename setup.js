const fs = require('fs');
const log = require('./function/log.js')
exports.run = (start) =>{
    
    if(!fs.existsSync('./config/') ){
        fs.mkdirSync("./config/")
    }
    fs.writeFileSync(`./config/now`, `${start}`)
    if(!fs.existsSync('./config/log/') ){
        fs.mkdirSync("./config/log/")
    }
    if(!fs.existsSync('./config/metric/') ){
        fs.mkdirSync("./config/metric/")
    }

    fs.writeFileSync("./config/metric/service", '0')
    fs.writeFileSync("./config/metric/commande", '0')

    if(!fs.existsSync('./config/lvl.json') ){
        fs.writeFileSync('./config/lvl.json', "{\"0\": 0,\"1\": 20}")
    }
    if(!fs.existsSync('./config/guild/') ){
        fs.mkdirSync("./config/guild/")
    }
    if(!fs.existsSync('./config/user/') ){
        fs.mkdirSync("./config/user/")
    }
    if(!fs.existsSync('./config/log/' + start+"/") ){
        fs.mkdirSync("./config/log/" + start+"/")
        log.log("[JeuxGate : index] Creating log folder.", "GLOBAL")
    }
} 