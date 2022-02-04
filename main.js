var nodeManager = require("./nodeManager.js")
var socketApi = require("./SocketApi.js")
var frontendApi = require("./frontendApi.js")
var hng = require("./HTMLNodeGen")
const fs = require('fs');
let nM =new  nodeManager( socketApi(hng),frontendApi())
const load=()=>{
    let data = fs.readFileSync("save.json",{encoding:'utf8', flag:'r'})

    nM.load(JSON.parse(data).nodes)

}
if (fs.existsSync("save.json")) {
    load()
}