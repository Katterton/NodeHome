var Node = require("./Nodes.js")
const UDPled = require("./UDPled.js")
const Serialled = require("./SerialLed.js")

const fs = require('fs');
const Timer = require("./Timer.js")
const StaticLedColor = require("./StaticLedColor.js")
const ColorRange = require("./ColorRange.js")
const ColorRangeCrop = require("./ColorRangeCrop.js")
const ColorRangeCycle = require("./ColorRangeCylce.js")
const NODECONFIG = {    UDPLED : {
        name: "UDPLed",
        input: [
            {name:"Color", type : "ChromaScale", id:0, var: "data"}
        ],
        output: [
            //{name:"WIP Status", type : "number", id:0}
        ],
        args: [
            {name:"IP",var: "ip", type : "String", value:"192.168.0.105"},
            {name:"Port", var:"port", type : "number", value:4210},
            {name:"numLeds", var: "num_leds", type : "number", value: 70}
        ],
        func : UDPled
    },
    SERIALLED : {
        name: "SerialLed",
        input: [
            {name:"Color", type : "ChromaScale", id:0, var: "data"}
        ],
        output: [
            //{name:"WIP Status", type : "number", id:0}
        ],
        args: [
            {name:"Baudrate",var: "baudRate", type : "number", value:250000},
            {name:"Port", var:"port", type : "String", value:"COM4"},
            {name:"numLeds", var: "num_leds", type : "number", value: 70}
        ],
        func : Serialled
    },
    /*   BEAT : {
          name: "Beat",
          input: [

          ],
          output: [
              {name:"beat", type : "number", id:0}
              //{name:"WIP Status", type : "number", id:0}
          ],
          args: [
              {name:"AudioDevice", var:"audio_device", type : "number", value:10},
              {name:"Sensitivity", var: "sensitivity", type : "number", value: 10}
          ],
          func : ()=>(1)
      },
      BEATMIXER : {
          name: "BeatMixer",
          input: [
              {name:"Color", type : "ChromaScale", id:0, var: "data"},
              {name:"beat", type : "number", id:1, var: "beat"}
          ],
          output: [
              {name:"Color", type : "ChromaScale", id:0}
              //{name:"WIP Status", type : "number", id:0}
          ],
          args: [
              {name:"Factor", var:"fac", type : "number", value:10},

          ],
          func : BeatMixer
      },
     AMBI : {
          name: "Ambi",
          input: [

          ],
          output: [
              {name:"Color", type : "ChromaScale", id:0}
          ],
          args: [
              {name:"Screen",var: "display", type : "number", value:1},
              {name:"FPS", var:"fps", type : "number", value:20},
              {name:"numPanel", var: "num_panel", type : "number", value: 8}
          ],
          func : ""
      },*/
    STATICCOLOR : {
        name: "StaticLedColor",
        input: [

        ],
        output: [
            {name:"Color", type : "ChromaScale", id:0}
        ],
        args: [
            {name:"Red",var: "r", type : "number", value:1},
            {name:"Green", var:"g", type : "number", value:20},
            {name:"Blue", var: "b", type : "number", value: 8}
        ],
        func : StaticLedColor
    },
    COLORRANGE : {
        name: "ColorRange",
        input: [

        ],
        output: [
            {name:"Color", type : "ChromaScale", id:0}
        ],
        args: [
            {name:"RGBArray",var: "data", type : "ColorArray", value:"[[255,0,0],[0,255,0],[0,0,255]]"},

        ],
        func : ColorRange
    },
    COLORRANGECYCLE : {
        name: "ColorRangeCycle",
        input: [
            {name:"color", type : "ChromaScale", id:0, var: "data"}
        ],
        output: [
            {name:"Color", type : "ChromaScale", id:0}
        ],
        args: [
            {name:"Updates",var: "data", type : "number", value:10},
            {name:"Invert",var: "invert", type : "boolean", value: false},

        ],
        func : ColorRangeCycle
    },
    COLORRANGECROP : {
        name: "ColorRangeCrop",
        input: [
            {name:"color", type : "ChromaScale", id:0, var: "data"}
        ],
        output: [
            {name:"Color", type : "ChromaScale", id:0}
        ],
        args: [
            {name:"Width",var: "width", type : "number", value:100},
            {name:"Offset",var: "offset", type : "number", value: 0},
            {name:"Invert",var: "invert", type : "boolean", value: false},
        ],
        func : ColorRangeCrop
    },
    TIMER : {
        name: "Timer",
        input: [

        ],
        output: [
            {name:"sstart", type : "boolean", id:0}
        ],
        args: [

            {name:"Time",var: "time", type : "String", value: "11:00"},

        ],
        func : Timer
    },


}

