var nodeManager = require("./nodeManager.js")
var socketApi = require("./SocketApi.js")
var hng = require("./HTMLNodeGen")

let nM =new  nodeManager( socketApi(hng))
