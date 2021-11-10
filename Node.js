const config = {
    input: [
        {name:"testIn", type : "number", id:0}
    ],
    output: [
        {name:"testOut", type : "number", id:0}
    ],
    args: [
        {name:"testArg", type : "number", value:5}
    ]
}




class Node{
    input = []
    output = []
    args = []
    func = ()=>(console.log(this.input[0].data));
    constructor(input, output ,args,func)
    {
    for(let i of input ){
        this.input.push(new Input(i, this))
    }
        for(let i of output ){
            this.output.push(new Output(i,this))
        }
        for(let i of args){
            this.args.push(new Arguement(i))
        }
        this.func = func


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
        this.node.func()

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
let test1 = new Node(config.input, config.output, config.args, ()=>2)
let test2 = new Node(config.input, config.output, config.args, ()=>2)
test1.input[0].subscribe(test2.output[0])
test2.output[0].update(123)
console.log(test1)