const save = (data)=>{
    fs.writeFile("save.json",JSON.stringify( data), (err) => {
        if (err)
            console.log(err);
    })}

class NodeManager{

    constructor(SocketApi,name="test") {
        this.idc=0
        this.nodes={}
        this.connections=[]
        this.socketApi = SocketApi
        this.socketApi.nodeManager=this
        this.name=name
    }

    setRepository(rep){
        this.repository=rep
    }


    addNode(msg){
        let conf = NODECONFIG[msg.name]
        this.nodes[this.idc+conf.name]= new Node(conf.name, conf.input, conf.output, conf.args, conf.func)
        this.nodes[this.idc+conf.name].id=this.idc
        this.nodes[this.idc+conf.name].nodeManager=this
        this.nodes[this.idc+conf.name].key=this.idc+conf.name
        this.socketApi.update()
        this.idc++
        save(this.serialize())
    }
    addConnection(con){

        this.connections.push(con)
        this.socketApi.addConnection(this.connections)
        let inp = {}, outp={}
        for(let key in this.nodes){
            if(this.nodes[key].id===parseInt(con.output.match(/\d+/g)[0])){

             outp= this.nodes[key].output.find((x)=>(x.name===con.output.match(/[a-zA-Z]+/g)[0]))
            }

            if(this.nodes[key].id===parseInt(con.input.match(/\d+/g)[0])){
                inp= this.nodes[key].input.find((x)=>(x.name===con.input.match(/[a-zA-Z]+/g)[0]))
            }

        }

        inp.subscribe(outp)
        save(this.serialize())
    }
    removeConnection(con){
        this.connections.splice(this.connections.findIndex(x=>x===con),1)
        for(let key in this.nodes) {
            if (this.nodes[key].id === parseInt(con.input.match(/\d+/g)[0])) {
             this.nodes[key].input.find(x=>(x.name===con.input.substring(1) && x.io==="input")).unsubscribe()

            }
        }

        this.socketApi.update()
        save(this.serialize())
    }
    deleteNode(node){
       for(let key in this.nodes){

           if(this.nodes[key].id===parseInt(node.match(/\d+/g)[0])){
               this.nodes[key].remove()
               delete this.nodes[key]
               this.socketApi.update()
           }
       }
        save(this.serialize())
    }
    getConfig(){
        return NODECONFIG
    }
    startNode(key){

        if(this.nodes[key].start!==undefined) {
            if (this.nodes[key].started) {
                this.nodes[key].stop()
            } else {

                this.nodes[key].start()
            }
        }
        this.socketApi.update()
    }
    serialize() {
        let out = {}
        out.nodes = {}
        for (let key in this.nodes) {
            out.nodes[key] = this.nodes[key].serialize()
        }
        return out;
    }
    load(data){
        for(let key in data) {

            let conf = NODECONFIG[data[key].name.toUpperCase()]
            this.nodes[this.idc+conf.name] = new Node(conf.name, conf.input, conf.output, conf.args, conf.func)
            this.nodes[this.idc+conf.name].id = this.idc
            this.nodes[this.idc+conf.name].nodeManager=this
            this.nodes[this.idc+conf.name].key=this.idc+conf.name
            this.nodes[this.idc+conf.name].x=data[key].x
            this.nodes[this.idc+conf.name].y=data[key].y
            data[key].id=this.idc
            for(let arg of data[key].args){
                this.nodes[this.idc+conf.name].args.find((x)=>x.name===arg.name).update(arg.value)
            }


            this.socketApi.update()
            this.idc++


        }
        for(let key in data) {
            let conf = NODECONFIG[data[key].name.toUpperCase()]
            for (let input of data[key].input) {
                if(input.name!=="start"){
                    for(let o in input.output) {
                        if (input.output[o] !== undefined) {

                            this.addConnection({
                                output: input.output[o].id + input.output[o].name,
                                input: data[key].id + input.name
                            })
                        }
                    }
                }
            }
        }
    }
    save(){
        save(this.serialize())
    }




}
module.exports=NodeManager