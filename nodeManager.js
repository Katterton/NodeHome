var Node = require("./Node.js")
const UDPled = require("./UDPled.js")
const Ambi = require("./ambi.js")
const Beat = require("./Beat.js")




const NODECONFIG = {    UDPLED : {
        name: "UDPLed",
        input: [
            {name:"Color", type : "ledArray", id:0, var: "data"}
        ],
        output: [
            //{name:"WIP Status", type : "number", id:0}
        ],
        args: [
            {name:"IP",var: "ip", type : "String", value:"192.168.0.105"},
            {name:"Port", var:"port", type : "number", value:4210},
            {name:"numLeds", var: "num_leds", type : "number", value: 90}
        ],
        func : UDPled
    },
    BEAT : {
        name: "Beat",
        input: [

        ],
        output: [
            {name:"beat", type : "number", id:0}
            //{name:"WIP Status", type : "number", id:0}
        ],
        args: [
            {name:"Audio Device", var:"audio", type : "number", value:10},
            {name:"Sensitivity", var: "sensi", type : "number", value: 10}
        ],
        func : Beat
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
            {name:"numPanel", var: "num_panel", type : "number", value: 8}
        ],
        func : Ambi
    }


}



class NodeManager{

    constructor(SocketApi) {
        this.idc=0
        this.nodes={}
        this.connections=[]
        this.socketApi = SocketApi
        this.socketApi.nodeManager=this
    }
    addNode(msg){
        let conf = NODECONFIG[msg.name]
        this.nodes[this.idc+conf.name]= new Node(conf.name, conf.input, conf.output, conf.args, conf.func)
        this.nodes[this.idc+conf.name].id=this.idc
        this.socketApi.update()
        this.idc++
    }
    addConnection(con){
        this.connections.push(con)
        this.socketApi.addConnection(this.connections)
        let inp = {}, outp={}
        for(let key in this.nodes){
            if(this.nodes[key].id===parseInt(con.output.match(/\d+/g)[0])){
                if(this.nodes[key].func.start!==undefined){
                    this.nodes[key].func.start()

                }
             outp= this.nodes[key].output.find((x)=>(x.name===con.output.match(/[a-zA-Z]+/g)[0]))
            }
            if(this.nodes[key].id===parseInt(con.input.match(/\d+/g)[0])){
                inp= this.nodes[key].input.find((x)=>(x.name===con.input.match(/[a-zA-Z]+/g)[0]))
            }
        }
        inp.subscribe(outp)
    }
    deleteNode(){

    }
    getConfig(){
        return NODECONFIG
    }




}
module.exports=NodeManager