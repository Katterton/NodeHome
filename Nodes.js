const UDPled = require("./UDPled.js")
const Ambi = require("./ambi.js")
const parseHTML = require("./HTMLNodeGen.js")
var id = 0;
const UDPLED = {
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
}

const AMBI = {
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


class Nodes {
    x = 0
    y = 0
    input = []
    output = []
    args = []
    started = false
    func = (node) => (console.log(node.input[0].data));

    constructor(name, input, output, args, func) {
        this.name = name
        this.id = id
        id++;
        for (let i of input) {
            this.input.push(new Input(i, this))
        }
        if (this.input.length === 0) {
            this.input.push(new Input({name: "Start", type: "boolean", id: 0, var: "start"}, this))
        }
        for (let i of output) {

            this.output.push(new Output(i, this))

        }

        for (let i of args) {
            this[i.var] = i.value
            this.args.push(new Arguement(i, this))

        }

        this.func = new func(this)
        if (this.output.length !== 0) {

        this.send= function(data, port =0){
        this.output[port].update(data)
            }
    }
}
remove(){
        for(let input of this.input){
            input.unsubscribe()
        }
    for(let output of this.output){
        output.remove()
    }
    this.input=[
    ]
    this.output=[]
    if(this.func.remove!==undefined){
        this.func.remove()
    }
    this.func=null


}
    start(){
    if(this.func.start!==undefined){
        this.func.start()
        this.started=true
    }
    }
    stop(){
        if(this.func.start!==undefined){
            this.func.stop()
            this.started=false
        }
    }
}
class Arguement{
    name = ""
    type = ""
    data = ""
    value = ""

    constructor(arg,node) {
        this.name= arg.name
        this.type= arg.type
        this.value = arg.value
        this.var = arg.var
this.node=node
    }
    update(data){
        this.value = data
        this.node[this.var]=data
    }

}
class IO{

    name=""
    id=0
    type=""
    io=""
    data
    constructor(io, node) {
        this.name=io.name
        this.var = io.var
        this.id = io.id
        this.type = io.type
        this.node =node
    }

}

class Input extends IO {
    output
    constructor(input, node) {
        super(input,node);
        this.io = "input"
    }

    subscribe(output) {

        if (output.io === "output") {

            output.on(this)

        }
    }
    unsubscribe() {


if(this.output!==undefined) {
    this.output.removeListener(this)
    this.output = undefined
}

    }


    update(data) {
        if(this.name==="Start"){
            if(data){
                this.node.start()
            }
            else{
                this.node.stop()
            }
        }
        this.data = data
        this.node[this.var]=data
        this.node.func.update(this.node)

    }
}
class Output extends IO{
 inputs = []

    constructor(output, node) {
        super(output, node);
        this.io="output"
    }

    on(input){
        this.inputs.push(input)
        input.output=this
    }
    removeListener(input){

        this.inputs.splice(this.inputs.findIndex(x=>x===input), 1)
}
    update(data){
        for(let i of this.inputs){
            i.update(data)
        }
    }
    remove(){
        for(let input of this.inputs){
            input.unsubscribe()
        }
    }

}
module.exports=Nodes
//let test1 = new Nodes(UDPLED.name,UDPLED.input, UDPLED.output, UDPLED.args, UDPLED.func)
//let test2 = new Nodes(AMBI.name,AMBI.input, AMBI.output, AMBI.args, AMBI.func)
//test1.input[0].subscribe(test2.output[0])
//test2.func.start()
//console.log(parseHTML(test1))
//test2.output[0].update(123)
//console.log(test1,test2)

