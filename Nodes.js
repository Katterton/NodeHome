
const parseHTML = require("./HTMLNodeGen.js")
var idx = 0;



class Nodes {
    x = 0
    y = 0
    input = []
    output = []
    args = []
    started = false
    func = (node) => (console.log(node.input[0].data));

    constructor(name, input, output, args, func,id=undefined) {
        this.name = name
        if(id!==undefined){
            this.id=id
        }
        else {
            this.id = idx
            idx++;
        }
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
    serialize(){
       let out= {id:this.id, name:this.name,x:this.x, y:this.y}
       out.args=[]
       for(let arg of this.args){
           out.args.push({name:arg.name, value: arg.value})
       }
       out.input=[]
        for(let input of this.input){
            out.input.push({name:input.name, id:input.id})
            if(input.output!==undefined){
                out.input[out.input.length-1].output={name:input.output.name, id:input.output.node.id, parent:{name:input.output.node.name, value: input.output.node.value}}
            }
        }

    return out
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
        if(this.node.func.updateArgs!==undefined){
            this.node.func.updateArgs(this.var)
        }
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

