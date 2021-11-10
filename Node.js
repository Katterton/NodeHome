const UDPled = require("./UDPled.js")
const Ambi = require("./Ambi.js")
const UDPLED = {
    input: [
        {name:"Color", type : "ledArray", id:0, var: "data"}
    ],
    output: [
        //{name:"WIP Status", type : "number", id:0}
    ],
    args: [
        {name:"IP",var: "ip", type : "String", value:"182.168.1.100"},
        {name:"Port", var:"port", type : "number", value:80},
        {name:"numLeds", var: "num_Leds", type : "number", value: 90}
    ],
    func : UDPled
}

const AMBI = {
    input: [

    ],
    output: [
        {name:"Color", type : "ledArray", id:0}
    ],
    args: [
        {name:"Screen",var: "screen", type : "number", value:0},
        {name:"FPS", var:"fps", type : "number", value:50},
        {name:"numLeds", var: "num_Leds", type : "number", value: 90}
    ],
    func : Ambi
}


class Node{

    input = []
    output = []
    args = []
    func = (node)=>(console.log(node.input[0].data));
    constructor(input, output ,args,func)
    {
    for(let i of input ){
        this.input.push(new Input(i, this))
    }
        for(let i of output ){

            this.output.push(new Output(i,this))

        }
        for(let i of args){
            this[i.var]=i.value
            this.args.push(new Arguement(i))

        }

        this.func = new func()


    }
}
class Arguement{
    name = ""
    type = ""
    data = ""
    value = ""

    constructor(arg) {
        this.name= arg.name
        this.type= arg.type
        this.value = arg.value
        this.var = arg.var

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

    update(data) {
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
    update(data){
        for(let i of this.inputs){
            i.update(data)
        }
    }

}
let test1 = new Node(UDPLED.input, UDPLED.output, UDPLED.args, UDPLED.func)

//test1.input[0].subscribe(test2.output[0])
//test2.output[0].update(123)
console.log(test1)

