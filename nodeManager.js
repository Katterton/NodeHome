var Node = require("./Node.js")
const UDPled = require("./UDPled.js")
const Ambi = require("./ambi.js")





const NODECONFIG = {    UDPLED : {
        name: "UDPLed",
        input: [
            {name:"Color", type : "ledArray", id:0, var: "data"}
        ],
        output: [
            //{name:"WIP Status", type : "number", id:0}
        ],
        args: [
            {name:"IP",var: "ip", type : "String", value:"182.168.1.100"},
            {name:"Port", var:"port", type : "number", value:80},
            {name:"numLeds", var: "num_leds", type : "number", value: 90}
        ],
        func : UDPled
    },
    AMBI : {
        name: "Ambi",
        input: [

        ],
        output: [
            {name:"Color", type : "ledArray", id:0}
        ],
        args: [
            {name:"Screen",var: "display", type : "number", value:1},
            {name:"FPS", var:"fps", type : "number", value:20},
            {name:"numPanel", var: "num_panel", type : "number", value: 90}
        ],
        func : Ambi
    }


}



class NodeManager{

    constructor(SocketApi) {
        this.idc=0
        this.nodes={}
        this.socketApi = SocketApi
        this.socketApi.nodeManager=this
    }
    addNode(msg){
        let conf = NODECONFIG[msg.name]
        this.nodes[this.idc+conf.name]= new Node(conf.name,conf.input, conf.output, conf.args, conf.func)
        this.nodes[this.idc+conf.name].id=this.idc
        this.socketApi.update()
        this.idc++
    }
    deleteNode(){

    }




}
module.exports=NodeManager