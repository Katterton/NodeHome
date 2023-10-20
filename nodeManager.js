const Node = require("./Nodes.js");
const fs = require('fs');

// Load node configuration from NodeConfig.json
const loadNodeConfig = () => JSON.parse(fs.readFileSync("NodeConfig.json"));
let NODECONFIG = loadNodeConfig();

// Initialize Node classes
for (let i in NODECONFIG) {

    try {
        NODECONFIG[i].func = require("./"+NODECONFIG[i].func+".js");
    } catch (err) {
        console.log("Couldn't initialize: " + i);
    NODECONFIG[i] = undefined;
}
}

// Save data to save.json
const save = (data) => {
    fs.writeFile("save.json", JSON.stringify(data), (err) => {
        if (err)
            console.log(err);
    });
}

class NodeManager{

    constructor(SocketApi,FrontendApi,name="test") {
        this.idc=0
        this.nodes={}
        this.connections=[]
        this.socketApi = SocketApi
        this.FrontendApi = FrontendApi
        this.FrontendApi.nodeManager=this
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
    renameNode(msg){
        this.nodes[msg.key].name=msg.name
        this.socketApi.update()
        save(this.serialize())
    }
    deleteNode(node){
       for(let key in this.nodes){

           if(this.nodes[key].id===parseInt(node.match(/\d+/g)[0])){
               this.nodes[key].remove()
               delete this.nodes[key]
               this.socketApi.update()
               this.FrontendApi.updat()
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
        this.FrontendApi.updat()
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