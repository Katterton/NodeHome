const fs = require("fs")
const tempMap = {in:"node_template/InputNode.js", out: "./OutNode.js,", inout:"inOutNode.js"}
const nameMap ={name :"$name$", params:"$args$"}
const params = ["name"]
const getArgString = (config) =>([...(config.input?.length>0)? config.input.map(x=>"this."+x.var+"=this.node."+x.var+'\n'):  "",...config.output?.length>0?config.output.map(x=>"this."+x.var+"=this.node."+x.var+'\n'):"",...config.args.length>""?config.args.map(x=>"this."+x.var+"=this.node."+x.var+'\n'):""]).reduce((a,b)=>a+b)
const generateNode =(config, tmp, tmpParams=params) => tmp ===undefined ?generateNode(config, fs.readFileSync(tempMap[config.type]).toString(),tmpParams) :( tmpParams.length>0?generateNode(config,tmp.replaceAll(nameMap[tmpParams[0]],config[tmpParams[0]]), tmpParams.slice(1)):tmp).replaceAll("$args$", getArgString(config))
const generateConfig=(config)=>{

    let out ={name:config.name, input:[], output:[], args:[], func:config.name}
    let idc = 0
    config.input?.forEach(x=>out.input.push({name: x.name,type: x.type, id:idc++, var:x.var}))
     idc = 0
    config.output?.forEach(x=>out.output.push({name: x.name,type: x.type, id:idc++}))
    config.args?.forEach(x=>out.args.push({name: x.name,type: x.type, value:x.value, var:x.var}))
    out.gen = true
    return out;
}

let CONFIG = {name:"test", type:"in",  input:[{name:"test", type:"test", var:"test"},{name:"test1", type:"test1", var:"test1"}],args: [
    {name:"IP",var: "ip", type : "String", value:"192.168.0.105"},
    {name:"Port", var:"port", type : "number", value:4210},
    {name:"numLeds", var: "num_leds", type : "number", value: 70}]}
//console.log(generateNode({name:"test", type:"in", params:"x=75"}))


console.log(getArgString(CONFIG))
const saveNode = (node, config) => {
    let outconf = "{}"
    try{
        outconf= fs.readFileSync("CustomNodes/config.json")
    }
    catch{

    }
    outconf=JSON.parse(outconf)
    outconf[config.name.toUpperCase()]=config
    outconf= JSON.stringify(outconf)
    fs.writeFileSync("CustomNodes/config.json", outconf)
    fs.writeFileSync("CustomNodes/"+config.name+".js", node)
return "vscode://file/"+__dirname+"/CustomNodes/"+config.name+".js"
    

}
const addType = (config) => {config.type=config.input.length>0 && config.output.length>0 ? "inout" : config.input.length>0 ? "in" : "out"
return config
}
console.log("vscode://file/"+__dirname+"/CustomNodes/")
let save =(config) =>saveNode(generateNode(addType(config)),generateConfig(addType(config)))
module.exports=save

/*
{    UDPLED : {
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
UDPLEDV2 : {
    name: "UDPLedV2",
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
    func : UDPledV2
}
*/